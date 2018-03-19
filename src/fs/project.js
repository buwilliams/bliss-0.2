const str = require('../compilers/core/str.js');
const path = require('path');
const fs = require('./secure-fs.js');
const htmlParser = require('../compilers/core/html-parser.js');

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
    var projects = fs(workspace.user.name).readdirSync(pub.fullpath);
    projects = projects.map(function(p) {
      return path.basename(p, '.json');
    });
    return projects;
  }

  pub.saveProject = function() {
    var jsonStr = JSON.stringify(projectJson, null, 2)
    var dir = `${pub.fullpath}/${pub.filename}`
    fs(workspace.user.name).writeFileSync(dir, jsonStr)
    return this
  }

  pub.loadProject = function(filename) {
    var snakeFilename = str.getSnake(filename);
    var dir = `${pub.fullpath}/${snakeFilename}.json`
    var jsonStr = fs(workspace.user.name).readFileSync(dir)
    var projectJson = JSON.parse(jsonStr)
    init(projectJson)
    return this
  }

  pub.deleteProject = function(filename) {
    var snakeFilename = str.getSnake(filename)
    var dir = `${pub.fullpath}/${snakeFilename}.json`;
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

  pub.importHtml = function(html, parentId) {
    init(htmlParser.toProject(html, this.projectJson, parentId));
    return this;
  };

  pub.workspace = workspace;

  return pub;
}
