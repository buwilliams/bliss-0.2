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

  appendComponent: function(htmlRef, projectJson, parentId, prevId) {
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
      "previous": prevId,
      "child": null,
      "parent": parentId
    };

    htmlRef.attrs.forEach(function(attr) {
      component.attributes.push(attr);
    });

    component.id = projectJson.nextId++;
    projectJson.components[component.id] = component;

    return component.id;
  },

  toProject: function(htmlString, projectJson, appendId) {
    var frag = this.parseFragment(htmlString);
    return this._toProject(frag.childNodes[0], projectJson, appendId);
  },

  _toProject: function(htmlRef, projectJson, parentId) {
    // create component

    // set attributes
    // loop through childNodes
    // set parent, child, next, previous
    return projectJson;
  }
};
