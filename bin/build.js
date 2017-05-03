/*
  Fit into an overall framework (or just build everything)
  Build v0.1
    - compile bliss
    - build bliss-tree
    - build bliss-properties
    - build bliss-javascript
*/


require('dotenv').config();
var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');

var getCompiler = function(projectJson) {
  var version = projectJson.version || "v0.1";
  var compilerPath = path.join(__dirname, "..", "src", "compiler",
                               projectJson.compiler, version,
                               `${projectJson.compiler}.js`);
  return require(compilerPath);
};

var displayUsage = function() {
  console.log("Usage: node ./bin/build.js <build_type> <version> [override_version]");
  console.log("  build_type          required. bliss, bliss-tree, bliss-properties, or bliss-javascript");
  console.log("  version             required. Ex: v0.1, v0.2");
  console.log("  override_version    optional. used to override the value NPM passes to this script.");
  console.log("                      Ex: npm run build-tree v0.1")
};

var runCommand = function(command, successMessage, errorMessage,
                          successFn, errorFn) {
  var exec = require('child_process').exec;
  var cmd = command;
  exec(cmd, function(error, stdout, stderr) {
    if(stderr) {
      console.log(stderr);
      console.log(errorMessage);
      if(errorFn) errorFn();
      return;
    }
    if(stdout) console.log('stdout', stdout);
    console.log(successMessage);
    if(successFn) successFn();
  });
};

var replaceDir = function(source, dest) {
  fse.emptyDirSync(dest);
  fse.copySync(source, dest);
};

var buildAllComponents = function(version) {
  var components = ['bliss-tree', 'bliss-properties', 'bliss-javascript'];
  components.forEach(function(component) {
    buildBlissComponent(component, version, function() {
      var source = path.join(__dirname, '..', 'src', 'bliss', version,
                             component, 'dist');
      var dest = path.join(__dirname, '..', 'src', 'bliss', version,
                           'workspace', 'bliss', 'components', component);
      replaceDir(source, dest);
    });
  });
};

var buildBlissComponent = function(name, version, successFn, errorFn) {
  var successMessage = `Building "${name}@${version}" complete.`;
  var errorMessage = `Error building "${name}".`;
  runCommand(`./src/bliss/${version}/${name}/bin/build`, successMessage,
             errorMessage, successFn, errorFn);
};

var buildBliss = function(version) {
  buildAllComponents(version);

  var fullPath = path.join(__dirname, '..', 'src', 'bliss', version,
                           'workspace', 'bliss');
  var jsonPath = path.join(fullPath, 'projects', 'bliss.json');
  var jsonStr = fs.readFileSync(`${jsonPath}`);
  var projectJson = (version === "v0.1") ? JSON.parse(jsonStr).project :
                                           JSON.parse(jsonStr);
  projectJson.build = "bliss";
  var compiler = getCompiler(projectJson);
  var result = compiler.compile(fullPath, projectJson);
  console.log(`Building "bliss@${version}" complete.`);
};

function main() {
  if(process.argv.length < 4) {
    displayUsage();
    return;
  }

  var build = process.argv[2];
  var version = process.argv[3];

  if(process.argv.length === 5) {
    version = process.argv[4];
  }

  if(build === "bliss") {
    buildBliss(version);
  } else if(build === "bliss-tree" ||
            build === "bliss-properties" ||
            build === "bliss-javascript") {
    buildBlissComponent(build, version);
  } else {
    displayUsage();
  }
}

main();
