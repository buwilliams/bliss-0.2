"use strict";

var BlissProperty = {
  "component": React.createClass({
    getKey: function getKey() {
      return this.props.propertyKey;
    },

    handleKeyChange: function handleKeyChange(e) {
      var newKey = e.target.value;
      if (this.props.type === "key-value") {
        this.props.changeFn(this.props.originalKey, newKey, this.props.propertyValue);
      } else {
        this.props.changeFn(newKey, this.props.propertyValue);
      }
    },

    handleValueChange: function handleValueChange(e) {
      var newValue = e.target.value;
      if (this.props.type === "key-value") {
        this.props.changeFn(this.props.originalKey, this.props.propertyKey, newValue);
      } else {
        this.props.changeFn(this.props.propertyKey, newValue);
      }
    },

    handleValueFocus: function handleValueFocus() {},

    renderPropertyKey: function renderPropertyKey() {
      if (this.props.type === "key-value") {
        var className = "small";
        return React.createElement("input", { className: className,
          onChange: this.handleKeyChange,
          value: this.getKey() || '',
          placeholder: "new key" });
      } else {
        var label = this.props.propertyKey || '';
        if (typeof this.props.label !== "undefined") label = this.props.label;
        return React.createElement(
          "div",
          { className: "small" },
          label
        );
      }
    },

    renderPropertyValue: function renderPropertyValue() {
      if (this.props.type === "readonly") {
        return React.createElement(
          "div",
          { className: "small" },
          this.props.propertyKey
        );
      } else {
        var className = "small";
        return React.createElement("input", { className: className,
          onChange: this.handleValueChange,
          onFocus: this.handleValueFocus,
          value: this.props.propertyValue || '',
          placeholder: "new value" });
      }
    },

    render: function render() {
      return React.createElement(
        "div",
        { className: "clearfix" },
        this.renderPropertyKey(),
        this.renderPropertyValue()
      );
    }
  })
};
