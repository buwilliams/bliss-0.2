const path = require('path');
const fs = require('fs');
const compiler = require('./src/compiler/react/react.js');

namespace('util', function() {
  task('clean-dir', function(path) {
    jake.rmRf(path);
    jake.mkdirP(path);
  });

  task('compile-jsx', {async: true}, function(inputPath, outputPath) {
    var list = new jake.FileList();
    list.include(`${inputPath}/**/*.jsx`);

    cmds = list.toArray().map(function(file) {
      var pathData = path.parse(file);
      var outDir = pathData.dir.replace(inputPath, outputPath);
      jake.mkdirP(outDir);
      return `./node_modules/.bin/babel ./${file} -o ./${outDir}/${pathData.name}.js`;
    });

    jake.exec(cmds, {async: true, interactive: false}, function () {
      complete();
    });

    complete();
  });

  task('copy-files', function(ext, inputPath, outputPath) {
    var list = new jake.FileList();
    var glob = `${inputPath}/**/*.${ext}`;
    console.log(glob);
    list.include(glob);

    cmds = list.toArray().forEach(function(file) {
      var pathData = path.parse(file);
      var outDir = pathData.dir.replace(inputPath, outputPath);
      jake.mkdirP(outDir);
      jake.cpR(file, `${outDir}/${pathData.base}`);
    });
  });
});

desc('Build single component');
task('build-component', function(name) {
  var t;

  var buildPath = `build/bliss/components/${name}`;
  jake.mkdirP(buildPath);

  t = jake.Task['util:clean-dir'];
  t.execute.apply(t, [buildPath]);

  t = jake.Task['util:copy-files'];
  t.execute.apply(t, ['html',`src/bliss/${name}`, buildPath]);
  t.execute.apply(t, ['css',`src/bliss/${name}`, buildPath]);
  t.execute.apply(t, ['js',`src/bliss/${name}`, buildPath]);

  t = jake.Task['util:compile-jsx'];
  t.execute.apply(t, [`src/bliss/${name}`, buildPath]);
});

desc('Build all components');
task('build-all-components', function() {
  var t;

  t = jake.Task['build-component'];
  t.execute.apply(t, [`bliss-tree`]);
  t.execute.apply(t, [`bliss-properties`]);
  t.execute.apply(t, [`bliss-javascript`]);
  t.execute.apply(t, [`bliss-utils`]);

  complete();
});

desc('Build bliss json');
task('build-bliss', function() {
  // read bliss.json
  var projectStr = fs.readFileSync('./src/bliss/workspace/bliss/projects/bliss_ui.json');
  var projectJson = JSON.parse(projectStr);
  projectJson.build = 'bliss';

  // compile bliss.json
  var workspace = 'build/bliss';
  jake.mkdirP(workspace);
  jake.mkdirP(path.join(workspace, 'js'));
  jake.mkdirP(path.join(workspace, 'css'));
  compiler.compile(workspace, projectJson);

  // copy assets
  t = jake.Task['util:copy-files'];
  t.execute.apply(t, ['css',`src/bliss/workspace/bliss/css`,
                            `build/bliss/css`]);
});

task('build-all', function(){
  var t;

  t = jake.Task['util:clean-dir'];
  t.execute.apply(t, ['build']);

  t = jake.Task['build-all-components'];
  t.invoke();

  t = jake.Task['build-bliss'];
  t.invoke();

  jake.mkdirP('build/workspace/projects');
  jake.mkdirP('build/workspace/components');
  jake.mkdirP('build/workspace/css');
  jake.mkdirP('build/workspace/js');

  t = jake.Task['util:copy-files'];
  t.execute.apply(t, ['json',`src/bliss/workspace/bliss/projects`, 'build/workspace/projects']);
  t.execute.apply(t, ['css',`src/bliss/workspace/bliss/css`, 'build/workspace/css']);
  t.execute.apply(t, ['js',`src/bliss/workspace/bliss/js`, 'build/workspace/js']);
});

desc('Build');
task('build', ['build-all'], function(){
  setTimeout(function() {
    t = jake.Task['util:copy-files'];
    t.execute.apply(t, ['*',`build/bliss/components`, 'build/workspace/components']);
  }, 3000);
});

desc('Execute all tests.');
task('test', function() {
  var cmd = 'jasmine JASMINE_CONFIG_PATH=jasmine.json';
  jake.exec(cmd, {printStdout: true}, function () {
    console.log('All tests passed.');
    complete();
  });
});

task('clean', function(){
  var t = jake.Task['util:clean-dir'];
  t.execute.apply(t, ['build']);
});

desc('Start bliss web server');
task('server', function() {
  require('dotenv').config();

  var options = {
    "port": process.env.BLISS_PORT,
    "workspace": process.env.BLISS_WORKSPACE,
    "app": process.env.BLISS_APP,
    "node_modules": process.env.BLISS_NODE_MODULES,
    "npm_path": process.env.NPM_PATH
  };

  var server = require('./src/compiler/react/server.js');
  server(options);
});

desc('Run bliss inside electron');
task('electron', function() {
  var cmd = 'node_modules/.bin/electron ./src/compiler/react/electron.js';
  jake.exec(cmd, {printStdout: true}, function () {
    complete();
  });
});

desc('Package bliss into installer');
task('dist', function() {
  jake.rmRf('dist');

  var t = jake.Task['util:copy-files'];
  t.execute.apply(t, ['*',`assets`, 'build']);

  var cmd = 'npm run dist';
  jake.exec(cmd, {printStdout: true}, function () {
    complete();
  });
});

desc('Update Bliss');
task('update-bliss', function() {
  var t = jake.Task['util:copy-files'];
  t.execute.apply(t, ['json','build/workspace/projects', 'src/bliss/workspace/bliss/projects']);

  var t = jake.Task['build'];
  t.execute.apply(t);
});

task('default', ['build-bliss']);
