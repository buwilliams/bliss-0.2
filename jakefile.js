const path = require('path');
const fs = require('fs');
const compiler = require('./src/compiler/react/react.js');

namespace('util', function() {
  task('clean-dir', function(path) {
    jake.rmRf(path);
    jake.mkdirP(path);
  });

  task('compile-jsx', function(inputPath, outputPath) {
    var list = new jake.FileList();
    list.include(`${inputPath}/**/*.jsx`);

    cmds = list.toArray().map(function(file) {
      var pathData = path.parse(file);
      var outDir = pathData.dir.replace(inputPath, outputPath);
      jake.mkdirP(outDir);
      return `./node_modules/.bin/babel ./${file} -o ./${outDir}/${pathData.name}.js`;
    });

    jake.exec(cmds, {interactive: false}, function () {
      complete();
    });
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

  t = jake.Task['util:clean-dir'];
  t.execute.apply(t, [`build/${name}`]);

  t = jake.Task['util:copy-files'];
  t.execute.apply(t, ['html',`src/bliss/${name}`,`build/${name}`]);
  t.execute.apply(t, ['css',`src/bliss/${name}`,`build/${name}`]);
  t.execute.apply(t, ['js',`src/bliss/${name}`,`build/${name}`]);

  t = jake.Task['util:compile-jsx'];
  t.execute.apply(t, [`src/bliss/${name}`,`build/${name}`]);
});

desc('Build all components');
task('build-all-components', function() {
  var t;

  t = jake.Task['build-component'];
  t.execute.apply(t, [`bliss-tree`]);
  t.execute.apply(t, [`bliss-properties`]);
  t.execute.apply(t, [`bliss-javascript`]);
});

desc('Build bliss json');
task('build-bliss', function() {
  // read bliss.json
  var projectStr = fs.readFileSync('./src/bliss/workspace/bliss/projects/bliss.json');
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

task('init-deps', {async: true}, function() {
  // read package.json
  var packageStr = fs.readFileSync('./package.json');
  var deps = JSON.parse(packageStr).dependencies;
  var devDeps = JSON.parse(packageStr).devDependencies;

  // create new
  var cmd = 'cd build && npm init -y && cd -';
  jake.exec(cmd, {printStdout: true}, function () {
    console.log('Initialized npm.');

    var packageStr = fs.readFileSync('./build/package.json');
    var packageJson = JSON.parse(packageStr);

    packageJson.dependencies = deps;
    packageJson.devDependencies = devDeps;
    packageStr = JSON.stringify(packageJson, null, 2);

    fs.writeFileSync('./build/package.json', packageStr, 'utf8');

    complete();
  });
});

desc('Update bliss node dependencies');
task('install-deps', ['init-deps'], {async: true}, function() {
  // install deps
  var cmd = 'cd build && npm install && cd -';
  jake.exec(cmd, {printStdout: true}, function () {
    complete();
  });
});

task('build', function(){
  var t;

  t = jake.Task['util:clean-dir'];
  t.execute.apply(t, ['build']);

  t = jake.Task['build-all-components'];
  t.invoke();

  t = jake.Task['build-bliss'];
  t.invoke();

  //t = jake.Task['install-deps'];
  //t.invoke();

  jake.mkdirP('build/workspace/projects');
  jake.mkdirP('build/workspace/components');
  jake.mkdirP('build/workspace/css');
  jake.mkdirP('build/workspace/js');
});

desc('Execute all tests.');
task('test', function() {
  var cmd = 'jasmine JASMINE_CONFIG_PATH=jasmine.json';
  jake.exec(cmd, {printStdout: true}, function () {
    console.log('All tests passed.');
    complete();
  });
});

desc('Start bliss web server');
task('server', function() {
  require('dotenv').config();

  var options = {
    "port": process.env.BLISS_PORT,
    "workspace": process.env.BLISS_WORKSPACE,
    "app": process.env.BLISS_APP,
    "node_modules": process.env.BLISS_NODE_MODULES
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
  var cmd = 'npm run dist';
  jake.exec(cmd, {printStdout: true}, function () {
    complete();
  });
});

task('default', ['build-bliss']);
