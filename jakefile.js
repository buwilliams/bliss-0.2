require('dotenv').config();
const path = require('path');
const fs = require('fs');
const exec = require('sync-exec');
const compiler = require('./src/compilers/react/react.js');
const fse = require('fs-extra');

var config = {
  bliss_src: `src/workspaces/${process.env.BLISS_USER}/bliss`,
  bliss_project: 'projects/bliss_ui.json',
  bliss_build: `build/${process.env.BLISS_USER}/bliss`,
  bliss_component_path: `src/workspaces/${process.env.BLISS_USER}/bliss/components`,
  bliss_components: ['bliss-tree', 'bliss-properties', 'bliss-javascript', 'bliss-data', 'bliss-utils'],
  bliss_workspace: `src/workspaces/${process.env.BLISS_USER}`,
  bliss_workspace_build: `build/${process.env.BLISS_USER}`
};

task('compile-jsx', function(inputPath, outputPath) {
  var list = new jake.FileList();
  list.include(`${inputPath}/**/*.jsx`);

  var cmds = list.toArray().map(function(file) {
    var pathData = path.parse(file);
    var outDir = pathData.dir.replace(inputPath, outputPath);
    jake.mkdirP(outDir);
    return `./node_modules/.bin/babel ./${file} -o ./${outDir}/${pathData.name}.js`;
  });

  cmds.forEach(function(cmd) {
    exec(cmd);
  });
});

desc('Build single component');
task('build-component', function(name) {
  console.log('>> build-component', name);
  var buildPath = `${config.bliss_build}/components/${name}`;
  var t = jake.Task['compile-jsx'];
  t.execute.apply(t, [`${config.bliss_component_path}/${name}`, buildPath]);
});

desc('Build all components');
task('build-all-components', function() {
  var t;

  console.log('>> build-all-components');

  t = jake.Task['build-component'];
  config.bliss_components.forEach(function(component) {
    t.execute.apply(t, [component]);
  });
});

desc('Build bliss json');
task('build-bliss', function() {
  console.log('>> build-bliss');
  // read bliss.json
  var projectStr = fs.readFileSync(path.join(config.bliss_src, config.bliss_project));
  var projectJson = JSON.parse(projectStr);
  projectJson.build = 'bliss';

  // compile bliss.json
  var build_path = config.bliss_build;
  //jake.mkdirP(build_path);
  //jake.mkdirP(path.join(build_path, 'js'));
  //jake.mkdirP(path.join(build_path, 'css'));
  compiler.compile(build_path, projectJson);

  fse.moveSync(path.join(build_path, 'bliss.html'), path.join(build_path, 'index.html'), {overwrite:true});
});

desc('Builds bliss and bliss components');
task('build', function(){
  var t;

  if(process.env.BLISS_ENV==='development') {
    console.log('>> cleaning build');
    fse.removeSync('build')
  }

  console.log('>> copying workspaces');
  fse.copySync(config.bliss_workspace, config.bliss_workspace_build);

  t = jake.Task['build-all-components'];
  t.invoke();

  t = jake.Task['build-bliss'];
  t.invoke();
});

desc('Updates Bliss after you change it in the UI (you need to build bliss first)');
task('update-bliss', function() {
  fse.copySync('build','src/workspaces',{overwrite:true,dereference:true});
});

task('clean', function(){
  fse.removeSync('build');
});

desc('Start bliss web server');
task('server', function() {
  require('./src/compiler/react/server.js');
});

desc('Execute all tests.');
task('test', function() {
  var cmd = 'jasmine JASMINE_CONFIG_PATH=jasmine.json';
  jake.exec(cmd, {printStdout: true}, function () {
    console.log('All tests passed.');
  });
});

task('default', ['test']);
