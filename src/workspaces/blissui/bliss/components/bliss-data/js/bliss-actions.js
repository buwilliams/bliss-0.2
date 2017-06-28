"use strict";

var BlissActions = {
  "component": React.createClass({
    getInitialState: function getInitialState() {
      return {};
    },

    componentWillReceiveProps: function componentWillReceiveProps(newProps) {},

    handleChange: function handleChange(newComponent) {},

    render: function render() {
      return React.createElement(
        "div",
        { className: "js-editor" },
        React.createElement(
          "div",
          { className: "js-menu clearfix" },
          React.createElement(
            "a",
            { href: "#", className: "float-left" },
            React.createElement("i", { className: "fa fa-plus" }),
            " Path"
          )
        ),
        React.createElement(
          "div",
          { className: "js-left" },
          React.createElement(
            "div",
            { className: "js-left-menu" },
            React.createElement(
              "a",
              { href: "#", className: "js-left-menu-item" },
              "/some/locale"
            )
          )
        ),
        React.createElement(
          "div",
          { className: "js-right" },
          React.createElement(
            "div",
            { className: "js-right-menu" },
            React.createElement(
              "a",
              { href: "#", className: "float-left" },
              React.createElement("i", { className: "fa fa-trash" }),
              " Delete"
            ),
            React.createElement(
              "a",
              { href: "#", className: "float-left" },
              React.createElement("i", { className: "fa fa-trash" }),
              " Open"
            ),
            "Paths"
          )
        )
      );
    }
  })
};
