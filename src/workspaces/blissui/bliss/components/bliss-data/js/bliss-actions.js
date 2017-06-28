"use strict";

var BlissActions = {
  "component": React.createClass({
    getInitialState: function getInitialState() {
      var state = {
        index: -1,
        CodeMirror: React.createFactory(CodeMirrorEditor)
      };
      return state;
    },

    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
      var state = {
        index: -1,
        CodeMirror: React.createFactory(CodeMirrorEditor)
      };
      return state;
    },

    handleActionSelect: function handleActionSelect(e) {
      e.preventDefault();
      var index = parseInt(e.target.getAttribute('data-index'));
      this.setState({ index: index });
    },

    renderActions: function renderActions() {
      var out = [];
      var actions = this.props.schema.actions;

      for (var i = 0; i < actions.length; i++) {
        var item = actions[i];
        var key = "action_" + i;
        var classStr = i === this.state.index ? "js-left-menu js-selected" : "js-left-menu";

        out.push(React.createElement(
          "div",
          { key: key, className: classStr },
          React.createElement(
            "a",
            { href: "#",
              "data-index": i,
              onClick: this.handleActionSelect,
              className: "js-left-menu-item" },
            item.action
          )
        ));
      }

      return out;
    },

    renderActionName: function renderActionName() {
      if (this.state.index === -1) return;

      var onChange = function onChange() {};

      return React.createElement(
        "div",
        { className: "js-right-menu" },
        React.createElement("input", { placeholder: "Enter action name...",
          value: this.props.schema.actions[this.state.index].action,
          onChange: onChange
        })
      );
    },

    renderEditor: function renderEditor() {
      if (this.state.index === -1) return;

      var fn = this.props.schema.actions[this.state.index];

      var handleChange = function handleChange() {};

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
      return React.createElement(
        "div",
        { className: "js-editor" },
        React.createElement(
          "div",
          { className: "js-menu clearfix" },
          React.createElement(
            "div",
            { className: "float-left" },
            "Editing schema ",
            React.createElement(
              "strong",
              null,
              this.props.schema.path
            )
          ),
          React.createElement(
            "a",
            { href: "#",
              onClick: this.props.onPathsEdit,
              className: "float-right" },
            React.createElement("i", { className: "fa fa-arrow-left" }),
            " Back"
          ),
          React.createElement(
            "a",
            { href: "#", className: "float-right" },
            React.createElement("i", { className: "fa fa-trash" }),
            " Delete"
          ),
          React.createElement(
            "a",
            { href: "#", className: "float-right" },
            React.createElement("i", { className: "fa fa-plus" }),
            " Path"
          )
        ),
        React.createElement(
          "div",
          { className: "js-left" },
          this.renderActions()
        ),
        React.createElement(
          "div",
          { className: "js-right" },
          this.renderActionName(),
          this.renderEditor()
        )
      );
    }
  })
};
