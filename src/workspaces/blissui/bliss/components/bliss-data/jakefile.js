const path = require('path')
const exec = require('sync-exec');

task('compile-jsx', function(inputPath, outputPath) {
  var list = new jake.FileList();
  list.include(`${inputPath}/**/*.jsx`);

  var cmds = list.toArray().map(function(file) {
    var pathData = path.parse(file);
    var outDir = pathData.dir.replace(inputPath, outputPath);
    jake.mkdirP(outDir);
    var command = `./node_modules/.bin/babel ${file} -o ${outDir}/${pathData.name}.js`;
    return command;
  });

  cmds.forEach(function(cmd) {
    exec(cmd);
  });
});

desc('Build');
task('build', function() {
  console.log('>> compile-jsx');
  var buildPath = __dirname;
  var t = jake.Task['compile-jsx'];
  t.execute.apply(t, [buildPath, buildPath]);
});

task('default', ['build']);
