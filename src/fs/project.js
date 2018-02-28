const str = require('../compilers/core/str.js');

module.exports = function(workspace, projectJson) {
  if(!projectJson) {
    projectJson = { name: 'New project' }
  }
  
  var filename = str.getSnake(projectJson.name) + '.js'

  pub.createProject = function() { }

  pub.saveProject = function() { }

  pub.loadProject = function() { }

  pub.listProjects = function() { }

  pub.deleteProject = function() { }

  pub.compile = function() {
    var compilerPath = path.join(__dirname, "..", "compilers",
      projectJson.compiler, `${projectJson.compiler}.js`);
    var compiler = require(compilerPath);
    compiler.compile(workspace.fullpath, projectJson, null)
  }

  pub.export = function() {
    var compilerPath = path.join(__dirname, "..", "compilers",
      projectJson.compiler, `${projectJson.compiler}.js`);
    var compiler = require(compilerPath);
    compiler.export(workspace.fullpath, projectJson, null)
  }

  pub.name = projectJson.name
  pub.projectJson = projectJson
  pub.fullpath = path.join(workspace.fullpath, 'projects', filename)

  return pub
}
