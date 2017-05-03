var _ = require('lodash');

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
      this.traverseDecendents(project, component.child, fn);
  },

  traverseDecendents: function(project, nodeId, fn) {
    if(_.isNil(project.components[nodeId])) return; // base case
    var component = project.components[nodeId];
    fn(project, component);
    if(this.hasChild(component))
      this.traverseDecendents(project, component.child, fn);
    if(this.hasNext(component))
      this.traverseDecendents(project, component.next, fn);
  }
};
