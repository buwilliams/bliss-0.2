var BlissData = {
  "component": React.createClass({
    getInitialState: function() {
      var state = {
        showPaths: true,
        selectedPathIndex: -1,
        selectedActionIndex: -1
      };

      return state;
    },

    componentWillReceiveProps: function(newProps) {
      this.setState({
        showPaths: true,
        selectedPathIndex: -1,
        selectedActionIndex: -1
      })
    },

    handlePathsEdit: function() {
      console.log('handle paths edit');
    },

    handleActionsEdit: function() {
      console.log('handle actions edit');
    },

    handleChange: function(newSchema) {
      this.props.onChange(newSchema);
    },

    renderPaths: function() {
      return (<BlissPaths.component
        onChange={this.handleChange}
        onActionsEdit={this.handleActionsEdit}
        schema={this.props.schema}
        selectedPathIndex={this.state.selectedPathIndex} />);
    },

    renderActions: function() {
      return (<BlissActions.component
        onChange={this.handleChange}
        actions={this.props.schema[this.state.selectedPathIndex]} />);
    },

    render: function() {
      if(this.state.showPaths) {
        return this.renderPaths();
      } else {
        return this.renderActions();
      }
    }
  })
}
