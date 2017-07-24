"use strict";

var BlissJavascript = {
  "component": React.createClass({
    getInitialState: function getInitialState() {
      var state = {
        newCount: 1,
        selected: null,
        CodeMirror: React.createFactory(CodeMirrorEditor)
      };

      return state;
    },

    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
      // If we are getting a brand new component
      // then let's reset the state
      if (newProps.component === this.props.component) return;
      var state = {
        newCount: 1,
        selected: null,
        CodeMirror: React.createFactory(CodeMirrorEditor)
      };
      this.setState(state);
    },

    findIndex: function findIndex(array, name) {
      var index = -1;
      for (var i = 0; i < array.length; i++) {
        var fn = array[i];
        if (fn.name === name) {
          index = i;
          break;
        }
      }
      return index;
    },

    addJsTemplate: function addJsTemplate(jsStr) {
      var newKey = "new_" + this.state.newCount;

      var ref = this.props.component.js;

      ref.push({
        "name": newKey,
        "body": jsStr
      });

      var newState = {
        newCount: this.state.newCount + 1,
        selected: newKey
      };

      this.setState(newState, function () {
        this.handleChange(this.props.component);
      }.bind(this));
    },

    handleChange: function handleChange(newComponent) {
      this.props.onChange(newComponent);
    },

    handleAddFn: function handleAddFn() {
      var js = "function(scope, attributes) {\n";
      js += "  return null;\n";
      js += "}";
      this.addJsTemplate(js);
    },

    handleAddEventFn: function handleAddEventFn() {
      var js = "";
      js += "function(scope, attributes) {\n";
      js += "  return function(e) {\n";
      js += "    app.setState(function() {\n";
      js += "      // Your code here\n";
      js += "    });\n";
      js += "  }\n";
      js += "};\n";
      this.addJsTemplate(js);
    },

    handleAddRepeatFn: function handleAddRepeatFn() {
      var js = "";
      js += "function(scope, attributes) {\n";
      js += "  return [];\n";
      js += "};\n";
      this.addJsTemplate(js);
    },

    handleAddTextFn: function handleAddTextFn() {
      var js = "";
      js += "function(scope, attributes) {\n";
      js += "  return \"\";\n";
      js += "};\n";
      this.addJsTemplate(js);
    },

    handleDelete: function handleDelete() {
      var that = this;
      if (this.state.selected === null) return;

      var ref = this.props.component.js;

      var index = this.findIndex(ref, this.state.selected);
      ref.splice(index, 1);

      var newState = { selected: null };
      if (index - 1 >= 0) {
        newState.selected = ref[index - 1].name;
      } else if (ref.length > 0) {
        newState.selected = ref[0].name;
      }

      this.setState(newState, function () {
        this.handleChange(that.props.component);
      }.bind(this));
    },

    renderFns: function renderFns() {
      var that = this;
      var out = [];

      var ref = this.props.component.js;

      var handleClick = function handleClick(e) {
        var key = e.target.name;
        e.preventDefault();
        var index = that.findIndex(ref, key);
        that.setState({ selected: ref[index].name });
      };

      ref.forEach(function (fn) {
        var value = fn.body;
        var classValue = fn.name === that.state.selected ? "js-left-menu-item js-selected" : "js-left-menu-item";
        out.push(React.createElement(
          "a",
          { href: "#", className: classValue, key: fn.name, name: fn.name, onClick: handleClick },
          fn.name
        ));
      });

      return out;
    },

    renderJsName: function renderJsName() {
      var that = this;
      if (this.state.selected === null) return null;

      var handleNameChange = function handleNameChange(e) {
        var newName = e.target.value;
        var index = that.findIndex(that.props.component.js, that.state.selected);
        that.props.component.js[index].name = newName;
        that.setState({ selected: newName }, function () {
          that.handleChange(this.props.component);
        });
      };

      return React.createElement("input", { onChange: handleNameChange, value: this.state.selected, placeholder: "Name..." });
    },

    renderJs: function renderJs() {
      var that = this;
      if (this.state.selected === null) return null;

      var handleChange = function handleChange(e) {
        var newValue = e.target.value;
        var index = that.findIndex(that.props.component.js, that.state.selected);
        that.props.component.js[index].body = newValue;
        that.handleChange(that.props.component);
      };

      var index = this.findIndex(this.props.component.js, this.state.selected);
      var fn = this.props.component.js[index];

      return this.state.CodeMirror({
        textAreaClassName: ['form-control'],
        textAreaStyle: { minHeight: '10em' },
        value: fn.body,
        onChange: handleChange,
        mode: 'javascript',
        theme: 'solarized',
        tabSize: 2,
        indentWithTabs: false,
        lineNumbers: true
      });
    },

    render: function render() {
      if (typeof this.props.component === "undefined" || this.props.component === null) {
        return null;
      }

      return React.createElement(
        "div",
        { className: "js-editor" },
        React.createElement(
          "div",
          { className: "js-menu clearfix" },
          React.createElement(
            "a",
            { href: "#", onClick: this.handleAddFn, className: "float-left" },
            React.createElement("i", { className: "fa fa-plus", "aria-hidden": "true" }),
            " Fn"
          ),
          React.createElement(
            "a",
            { href: "#", onClick: this.handleAddEventFn, className: "float-left" },
            React.createElement("i", { className: "fa fa-plus", "aria-hidden": "true" }),
            " Event"
          ),
          React.createElement(
            "a",
            { href: "#", onClick: this.handleAddRepeatFn, className: "float-left" },
            React.createElement("i", { className: "fa fa-plus", "aria-hidden": "true" }),
            " Repeat"
          ),
          React.createElement(
            "a",
            { href: "#", onClick: this.handleAddTextFn, className: "float-left" },
            React.createElement("i", { className: "fa fa-plus", "aria-hidden": "true" }),
            " Text"
          ),
          React.createElement(
            "a",
            { href: "#", onClick: this.handleDelete, className: "float-right" },
            React.createElement("i", { className: "fa fa-trash", "aria-hidden": "true" }),
            " Delete"
          )
        ),
        React.createElement(
          "div",
          { className: "js-left" },
          React.createElement(
            "div",
            { className: "js-left-menu" },
            this.renderFns()
          )
        ),
        React.createElement(
          "div",
          { className: "js-right" },
          React.createElement(
            "div",
            { className: "js-right-menu" },
            this.renderJsName()
          ),
          React.createElement(
            "div",
            null,
            this.renderJs()
          )
        )
      );
    }
  })
};
