var pretty = require('pretty');
var html = require('../../core/html.js');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

module.exports = {
  write: function(outputPath, projectJson, startId) {
    var filename = (projectJson.filename || 'designer') + '.html';
    var strData = this.build(projectJson, startId);
    var fullpath = path.join(outputPath, filename);
    fs.writeFileSync(fullpath, strData);
  },

  build: function(projectJson, startId) {
    var out = "";
    out += html.getDoctype();
    out += html.openTag('html');

    out += html.openTag('head');
    out += html.getMetaCharset();
    out += html.openTag('title', null, (projectJson.pageTitle || projectJson.name));
    out += html.closeTag('title');

    out += html.openTag('meta', {
      'name': 'viewport',
      'content': 'width=device-width, initial-scale=1'
    })
    out += html.closeTag('meta');

    // CSS
    out += html.getExternalCss(projectJson.externalCss);
    out += html.getExternalCss(['css/' + (projectJson.filename || 'designer') + '.css']);

    out += html.closeTag('head');
    out += html.openTag('body');

    // HTML Body
    out += html.openTag('div', {'id': 'app'});
    out += html.closeTag('div');

    // JS
    out += html.openTag('script');
    out += "if (typeof module === 'object') {window.module = module; module = undefined;}";
    out += html.closeTag('script');

    out += html.getExternalJs(projectJson.externalJs);
    out += html.getExternalJs(['js/' + (projectJson.filename || 'designer') + '-new-project.js']);
    out += html.getExternalJs(['js/' + (projectJson.filename || 'designer') + '-project.js']);
    out += html.getExternalJs(['js/' + (projectJson.filename || 'designer') + '.js']);

    out += html.openTag('script');
    out += "if (window.module) module = window.module;";
    out += html.closeTag('script');

    out += html.closeTag('body');
    out += html.closeTag('html');
    return pretty(out);
  }
};
