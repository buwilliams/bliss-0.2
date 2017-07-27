"use strict";

var BlissPropertiesCss = {
  "component": React.createClass({
    _keyIndex: 0,
    _internalKeys: {},

    getReactKey: function getReactKey(prefix, key) {
      var tmpKey = prefix + '_' + key;
      return tmpKey;
    },

    handleChange: function handleChange(newComponent) {
      this.props.onChange(newComponent);
    },

    renderProperties: function renderProperties(properties, index) {
      var that = this;

      var handleChange = function handleChange(originalKey, newKey, value) {
        if (originalKey === properties.length) {
          properties.push({
            "name": newKey,
            "value": value
          });
        } else if (newKey === "") {
          properties.splice(originalKey, 1);
        } else {
          properties[originalKey].name = newKey;
          properties[originalKey].value = value;
        }

        that.handleChange(that.props.component);
      };

      var render = function render() {
        var out = [];

        properties.forEach(function (property, index) {
          var reactKey = that.getReactKey('css', index);
          out.push(React.createElement(BlissProperty.component, {
            key: reactKey,
            type: "key-value",
            changeFn: handleChange,
            originalKey: index,
            propertyKey: property.name,
            propertyValue: property.value }));
        });

        var reactKey = that.getReactKey('css', properties.length);
        out.push(React.createElement(BlissProperty.component, {
          key: reactKey,
          type: "key-value",
          changeFn: handleChange,
          originalKey: properties.length,
          propertyKey: "",
          propertyValue: "" }));

        return out;
      };

      return render();
    },

    renderSelector: function renderSelector(selector, index) {
      var that = this;

      var handleSelectorChange = function handleSelectorChange(e) {
        var l = that.props.component.css.length;
        var newSelector = e.target.value;

        if (newSelector === '' && index !== l) {
          // delete the selector
          that.props.component.css.splice(index, 1);
        } else if (index === l) {
          // add the selector
          selector.selector = newSelector;
          that.props.component.css.push(selector);
        } else {
          // update the selector
          selector.selector = newSelector;
        }

        that.handleChange(that.props.component);
      };

      var renderProps = function renderProps() {
        if (index === that.props.component.css.length) {
          return null;
        } else {
          return that.renderProperties(selector.properties);
        }
      };

      return React.createElement(
        "div",
        { "data-keyvalue": that.getReactKey('css_selector', index),
          key: that.getReactKey('css_selector', index) },
        React.createElement(
          "div",
          { className: "clearfix" },
          React.createElement("input", { className: "selector",
            key: that.getReactKey('css_selector_index', index),
            onChange: handleSelectorChange,
            value: selector.selector || '',
            placeholder: "new css selector" })
        ),
        renderProps()
      );
    },

    render: function render() {
      var that = this;
      var out = [];
      var css = this.props.component.css;

      css.forEach(function (selector, index) {
        out.push(that.renderSelector(selector, index));
      });

      // render new selector
      var newSelector = { "selector": "", "properties": [] };
      out.push(that.renderSelector(newSelector, css.length));

      // render existing selector
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "title" },
          "CSS"
        ),
        out
      );
    }
  })
};
