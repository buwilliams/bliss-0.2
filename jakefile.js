const path = require('path');
const fs = require('fs');
const exec = require('sync-exec');
const compiler = require('./src/compiler/react/react.js');
const fse = require('fs-extra');

var config = {
  bliss_src: 'src/bliss/blissui/bliss',
  bliss_project: 'src/bliss/blissui/bliss/projects/bliss_ui.json',
  bliss_build: 'build/blissui/bliss',
  bliss_component_path: 'src/bliss/blissui/bliss/components',
  bliss_components: ['bliss-tree', 'bliss-properties', 'bliss-javascript', 'bliss-utils'],
  bliss_workspace: 'src/bliss/blissui',
  bliss_workspace_build: 'build/blissui',
  ws_dirs: ['projects', 'components', 'css', 'js', 'assets']
};

namespace('util', function() {
  task('clean-dir', function(path) {
    jake.rmRf(path);
    jake.mkdirP(path);
  });

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

  task('copy-files', function(ext, inputPath, outputPath) {
    var list = new jake.FileList();
    var glob = `${inputPath}/**/*.${ext}`;
    list.include(glob);

    list.toArray().forEach(function(file) {
      var pathData = path.parse(file);
      var outDir = pathData.dir.replace(inputPath, outputPath);
      //console.log(`>> copy-files was: ${pathData.dir}, now: ${outDir}, outputPath: ${outputPath}`);
      jake.mkdirP(outDir);
      jake.cpR(file, `${outDir}/${pathData.base}`);
    });
  });
});

desc('Build single component');
task('build-component', function(name) {
  var t;

  console.log('>> build-component', name);

  var buildPath = `${config.bliss_build}/components/${name}`;
  //jake.mkdirP(buildPath);

  //t = jake.Task['util:clean-dir'];
  //t.execute.apply(t, [buildPath]);

  //t = jake.Task['util:copy-files'];
  //t.execute.apply(t, ['html',`src/bliss/${name}`, buildPath]);
  //t.execute.apply(t, ['css',`src/bliss/${name}`, buildPath]);
  //t.execute.apply(t, ['js',`src/bliss/${name}`, buildPath]);

  t = jake.Task['util:compile-jsx'];
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
  var projectStr = fs.readFileSync(config.bliss_project);
  var projectJson = JSON.parse(projectStr);
  projectJson.build = 'bliss';

  // compile bliss.json
  var build_path = config.bliss_build;
  jake.mkdirP(build_path);
  jake.mkdirP(path.join(build_path, 'js'));
  jake.mkdirP(path.join(build_path, 'css'));
  compiler.compile(build_path, projectJson);

  console.log('>> bliss-bliss', config.bliss_src, config.bliss_build);
  t = jake.Task['util:copy-files'];
  t.execute.apply(t, ['css',`${config.bliss_src}/css`, `${config.bliss_build}/css`]);
  t.execute.apply(t, ['js',`${config.bliss_src}/js`, `${config.bliss_build}/js`]);
});

desc('Builds bliss and bliss components');
task('build', function(){
  var t;

  console.log('>> cleaning build');

  t = jake.Task['util:clean-dir'];
  t.execute.apply(t, ['build']);

  console.log('>> copying workspaces');
  fse.copySync(config.bliss_workspace, config.bliss_workspace_build);

  t = jake.Task['build-all-components'];
  t.invoke();

  t = jake.Task['build-bliss'];
  t.invoke();

  console.log('>> build copy-files');
  t = jake.Task['util:copy-files'];
  config.ws_dirs.forEach(function(d) {
    jake.mkdirP(`${config.bliss_build}/${d}`);
    t.execute.apply(t, ['*',`${config.bliss_src}/${d}`, `${config.bliss_build}/${d}`]);
  });
});

desc('Updates Bliss after you change it in the UI (you need to build bliss first)');
task('update-bliss', function() {
  var t = jake.Task['util:copy-files'];
  t.execute.apply(t, ['json',`${config.bliss_build}/projects`, `${config.bliss_src}/projects`]);

  var t = jake.Task['build'];
  t.execute.apply(t);
});

task('clean', function(){
  var t = jake.Task['util:clean-dir'];
  t.execute.apply(t, ['build']);
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
