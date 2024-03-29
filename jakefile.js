require('dotenv').config();
const path = require('path');
const fs = require('fs');
const exec = require('sync-exec');
const compiler = require('./src/compilers/react/react.js');
const fse = require('fs-extra');
const deps = require('./src/fs/dependencies.js');

var config = {
  bliss_src: `src/workspaces/${process.env.BLISS_USER}/bliss`,
  bliss_project: 'projects/bliss_ui.json',
  bliss_build: `build/_bliss/bliss`,
  bliss_component_path: `src/workspaces/${process.env.BLISS_USER}/bliss/components`,
  bliss_components: ['bliss-tree', 'bliss-properties', 'bliss-javascript', 'bliss-data', 'bliss-utils'],
  bliss_workspace: `src/workspaces/${process.env.BLISS_USER}`,
  bliss_workspace_build: `build/_bliss`,
  bliss_workspace_test: `src/workspaces/${process.env.BLISS_TEST_USER}`,
  bliss_workspace_test_build: `build/${process.env.BLISS_TEST_USER}`,
  bliss_public: `build/${process.env.BLISS_USER}`
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

desc('Copy bliss backend libs for frontend use');
task('copy-libs', function() {
  console.log('>> copy-libs');

  var libs = [
    {
      src: './src/compilers/core/tree.js',
      name: 'UtilTree',
      filename: 'util-tree.js',
    }
  ];

  libs.forEach((lib) => {
    console.log(`>> - ${lib.name}`);
    var content = fs.readFileSync(lib.src, "utf8");
    var lines = content.split(`\n`);
    var start = false;
    var out = "";
    lines.forEach((line) => {
      if(line.indexOf('module.exports') !== -1) {
        start = true;
        out += `var ${lib.name} = {\n`;
      } else if (start) {
        out += `${line}\n`;
      }
    });
    fs.writeFileSync(
      path.join(config.bliss_component_path,
                 'bliss-utils',
                 'js',
                 lib.filename), out);
  })
});

desc('Build bliss json');
task('build-bliss', function() {
  console.log('>> build-bliss');

  var projectStr = fs.readFileSync(path.join(config.bliss_src, config.bliss_project));
  var projectJson = JSON.parse(projectStr);
  projectJson.build = 'bliss';
  projectJson.filename = 'bliss';
  projectJson.pageTitle = 'BlissUI';

  var build_path = config.bliss_build;
  console.log('>> - compiling bliss');
  compiler.compile(build_path, projectJson);

  console.log('>> - updating dependencies');
  fse.removeSync(path.join(build_path, 'node_modules'))

  deps.update(build_path, projectJson);

  var filename = (projectJson.filename || 'designer') + '.html'
  fse.moveSync(path.join(build_path, filename), path.join(build_path, 'index.html'), {overwrite:true});
});

desc('Builds bliss and bliss components');
task('build', function(){
  var t;

  if(process.env.BLISS_ENV==='development') {
    console.log('>> cleaning build');
    if(fs.existsSync(config.build_bliss)) {
      fse.removeSync(config.build_bliss);
    }
  }

  t = jake.Task['copy-libs'];
  t.invoke();

  console.log('>> copying workspaces');
  fse.copySync(config.bliss_workspace, config.bliss_workspace_build);
  fse.copySync(config.bliss_workspace_test, config.bliss_workspace_test_build);

  t = jake.Task['build-all-components'];
  t.invoke();

  t = jake.Task['build-bliss'];
  t.invoke();

  console.log('>> making bliss public');
  fse.copySync(config.bliss_workspace_build, config.bliss_public, {overwrite:true,dereference:true});
});

desc('Updates Bliss from local build changes');
task('update-bliss', function() {
  fse.copySync('build','src/workspaces',{overwrite:true,dereference:true});
});

desc('Use bliss v2, ex: jake update-bliss && jake migrate[v2] && jake build');
task('migrate', function(version) {
  var source = `src/workspaces/5d06f306c22c07a5/bliss/projects/bliss_ui_${version}.json`;
  var dest = `src/workspaces/5d06f306c22c07a5/bliss/projects/bliss_ui.json`;
  fse.copySync(source, dest, { overwrite: true, dereference: true });
  var json = fse.readJsonSync(dest)
  json.name = "Bliss UI"
  json.build = "bliss"
  fse.writeJsonSync(dest, json, { spaces: 2 })
})

task('clean', function(){
  fse.removeSync('build');
});

desc('Start bliss web server');
task('server', function() {
  require('./src/server/server.js');
});

desc('Execute all tests.');
task('test', function(optionalFilePattern) {
  var cmd = `BLISS_ENV=test ./node_modules/.bin/mocha "src/**/*-test.js"`
  if(optionalFilePattern) {
    cmd = `BLISS_ENV=test ./node_modules/.bin/mocha ` +
          `"${optionalFilePattern}" --no-timeouts`;
  }
  jake.exec(cmd, {printStdout: true}, function () {
    console.log('All tests passed.');
  });
});

desc('Source code documentation.')
task('docs', function() {
  jake.exec('./node_modules/.bin/jsdoc -c ./jsdoc.conf.json');
});

task('default', ['test']);
