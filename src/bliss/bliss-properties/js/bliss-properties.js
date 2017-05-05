"use strict";

var BlissProperties = {
  "component": React.createClass({
    _keyIndex: 0,
    _internalKeys: {},

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
      var that = this;
      that.props.onChange(newComponent);
    },

    handleGeneralChange: function handleGeneralChange(key, value) {
      var newComponent = Object.assign({}, this.props.component);
      newComponent[key] = value;
      this.handleChange(newComponent);
    },

    renderObject: function renderObject(refName, title) {
      var that = this;

      var handleChange = function handleChange(originalKey, newKey, value) {
        var newComponent = Object.assign({}, that.props.component);

        that.setReactKey(refName, originalKey, newKey);

        delete newComponent[refName][originalKey];
        newComponent[refName][newKey] = value;

        // delete blank ones
        delete newComponent[refName][""];

        that.handleChange(newComponent);
      };

      var render = function render() {
        var out = [];
        var attrs = that.props.component[refName];
        if (typeof attrs === "undefined") return null;

        Object.keys(attrs).forEach(function (key, index) {
          var reactKey = that.getReactKey(refName, key);
          out.push(React.createElement(BlissProperty.component, {
            key: reactKey, type: "key-value",
            changeFn: handleChange,
            originalKey: key,
            propertyKey: key,
            propertyValue: attrs[key] }));
        });

        var reactKey = that.getReactKey(refName, "zzz~");
        out.push(React.createElement(BlissProperty.component, {
          key: reactKey, type: "key-value",
          changeFn: handleChange,
          originalKey: "zzz~",
          propertyKey: "zzz~",
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
    },

    render: function render() {
      return React.createElement(
        "div",
        null,
        this.renderGeneral(),
        this.renderObject("attributes", "Attributes"),
        this.renderObject("css", "CSS"),
        this.renderObject("dynamicAttributes", "Dynamic Attributes")
      );
    }
  })
};
