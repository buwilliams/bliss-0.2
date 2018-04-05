const _ = require('lodash');
const projectJson = require('./project-json.js');
const str = require('./str.js');

module.exports = {
  hasChild: function(component) {
    return _.isNil(component.child) ? false : true;
  },

  hasNext: function(component) {
    return _.isNil(component.next) ? false : true;
  },

  traverse: function(project, startingNodeId, fn) {
    if(_.isNil(project.components[startingNodeId])) return;
    var component = project.components[startingNodeId];
    fn(project, component);
    if(this.hasChild(component))
      this._traverse(project, component.child, fn);
  },

  _traverse: function(project, nodeId, fn) {
    if(_.isNil(project.components[nodeId])) return; // base case
    var component = project.components[nodeId];
    fn(project, component);
    if(this.hasChild(component))
      this._traverse(project, component.child, fn);
    if(this.hasNext(component))
      this._traverse(project, component.next, fn);
  },

  get: function(proj, id) {
    return proj.components[id];
  },

  parent: function(proj, id) {
    var component = this.get(proj, id);
    var parentId = component.parent;
    var parent = parentId === null ? null : this.get(proj, parentId);
    return parent;
  },

  child: function(proj, id) {
    var component = this.get(proj, id);
    var childId = component.child;
    var child = (childId === null) ? null : this.get(proj, childId);
    return child;
  },

  next: function(proj, id) {
    var component = this.get(proj, id);
    var nextId = component.next;
    var next = (nextId === null) ? null : this.get(proj, nextId);
    return next;
  },

  previous: function(proj, id) {
    var component = this.get(proj, id);
    var previousId = component.previous;
    var previous = (previousId === null) ? null : this.get(proj, previousId);
    return previous;
  },

  // TODO: was hasChild
  hasChildDescendant: function(proj, parentId, childId) {
    var that = this;
    var component = this.get(proj, childId);
    var out = false;

    var walk = function(component) {
      if(component.parent === parentId) out = true;
      var parent = that.parent(proj, component.id);
      if(parent !== null) walk(parent);
    };

    walk(component);

    return out;
  },

  // TODO: how to do this?
  getTemplate: function(proj) {
    var newId = String(proj.nextId++);
    return {
      "id": newId,
      "name": "new_"+newId,
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": null
    };
  },

  createComponent: function(proj, toId) {
    var tmpl = this.getTemplate(proj);
    proj.components[tmpl.id] = tmpl;
    var shouldBeChild = (toId === proj.rootId) ? true : false;
    return this.moveComponent(proj, tmpl.id, toId, shouldBeChild);
  },

  cloneComponent: function(proj, cloneId) {
    var that = this

    var _clone = function(component) {
      var newId = String(proj.nextId++);
      var clone = _.cloneDeep(component);

      clone.id = newId;
      clone.name = clone.name + "_copy";
      clone.next = null;
      clone.previous = null;
      clone.parent = null;
      clone.child = null;

      proj.components[newId] = clone;
      return clone
    }

    var map = {}
    var component = this.get(proj, cloneId);
    var rootClone = _clone(component)
    map[component.id] = rootClone.id

    var walkDown = function(compRef, fn) {
      fn(compRef)
      if(compRef.next !== null) walkDown(that.get(proj, compRef.next), fn)
      if(compRef.child !== null) walkDown(that.get(proj, compRef.child), fn)
    }

    if(component.child !== null) {
      // create the child clones
      walkDown(this.get(proj, component.child), function(component) {
        var clone = _clone(component)
        map[component.id] = clone.id
      })

      // setup links for all children
      walkDown(this.get(proj, component.child), function(component) {
        var cloneComponent = that.get(proj, map[component.id])
        if(component.next !== null) cloneComponent.next = map[component.next]
        if(component.prev !== null) cloneComponent.prev = map[component.prev]
        if(component.parent !== null) cloneComponent.parent = map[component.parent]
        if(component.child !== null) cloneComponent.child = map[component.child]
      })

      rootClone.child = map[component.child]
    }

    return this.moveComponent(proj, rootClone.id, cloneId, false);
  },

  deleteComponent: function(proj, id) {
    var that = this;
    if(proj.rootId === id) return proj;

    this.removeFromTree(proj, id);

    var deleteNode = function(id) {
      var component = that.get(proj, id);
      if(component.child !== null) deleteNode(component.child);
      if(component.next !== null) deleteNode(component.next);
      delete proj.components[id];
    };
    deleteNode(id);

    return proj;
  },

  addNext: function(proj, toId, id) {
    var toComponent = this.get(proj, toId);
    var toNextComponent = this.next(proj, toId);
    var component = this.get(proj, id);

    if(toNextComponent !== null) {
      toNextComponent.previous = id;
      component.next = toNextComponent.id;
    }

    component.parent = toComponent.parent;
    component.previous = toId;
    toComponent.next = id;
  },

  addChild: function(proj, toId, id) {
    var toComponent = this.get(proj, toId);
    var toChildComponent = this.child(proj, toId);
    var component = this.get(proj, id);

    if(toChildComponent !== null) {
      component.next = toComponent.child;
      toChildComponent.previous = id;
    }

    toComponent.child = id;
    component.parent = toId;
  },

  removeFromTree: function(proj, id) {
    var component = this.get(proj, id);
    var parent = this.parent(proj, id);
    var next = this.next(proj, id);
    var previous = this.previous(proj, id);

    if(parent === null) return proj; // new component

    if(previous === null) {
      // update the parent
      parent.child = component.next;
    } else {
      // update the previous
      previous.next = component.next;
    }

    if(next !== null) {
      // update the next
      next.previous = component.previous;
    }

    component.parent = null;
    component.next = null;
    component.previous = null;

    return proj;
  },

  moveComponent: function(proj, fromId, toId, shouldBeChild) {
    var hasChild = this.hasChildDescendant(proj, fromId, toId);
    if(fromId === toId || hasChild) return proj;

    this.removeFromTree(proj, fromId);

    if(toId === proj.rootId || shouldBeChild === true) {
      this.addChild(proj, toId, fromId);
    } else {
      this.addNext(proj, toId, fromId);
    }

    return proj;
  },

  mergeComponents: function(source, dest, replaceId) {
    var nextId = dest.nextId;
    var comps = _.cloneDeep(source.components);
    var idMap = {};

    // create id map
    _.each(_.keys(comps), function(key) {
      idMap[key] = String(nextId++);
    });

    // assign components and update ids
    _.each(_.keys(comps), function(key) {
      dest.components[idMap[key]] = comps[key];
      dest.components[idMap[key]].id = idMap[key];
      if(comps[key].parent !== null) dest.components[idMap[key]].parent = idMap[comps[key].parent];
      if(comps[key].child !== null) dest.components[idMap[key]].child = idMap[comps[key].child];
      if(comps[key].next !== null) dest.components[idMap[key]].next = idMap[comps[key].next];
      if(comps[key].previous !== null) dest.components[idMap[key]].previous = idMap[comps[key].previous];
    });

    // updated dest nextId
    dest.nextId += _.keys(comps).length;

    var injectRootComp = dest.components[idMap[source.rootId]];
    var replaceComp = dest.components[replaceId];

    // Connect source tree with dest tree
    if(replaceComp.parent !== null) {
      var parent = dest.components[replaceComp.parent];
      if(parent.child === replaceComp.id) {
        parent.child = injectRootComp.id;
      }
    }

    if(replaceComp.previous !== null) {
      var prev = dest.components[replaceComp.previous];
      prev.next = injectRootComp.id;
      injectRootComp.previous = prev.id;
    }

    if(replaceComp.next !== null) {
      var next = dest.components[replaceComp.next];
      next.previous = injectRootComp.id;
      injectRootComp.next = next.id;
    }

    // Add replaceComp attributes to injectRootComp
    var union = _.union(injectRootComp.attributes, replaceComp.attributes);
    injectRootComp.attributes = _.uniqBy(union, 'name');

    union = _.union(injectRootComp.dynamicAttributes, replaceComp.dynamicAttributes);
    injectRootComp.dynamicAttributes = _.uniqBy(union, 'name');

    union = _.union(injectRootComp.js, replaceComp.js);
    injectRootComp.js = _.uniqBy(union, 'name');

    union = _.union(injectRootComp.css, replaceComp.css);
    injectRootComp.css = _.uniqBy(union, 'selector');

    if(replaceComp.text !== null && replaceComp.text !== '') {
      injectRootComp.text = replaceComp.text;
    }

    if(replaceComp.textFn !== null && replaceComp.textFn !== '') {
      injectRootComp.textFn = replaceComp.textFn;
    }

    if(replaceComp.repeatFn !== null && replaceComp.repeatFn !== '') {
      injectRootComp.repeatFn = replaceComp.repeatFn;
    }

    if(replaceComp.ifFn !== null && replaceComp.ifFn !== '') {
      injectRootComp.ifFn = replaceComp.ifFn;
    }

    return dest;
  },

  merge: function(source, dest, replaceId) {
    // Packages, externalCss, externalJs
    dest.packages = _.union(dest.packages, source.packages);
    dest.externalCss = _.union(dest.externalCss, source.externalCss);
    dest.externalJs = _.union(dest.externalJs, source.externalJs);

    // Global JavaScript
    var union = _.union(dest.js, source.js);
    dest.js = _.uniqBy(union, 'name');

    // Schemas
    var union = _.union(dest.schemas || [], source.schemas || []);
    dest.schemas = _.uniqBy(union, 'path');

    // Load
    dest.load = _.union(dest.load, source.load);

    // Global JavaScript
    union = _.union(dest.js, source.js);
    dest.js = _.uniqBy(union, 'name');

    // CSS Vars
    union = _.union(dest.cssVars, source.cssVars);
    dest.cssVars = _.uniqBy(union, 'name');

    // CSS
    union = _.union(dest.css, source.css);
    dest.css = _.uniqBy(union, 'selector');
    // TODO: merge properties on duplicates

    // setup root props
    if(!dest.rootProps) dest.rootProps = {};
    var props = dest.rootProps[source.filename || str.getSnake(source.name)] = {};
    var rootComponent = dest.components[replaceId];

    _.forEach(rootComponent.attributes, (item) => {
      props[item.name] = item.value;
    });

    _.forEach(rootComponent.dynamicAttributes, (item) => {
      var jsFn = _.find(rootComponent.js, { name: item.value });
      if(jsFn) props[item.name] = { "body": jsFn.body };
    });

    // Components
    dest = this.mergeComponents(source, dest, replaceId);

    return dest;
  }
};
