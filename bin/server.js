require('dotenv').config();
var path = require('path');

var displayUsage = function() {
  console.log("Usage: node ./bin/server.js <server_type> <version> [override_version]");
  console.log("  server_type         required. bliss, bliss-tree, bliss-properties, or bliss-javascript");
  console.log("  version             required. Ex: v0.1, v0.2");
  console.log("  override_version    optional. used to override the value NPM passes to this script.");
  console.log("                      Ex: npm run build-tree v0.1")
};

var getServer = function(version) {
  var serverPath = path.join(__dirname, "..", "src", "compiler",
                             "react", version, "server.js");
  return require(serverPath);
};

var getComponent = function(component, version) {
  var serverPath = path.join(__dirname, "..", "src", "bliss",
                             version, component, "index.js");
  return require(serverPath);
};

function main() {
  if(process.argv.length < 4) {
    displayUsage();
    return;
  }

  var componentType = process.argv[2];
  var version = process.argv[3];

  if(process.argv.length === 5) {
    version = process.argv[4];
  }

  if(componentType === "bliss") {
    var server = getServer(version);
    var options = process.env;
    server(options);
  } else if(componentType === "bliss-tree" ||
            componentType === "bliss-properties" ||
            componentType === "bliss-javascript") {
    var server = getComponent(componentType, version);
    server();
  } else {
    displayUsage();
    return;
  }
}

main();
