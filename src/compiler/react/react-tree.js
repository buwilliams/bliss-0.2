const js = require('../core/js.js');
const htmlElements = require('../core/html-elements.js');
const str = require('../core/str.js');

module.exports = {
  buildGetKey: function() {
    var out = `app.getKey = function() {
      var out = [];
      for(var i=0; i<arguments.length; i++) out.push(arguments[i]);
      return out.join('_');
    };`;
    return out;
  },

  buildMergeAttributesFn: function() {
    var out = `app.mergeAttributes = function(id, scope, dynamicAttributes, attrs) {
      for(key in dynamicAttributes) {
        if(dynamicAttributes.hasOwnProperty(key)) {
          var fn = dynamicAttributes[key];
          var value = app.methods[id][fn](scope, attrs);
          attrs[key] = value;
        }
      }
      return attrs;
    }`;
    return out;
  },

  buildKeyFn: function(id, index) {
    var out = '';
    if(typeof index === "string") {
      out += `app.getKey('id', '${id}', ${index})`;
    } else {
      out += `app.getKey('id', '${id}')`;
    }
    return out;
  },

  getAttributes: function(component, key) {
    var out = "";
    var attrs = [];

    var dynamicAttributes = js.aryToObj(component.dynamicAttributes, "name", "value");
    dynamicAttributes = JSON.stringify(dynamicAttributes);
    out += `app.mergeAttributes('${component.id}', scope, ${dynamicAttributes}, {`;

    var attributes = js.aryToObj(component.attributes, "name", "value");

    if(typeof attributes['class'] === "string") {
      attributes['className'] = attributes['class'];
      delete attributes['class'];
    }

    // TODO: replace with better solution
    if(attributes.hasOwnProperty('id') === false) {
      attributes.id = str.getRefId(component.name, component.id);
    }

    Object.keys(attributes).forEach(function(key) {
      attrs.push(`"${key}":"${attributes[key]}"`);
    });

    out += attrs.join(',');
    out += (attrs.length > 0) ? `,"key":${key}` : `"key":${key}`;
    out += "})";

    return out;
  },

  buildComponent: function(components, startId, designMode) {
    if(typeof startId === "undefined" || typeof startId === null) return "";
    var component = components[startId];

    var out = "\n";

    if(component.designMode === false && designMode === true) {
      out += "null";
      if(typeof component.next !== "undefined" && component.next !== null) {
        out += "," + this.buildComponent(components, component.next, designMode);
      }
      return out;
    }

    out += this.buildStartIf(components, component);

    var repeat = this.buildStartRepeat(components, component);
    out += repeat;

    out += "React.createElement(";
    if(htmlElements.has(component.element)) {
      out += `'${component.element}', `;
    } else {
      out += `${component.element}, `;
    }

    if(repeat === "") {
      out += this.getAttributes(component, this.buildKeyFn(component.id));
    } else {
      out += this.getAttributes(component, this.buildKeyFn(component.id, 'i'));
    }

    if(typeof component.textFn === "string" && component.textFn !== "") {
      var fn = `app.methods['${component.id}']['${component.textFn}']`;
      out += `, ${fn}(scope)`;
    } else if(typeof component.text === "string" && component.text !== "") {
      out += `, "${component.text}"`;
    }

    if(component.child !== null) {
      out += ", " + this.buildComponent(components, component.child, designMode);
    }

    out += ')';

    out += this.buildEndIf(components, component);
    out += this.buildEndRepeat(components, component);

    if(typeof component.next !== "undefined" && component.next !== null) {
      out += "," + this.buildComponent(components, component.next, designMode);
    }

    return out;
  },

  buildStartRepeat: function(components, component) {
    var key;
    if(typeof component.repeatFn === "undefined" ||
       component.repeatFn === null || component.repeatFn === "") {
      return "";
    }

    var fn = `app.methods['${component.id}']['${component.repeatFn}']`;
    var out = "";
    out += '(function(scope) {\n';
    out += 'var out = []\n;'
    out += `var list = scope['${component.repeatFn}'] = ${fn}(scope);\n`;
    out += `for (var i=0; i<list.length; i++) {\n`;
    out += `scope['${component.repeatFn}_index'] = i;`
    out += `out.push(`;
    return out;
  },

  buildEndRepeat: function(components, component) {
    var key;
    if(typeof component.repeatFn === "undefined" ||
       component.repeatFn === null || component.repeatFn === "") {
      return "";
    }
    var out = "";
    out += `);\n`;
    out += `}\n`;
    out += `return out;\n`;
    out += '})(scope)';
    return out;
  },

  buildStartIf: function(components, component) {
    if(typeof component.ifFn === "undefined" ||
       component.ifFn === null || component.ifFn === "") {
      return "";
    }

    var fn = `app.methods['${component.id}']['${component.ifFn}']`;
    var out = "";

    out += '(function(scope) {';
    out += 'var out = []\n;'
    out += `scope['${component.ifFn}'] = ${fn}(scope);`;
    out += `if(${fn}(scope) === true) {`;
    out += `out.push(`;
    return out;
  },

  buildEndIf: function(components, component) {
    if(typeof component.ifFn === "undefined" ||
       component.ifFn === null || component.ifFn === "") {
      return "";
    }
    var out = "";
    out += `);`;
    out += `}`;
    out += `return out;`;
    out += '})(scope)';

    return out;
  },

  buildComponents: function(components, startId, designMode) {
    var out = "app.rootComponent = function(props){ \n";
    out += `if(typeof props !== "undefined") app.props = props;\n`;
    out += "var scope = {};";
    out += "return (" + this.buildComponent(components, startId, designMode) + ");\n"
    out += "};\n"
    return out;
  },

  buildReactClass: function() {
    var out = "";
    out += `React.createClass({\n`;
    out += `getInitialState: function() {\n`;
    out += `var that = this;\n`;
    out += `return { app: createApp(that) };\n`;
    out += `},\n`;
    out += `componentDidMount: function() {\n`;
    out += `this.state.app.props = this.props;\n`;
    out += `this.setState({ app: this.state.app });\n`;
    out += `},\n`;
    out += `componentWillUnmount: function() {\n`;
    out += `if(this.state.app.js.destroy_component !== 'undefined') this.state.app.js.destroy_component();\n`;
    out += `},\n`;
    out += `componentWillReceiveProps: function(newProps) {\n`;
    out += `this.state.app.props = newProps;\n`;
    out += `this.setState({ app: this.state.app });\n`;
    out += `},\n`;
    out += `render: function() {\n`;
    out += `return this.state.app.rootComponent(this.state.app.props);\n`;
    out += `}\n`;
    out += `});\n`;
    return out;
  },

  buildReact: function(projectJson, startId, attachToDom) {
    attachToDom = typeof attachToDom === "undefined" ? true : attachToDom;
    var designMode = (projectJson.build === "designer") ? true : false;
    var out = "";
    out += this.buildGetKey();
    out += this.buildMergeAttributesFn();
    out += this.buildComponents(projectJson.components, startId, designMode);
    return out;
  }
};
