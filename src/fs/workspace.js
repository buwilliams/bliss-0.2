module.exports = function(user, workspace) {
  var pub = {}

  var createWorkspace = function() {
    // if workspace doesn't exist create it
  }
  createWorkspace()

  pub.deploy = function() {
  }

  pub.share = function() {
  }

  pub.import = function(user, workspace, project) {
  }

  pub.listProjects = function() {
    // TODO: array of project paths
  }

  pub.listShared = function() {
    // TODO: array of project paths (user/workspace)
  }

  pub.deleteProject = function(projectName) {
  }

  pub.deleteComponent = function(projectName) {
  }

  pub.deleteWorkspace = function() {
  }

  return pub
}
