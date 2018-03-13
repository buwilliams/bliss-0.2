const str = require('../compilers/core/str.js');
const path = require('path')
const fs = require('./secure-fs.js')

module.exports = function(workspace, projectJson) {
  var pub = {}

  var init = function(projectJson) {
    if(!projectJson) {
      projectJson = { name: 'New project' }
    }
    pub.name = projectJson.name
    pub.filename = str.getSnake(projectJson.name) + '.json'
    pub.projectJson = projectJson
    pub.fullpath = path.join(workspace.fullpath, 'projects')
  }
  init(projectJson)

  pub.listProjects = function() {
    return fs(workspace.user.name)
      .readdirSync(pub.fullpath)
  }

  pub.saveProject = function() {
    var jsonStr = JSON.stringify(projectJson, null, 2)
    var dir = `${pub.fullpath}/${pub.filename}`
    fs(workspace.user.name).writeFileSync(dir, jsonStr)
    return this
  }

  pub.loadProject = function(filename) {
    var dir = `${pub.fullpath}/${filename}`
    var jsonStr = fs(workspace.user.name).readFileSync(dir)
    var projectJson = JSON.parse(jsonStr)
    init(projectJson)
    return this
  }

  pub.deleteProject = function(filename) {
    var dir = `${pub.fullpath}/${filename}`
    fs(workspace.user.name).removeSync(dir)
    return this
  }

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

  pub.workspace = workspace

  return pub
}