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

    handleAdd: function handleAdd(e) {
      e.preventDefault();
      var schema = this.props.schema;
      var newValue = {
        "action": "new_action",
        "body": "function (data, args) {\n  var newData = {}\n  return newData;\n}"
      };
      schema.actions.push(newValue);
      this.props.onChange(schema);
    },

    handleDelete: function handleDelete(e) {
      e.preventDefault();
      if (this.state.index === -1) return;

      var that = this;
      var newIndex = this.state.index === 0 ? 0 : this.state.index - 1;
      if (this.props.schema.actions.length === 1) newIndex = -1;

      var schema = this.props.schema;

      schema.actions.splice(this.state.index, 1);

      this.setState({ index: newIndex }, function () {
        this.props.onChange(schema);
      });
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
      var that = this;
      if (this.state.index === -1) return;

      var onChange = function onChange(e) {
        var schema = that.props.schema;
        var newValue = e.target.value;
        schema.actions[that.state.index].action = newValue;
        that.props.onChange(schema);
      };

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
      var that = this;

      var fn = this.props.schema.actions[this.state.index];

      var handleChange = function handleChange(e) {
        var schema = that.props.schema;
        var newValue = e.target.value;
        schema.actions[that.state.index].body = newValue;
        that.props.onChange(schema);
      };

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
            { className: "text-center" },
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
              className: "float-left" },
            React.createElement("i", { className: "fa fa-arrow-left" }),
            " Back"
          ),
          React.createElement(
            "a",
            { href: "#",
              className: "float-left",
              onClick: this.handleAdd },
            React.createElement("i", { className: "fa fa-plus" }),
            " Action"
          ),
          React.createElement(
            "a",
            { href: "#",
              className: "float-right",
              onClick: this.handleDelete },
            React.createElement("i", { className: "fa fa-trash" }),
            " Delete"
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
