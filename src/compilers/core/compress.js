const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

module.exports = {
  zip: function(fromDir, toFile) {
    var ignoreFilesOrDirs = ['node_modules'];

    var promise = new Promise(function(resolve, reject) {
      // create a file to stream archive data to.
      var output = fs.createWriteStream(toFile);
      var archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      });

      // listen for all archive data to be written
      // 'close' event is fired only when a file descriptor is involved
      output.on('close', function() {
        //console.log(archive.pointer() + ' total bytes');
        //console.log('archiver has been finalized and the output file descriptor has closed.');
        resolve(toFile);
      });

      // This event is fired when the data source is drained no matter what was the data source.
      // It is not part of this library but rather from the NodeJS Stream API.
      // @see: https://nodejs.org/api/stream.html#stream_event_end
      output.on('end', function() {
        //console.log('Data has been drained');
        resolve(toFile);
      });

      // good practice to catch warnings (ie stat failures and other non-blocking errors)
      archive.on('warning', function(err) {
        if (err.code === 'ENOENT') {
          console.log('[WARN] ENOENT', err);
        } else {
          console.log('[WARN]', err);
        }
      });

      // good practice to catch this error explicitly
      archive.on('error', function(err) {
        console.log('[ERROR]', err);
        reject(err);
      });

      try {
        // pipe archive data to the file
        archive.pipe(output);

        // list all directories
        var dirs = fs.readdirSync(fromDir);

        var filtered = dirs.reduce((accum, value) => {
          var ignore = ignoreFilesOrDirs.reduce((accum, ignore) => {
            if(accum) return accum;
            if(value.indexOf(ignore) !== -1) return true;
            return false;
          }, false);

          if(!ignore) accum.push(value);
          return accum;
        }, []);

        filtered.forEach((name) => {
          var fullPath = path.join(fromDir, name);
          if(fs.lstatSync(fullPath).isDirectory()) {
            archive.directory(fullPath, name);
          } else {
            archive.file(fullPath, { name: name });
          }
        });

        // finalize the archive (ie we are done appending files but streams have to finish yet)
        // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
        archive.finalize();
      } catch(err) {
        console.log('[ERROR]', err);
        reject(err);
      }
    });
    return promise;
  }
};
