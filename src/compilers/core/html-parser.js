const parse5 = require('parse5');

module.exports = {
  parse: function(htmlString) {
    var parsed = parse5.parse(htmlString);
    return parsed;
  },

  parseFragment: function(htmlString) {
    var parsed = parse5.parseFragment(htmlString);
    return parsed;
  },

  appendComponent: function(htmlRef, projectJson, parentId) {
    var component = {
      "id": null,
      "name": htmlRef.tagName,
      "element": htmlRef.tagName,
      "text": null,
      "attributes": [],
      "dynamicAttributes": [],
      "css": [],
      "js": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": null
    };

    var newId = String(projectJson.nextId++);

    htmlRef.attrs.forEach(function(attr) {
      component.attributes.push(attr);
    });

    // add component to projectJson
    component.id = newId;
    projectJson.components[component.id] = component;

    // update ids
    var parent = projectJson.components[parentId];
    if(parent.child !== null) {
      var last = projectJson.components[parent.child];
      while(last.next !== null) {
        last = projectJson.components[last.next];
      }
      last.next = component.id;
      component.previous = last.id;
    } else {
      parent.child = component.id;
    }

    component.parent = parent.id;

    return component.id;
  },

  toProject: function(htmlString, projectJson, parentId) {
    var frag = this.parseFragment(htmlString);
    return this._toProject(frag.childNodes[0], projectJson, parentId);
  },

  _toProject: function(htmlRef, projectJson, parentId) {
    var that = this;
    var newId = this.appendComponent(htmlRef, projectJson, parentId);
    var newComp = projectJson.components[newId];

    // collect text nodes
    var text = "";
    htmlRef.childNodes.forEach(function(node) {
      if(node.nodeName === "#text") {
        text += node.value.trim();
      }
    });
    newComp.text = text;

    // determine if there is a text node
    htmlRef.childNodes.forEach(function(node) {
      if(node.nodeName !== "#text") {
        return that._toProject(node, projectJson, newId);
      }
    });

    return projectJson;
  }
};
