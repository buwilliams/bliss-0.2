"use strict";

var _React$createClass;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BlissProperties = {
  "component": React.createClass((_React$createClass = {
    _keyIndex: 0,
    _internalKeys: {},

    getCamel: function getCamel(str) {
      str = str.replace(/[^a-z]/gi, ' ').trim();
      var out = str.split(" ").map(function (word, index) {
        if (index === 0) {
          return word.toLowerCase();
        } else {
          return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
        }
      }).join("");
      return out;
    },

    getReactKey: function getReactKey(prefix, key) {
      var tmpKey = prefix + '_' + key;
      if (typeof this._internalKeys[tmpKey] === "undefined") {
        this._internalKeys[tmpKey] = this._keyIndex++;
        return this._internalKeys[tmpKey];
      } else {
        return this._internalKeys[tmpKey];
      }
    },

    setReactKey: function setReactKey(prefix, oldKey, newKey) {
      var tmpKey = prefix + '_' + oldKey;
      var tmpValue = this._internalKeys[tmpKey];
      var newTmpKey = prefix + '_' + newKey;
      delete this._internalKeys[tmpKey];
      this._internalKeys[newTmpKey] = tmpValue;
    },

    handleChange: function handleChange(newComponent) {
      this.props.onChange(newComponent);
    },

    handleGeneralChange: function handleGeneralChange(key, value) {
      var newComponent = Object.assign({}, this.props.component);
      newComponent[key] = value;
      this.handleChange(newComponent);
    },

    renderObject: function renderObject(refName, title) {
      var that = this;

      var handleChange = function handleChange(originalKey, newKey, value) {
        var ref = that.props.component[refName];

        if (originalKey === ref.length) {
          ref.push({
            "name": newKey,
            "value": value
          });
        } else if (newKey === "") {
          ref.splice(originalKey, 1);
        } else {
          ref[originalKey].name = newKey;
          ref[originalKey].value = value;
        }

        that.handleChange(that.props.component);
      };

      var render = function render() {
        var out = [];
        var attrs = that.props.component[refName];
        if (typeof attrs === "undefined") return null;

        attrs.forEach(function (property, index) {
          var reactKey = that.getReactKey(refName, index);
          out.push(React.createElement(BlissProperty.component, {
            key: reactKey,
            type: "key-value",
            changeFn: handleChange,
            originalKey: index,
            propertyKey: property.name,
            propertyValue: property.value }));
        });

        var reactKey = that.getReactKey(refName, attrs.length);
        out.push(React.createElement(BlissProperty.component, {
          key: reactKey,
          type: "key-value",
          changeFn: handleChange,
          originalKey: attrs.length,
          propertyKey: "",
          propertyValue: "" }));

        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "title" },
            title
          ),
          out
        );
      };

      return render();
    },

    renderCss: function renderCss() {},

    renderGeneral: function renderGeneral() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "title" },
          "General"
        ),
        React.createElement(BlissProperty.component, {
          key: "name", type: "",
          changeFn: this.handleGeneralChange,
          originalKey: "name",
          propertyKey: "name",
          propertyValue: this.props.component.name }),
        React.createElement(BlissProperty.component, {
          key: "element", type: "",
          changeFn: this.handleGeneralChange,
          originalKey: "element",
          propertyKey: "element",
          propertyValue: this.props.component.element }),
        React.createElement(BlissProperty.component, {
          key: "text", type: "",
          changeFn: this.handleGeneralChange,
          originalKey: "text",
          propertyKey: "text",
          propertyValue: this.props.component.text }),
        React.createElement(BlissProperty.component, {
          key: "textFn", type: "",
          label: "text(fn)",
          changeFn: this.handleGeneralChange,
          originalKey: "textFn",
          propertyKey: "textFn",
          propertyValue: this.props.component.textFn }),
        React.createElement(BlissProperty.component, {
          key: "ifFn", type: "",
          label: "if(fn)",
          changeFn: this.handleGeneralChange,
          originalKey: "ifFn",
          propertyKey: "ifFn",
          propertyValue: this.props.component.ifFn }),
        React.createElement(BlissProperty.component, {
          key: "repeatFn", type: "",
          label: "repeat(fn)",
          changeFn: this.handleGeneralChange,
          originalKey: "repeatFn",
          propertyKey: "repeatFn",
          propertyValue: this.props.component.repeatFn })
      );
    }

  }, _defineProperty(_React$createClass, "renderCss", function renderCss() {
    return React.createElement(BlissPropertiesCss.component, {
      component: this.props.component,
      onChange: this.handleChange });
  }), _defineProperty(_React$createClass, "render", function render() {
    return React.createElement(
      "div",
      null,
      this.renderGeneral(),
      this.renderObject("attributes", "Attributes"),
      this.renderCss(),
      this.renderObject("dynamicAttributes", "Dynamic Attributes")
    );
  }), _React$createClass))
};
