module.exports = {
  getAttributes: function(attributes) {
    if(typeof attributes === "undefined") return "";

    var attrs = Object.keys(attributes);

    if(attrs.length === 0) return "";

    attrs = attrs.map(function(key) {
      return key + '="' + attributes[key] + '"';
    });

    return " " + attrs.join(" ");
  },

  openTag: function(tag, attributes, text) {
    text = (typeof text === "undefined" || text === null) ? "" : text;

    var attr = (typeof attributes === "undefined" || attributes === null) ?
      "" : this.getAttributes(attributes);

    return `<${tag}${attr}>${text}`;
  },

  closeTag: function(tag) {
    return `</${tag}>`;
  },

  getDoctype: function() {
    return '<!DOCTYPE html>';
  },

  getMetaCharset: function() {
    return '<meta charset="utf-8">';
  },

  openHtml: function(title) {
    if(typeof title === "undefined") title = "";
    return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>'+title+'</title></head><body>';
  },

  closeHtml: function() {
    return '</body></html>';
  },

  getExternalCss: function(urls) {
    if(typeof urls === "undefined" || urls === null) return "";

    return urls.map(function(url) {
      return `<link href="${url}" rel="stylesheet">`
    }).join('');
  },

  getExternalJs: function(urls) {
    if(typeof urls === "undefined" || urls === null) return "";

    return urls.map(function(url) {
      return `<script src="${url}" charset="utf-8"></script>`
    }).join('');
  },

  buildDom: function(components, id) {
    var out = "";

    if(id === null || typeof id === "undefined") return out; // base case

    var component = components[id];

    if(component.disabled === true || component.type === "dynamic") return out;

    // Give each dom element an id
    component.attributes.id = component.name
      .toLowerCase().replace(/\s/g, '_') + '_' + component.id;

    out += this.openTag(component.element, component.attributes, component.text);
    out += this.buildDom(components, component.child);
    out += this.closeTag(component.element, component.attributes);
    out += this.buildDom(components, component.next);

    return out;
  },
};
