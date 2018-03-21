var BlissActions = {
  "component": React.createClass({
    getInitialState: function() {
      var state = {
        index: -1,
        CodeMirror: React.createFactory(CodeMirrorEditor)
      }
      return state
    },

    componentWillReceiveProps: function(newProps) {
      var state = {
        index: -1,
        CodeMirror: React.createFactory(CodeMirrorEditor)
      }
      return state
    },

    handleActionSelect: function(e) {
      e.preventDefault();
      var index = parseInt(e.target.getAttribute('data-index'));
      this.setState({index:index})
    },

    handleAdd: function(e) {
      e.preventDefault();
      var schema = this.props.schema;
      var newValue = {
        "action": "new_action",
        "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  // your edits here\n  return newData;\n}"
      };
      schema.actions.push(newValue);
      this.props.onChange(schema);
    },

    handleDelete: function(e) {
      e.preventDefault();
      if(this.state.index === -1) return;

      var that = this;
      var newIndex = (this.state.index === 0) ? 0 : this.state.index - 1;
      if(this.props.schema.actions.length === 1) newIndex = -1;

      var schema = this.props.schema;

      schema.actions.splice(this.state.index, 1);

      this.setState({index:newIndex}, function() {
        this.props.onChange(schema);
      })
    },

    renderActions: function() {
      var out = [];
      var actions = this.props.schema.actions;

      for(var i=0; i < actions.length; i++) {
        var item = actions[i];
        var key = "action_" + i;
        var classStr = i === this.state.index ?
          "js-left-menu js-selected" : "js-left-menu"

        out.push(
          <div key={key} className={classStr}>
            <a href="#"
              data-index={i}
              onClick={this.handleActionSelect}
              className="js-left-menu-item">{item.action}</a>
          </div>
        )
      }

      return out;
    },

    renderActionName: function() {
      var that = this;
      if(this.state.index === -1) return;

      var onChange = function(e) {
        var schema = that.props.schema;
        var newValue = e.target.value;
        schema.actions[that.state.index].action = newValue;
        that.props.onChange(schema);
      };

      return (
        <div className="js-right-menu">
          <input placeholder="Enter action name..."
            value={this.props.schema.actions[this.state.index].action}
            onChange={onChange}
            />
        </div>
      )
    },

    renderEditor: function() {
      if(this.state.index === -1) return;
      var that = this;

      var fn = this.props.schema.actions[this.state.index];

      var handleChange = function(e){
        var schema = that.props.schema;
        var newValue = e.target.value;
        schema.actions[that.state.index].body = newValue;
        that.props.onChange(schema);
      }

      return this.state.CodeMirror({
        textAreaClassName: ['form-control'],
        textAreaStyle: {minHeight: '10em'},
        value: fn.body,
        onChange: handleChange,
        mode: 'javascript',
        theme: 'solarized',
        tabSize: 2,
        indentWithTabs: false,
        lineNumbers: true
      });
    },

    render: function() {
      return (
        <div className="js-editor">
          <div className="js-menu clearfix">
            <div className="text-center">Editing schema <strong>{this.props.schema.path}</strong></div>
            <a href="#"
              onClick={this.props.onPathsEdit}
              className="float-left"><i className="fa fa-arrow-left"></i> Back</a>
            <a href="#"
              className="float-left"
              onClick={this.handleAdd}><i className="fa fa-plus"></i> Action</a>
            <a href="#"
              className="float-right"
              onClick={this.handleDelete}><i className="fa fa-trash"></i> Delete</a>
          </div>
          <div className="js-left">
            {this.renderActions()}
          </div>
          <div className="js-right">
            {this.renderActionName()}
            {this.renderEditor()}
          </div>
        </div>
      )
    }
  })
}
