task('default',
    ['build-bliss-core',
     'build-bliss-tree',
     'build-bliss-properties',
     'build-bliss-javascript'],
  function() {
    console.log(`Executing ${this.name}`);
  });

task('build-bliss-core', function() {
  console.log(`Executing ${this.name}`);
});

task('build-bliss-tree', function() {
  console.log(`Executing ${this.name}`);
  // babel compile jsx to dist
  // copy index.html to dist
  // copy all css to dist
});

task('build-bliss-properties', function() {
  console.log(`Executing ${this.name}`);
});

task('build-bliss-javascript', function() {
  console.log(`Executing ${this.name}`);
});
