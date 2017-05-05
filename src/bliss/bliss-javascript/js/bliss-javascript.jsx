var BlissJavascript = {
  "component": React.createClass({
    getInitialState: function() {
      var state = {
        new_count: 1,
        selected: null,
        CodeMirror: React.createFactory(CodeMirrorEditor)
      };

      return state;
    },

    componentWillReceiveProps: function(newProps) {
      if(typeof newProps.component !== "undefined" &&
         newProps.component !== null &&
         typeof this.props.component !== "undefined" &&
         this.props.component !== null) {
        if(newProps.component.id !== this.props.component.id) {
          this.setState({selected: null});
        } else {
          return;
        }
      } else {
        this.setState({selected: null});
      }
    },

    addJsTemplate: function(jsStr) {
      var newComponent = Object.assign({}, this.props.component);
      var newKey = "new_" + this.state.new_count;

      newComponent.js[newKey] = jsStr;

      var newState = {
        new_count: this.state.new_count + 1,
        selected: newKey
      };

      this.setState(newState, function() {
        this.handleChange(newComponent);
      }.bind(this));
    },

    handleChange: function(newComponent) {
      this.props.onChange(newComponent);
    },

    handleAddFn: function() {
      var js = "function(scope, attributes) {\n";
      js += "  return null;\n";
      js += "}";
      this.addJsTemplate(js);
    },

    handleAddEventFn: function() {
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

    handleAddRepeatFn: function() {
      var js = "";
      js += "function(scope, attributes) {\n";
      js += "  return [];\n";
      js += "};\n";
      this.addJsTemplate(js);
    },

    handleAddTextFn: function() {
      var js = "";
      js += "function(scope, attributes) {\n";
      js += "  return \"\";\n";
      js += "};\n";
      this.addJsTemplate(js);
    },

    handleDelete: function() {
      if(this.state.selected === null) return;
      var newComponent = Object.assign({}, this.props.component);
      delete newComponent.js[this.state.selected];

      var newState = { selected: null };

      var keys = Object.keys(newComponent.js).sort();
      if(keys.length > 0) newState.selected = keys[keys.length - 1];

      this.setState(newState, function() {
        this.handleChange(newComponent);
      }.bind(this));
    },

    renderFns: function() {
      var that = this;
      var out = [];

      var handleClick = function(e) {
        var key = e.target.name;
        e.preventDefault();
        that.setState({selected: key});
      };

      Object.keys(this.props.component.js).sort().forEach(function(key) {
        var value = that.props.component.js[key];
        var classValue = (key === that.state.selected) ? "js-left-menu-item js-selected" : "js-left-menu-item";
        out.push(
          <a href="#" className={classValue} key={key} name={key} onClick={handleClick}>{key}</a>
        );
      });

      return out;
    },

    renderJsName: function() {
      var that = this;
      if(this.state.selected === null) return null;

      var handleNameChange = function(e) {
        var currentName = that.state.selected;
        var newName = e.target.value;
        var newValue = that.props.component.js[that.state.selected];

        var newComponent = Object.assign({}, that.props.component);
        newComponent.js[newName] = newValue;
        delete newComponent.js[currentName];

        that.handleChange(newComponent);
        that.setState({selected: newName});
      };

      return (<input onChange={handleNameChange} value={this.state.selected} placeholder="Name..." />);
    },

    renderJs: function() {
      var that = this;
      if(this.state.selected === null) return null;

      var handleChange = function(e) {
        var newValue = e.target.value;
        var newComponent = Object.assign({}, that.props.component);
        newComponent.js[that.state.selected] = newValue;
        that.handleChange(newComponent);
      };

      var js = this.props.component.js[this.state.selected];

      return this.state.CodeMirror({
        textAreaClassName: ['form-control'],
        textAreaStyle: {minHeight: '10em'},
        value: js,
        onChange: handleChange,
        mode: 'javascript',
        theme: 'solarized',
        tabSize: 2,
        indentWithTabs: false,
        lineNumbers: true
      });
    },

    render: function() {
      if(typeof this.props.component === "undefined" || this.props.component === null) {
        return null;
      }

      return (
        <div className="js-editor">
          <div className="js-menu clearfix">
            <a href="#" onClick={this.handleAddFn} className="float-left"><i className="fa fa-plus" aria-hidden="true"></i> Fn</a>
            <a href="#" onClick={this.handleAddEventFn} className="float-left"><i className="fa fa-plus" aria-hidden="true"></i> Event</a>
            <a href="#" onClick={this.handleAddRepeatFn} className="float-left"><i className="fa fa-plus" aria-hidden="true"></i> Repeat</a>
            <a href="#" onClick={this.handleAddTextFn} className="float-left"><i className="fa fa-plus" aria-hidden="true"></i> Text</a>
            <a href="#" onClick={this.handleDelete} className="float-right"><i className="fa fa-trash" aria-hidden="true"></i> Delete</a>
          </div>
          <div className="js-left">
            <div className="js-left-menu">
              {this.renderFns()}
            </div>
          </div>
          <div className="js-right">
            <div className="js-right-menu">{this.renderJsName()}</div>
            <div>{this.renderJs()}</div>
          </div>
        </div>
      );
    }
  })
}
