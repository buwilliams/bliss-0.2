"use strict";

// Assumptions:
// 1. component passed in is attached to an object
// 2. there is a type string passed in (primitive, object)
// 3. always add an empty node at the end
// 4. deleting the contents of either the key or the value (if only has a value) deletes the item

// Properties:
//  objectContainer
//  objectKey
//  objectType [primitive, object] --> defaults to primitive
//  itemKey (required if objectType = object)
//  itemValue (required if objectType = object)
//  onChange

var BlissPropertiesGeneric = {
  "component": React.createClass({
    handleChange: function handleChange() {
      var newObject = this.props.objectContainer[this.props.objectKey].slice(0);
      this.props.onChange(newObject);
    },

    renderPrimitiveArray: function renderPrimitiveArray() {
      var that = this;
      var ref = this.props.objectContainer[this.props.objectKey];

      // on change method
      var _handleChange = function _handleChange(e) {
        var index = parseInt(e.target.dataset.index);
        var newValue = e.target.value;

        if (index === ref.length) {
          // handle add
          ref.push(newValue);
        } else if (newValue === "") {
          // handle delete
          ref.splice(index, 1);
        } else {
          // handle update
          ref[index] = newValue;
        }

        that.handleChange();
      };

      // loop through the array
      var out = [];
      ref.forEach(function (item, index) {
        // write inputs
        out.push(React.createElement("input", { className: "form-control", key: "key_" + index,
          "data-index": index, type: "text",
          onChange: _handleChange, value: item }));
      });

      // write new output
      out.push(React.createElement("input", { className: "form-control", key: "key_" + ref.length,
        "data-index": ref.length, type: "text",
        onChange: _handleChange, value: "",
        placeholder: "new..." }));

      return React.createElement(
        "div",
        null,
        out
      );
    },

    renderObjectArray: function renderObjectArray() {
      var that = this;
      var ref = this.props.objectContainer[this.props.objectKey];

      // on change method
      var _handleChangeKey = function _handleChangeKey(e) {
        var index = parseInt(e.target.dataset.index);
        var newValue = e.target.value;

        if (index === ref.length) {
          // handle add
          var newObj = {};
          newObj[that.props.itemKey] = newValue;
          newObj[that.props.itemValue] = "";
          ref.push(newObj);
        } else if (newValue === "") {
          // handle delete
          ref.splice(index, 1);
        } else {
          // handle update
          ref[index][that.props.itemKey] = newValue;
        }

        that.handleChange();
      };

      var _handleChangeValue = function _handleChangeValue(e) {
        var index = parseInt(e.target.dataset.index);
        var newValue = e.target.value;

        if (index < ref.length) {
          ref[index][that.props.itemValue] = newValue;
          that.handleChange();
        }
      };

      // loop through the array
      var out = [];
      ref.forEach(function (item, index) {
        // write inputs
        out.push(React.createElement(
          "div",
          { className: "clearfix", key: "key_" + index },
          React.createElement(
            "div",
            { className: "small" },
            React.createElement("input", { className: "form-control",
              "data-index": index, type: "text",
              onChange: _handleChangeKey, value: item[that.props.itemKey] })
          ),
          React.createElement(
            "div",
            { className: "small" },
            React.createElement("input", { className: "form-control",
              "data-index": index, type: "text",
              onChange: _handleChangeValue, value: item[that.props.itemValue] })
          )
        ));
      });

      out.push(React.createElement(
        "div",
        { className: "clearfix", key: "key_" + ref.length },
        React.createElement(
          "div",
          { className: "small" },
          React.createElement("input", { className: "form-control",
            "data-index": ref.length, type: "text",
            onChange: _handleChangeKey, value: "",
            placeholder: "new..." })
        ),
        React.createElement(
          "div",
          { className: "small" },
          React.createElement("input", { className: "form-control",
            "data-index": ref.length, type: "text",
            onChange: _handleChangeValue, value: "",
            placeholder: "new..." })
        )
      ));

      return React.createElement(
        "div",
        null,
        out
      );
    },

    render: function render() {
      if (this.props.objectType === "object") {
        return this.renderObjectArray();
      } else {
        // default type
        return this.renderPrimitiveArray();
      }
    }
  })
};
