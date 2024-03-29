var BlissData = {
  "component": React.createClass({
    getInitialState: function() {
      var state = {
        showPaths: true,
        selectedPathIndex: -1
      };

      return state;
    },

    componentWillReceiveProps: function(newProps) {
      //this.setState({
        //showPaths: true,
        //selectedPathIndex: -1
      //})
    },

    handlePathsEdit: function() {
      this.setState({
        showPaths: true,
        selectedPathIndex: -1
      })
    },

    handleActionsEdit: function(index) {
      this.setState({
        showPaths: false,
        selectedPathIndex: index
      })
    },

    handleSchemaChange: function(newSchemas) {
      this.props.onChange(newSchemas);
    },

    handleActionsChange: function(newSchema) {
      var newSchemas = _.cloneDeep(this.props.schemas);
      newSchemas[this.state.selectedPathIndex] = newSchema;
      this.props.onChange(newSchemas);
    },

    renderPaths: function() {
      return (<BlissPaths.component
        onChange={this.handleSchemaChange}
        onActionsEdit={this.handleActionsEdit}
        schemas={this.props.schemas}
        selectedPathIndex={this.state.selectedPathIndex} />);
    },

    renderActions: function() {
      return (<BlissActions.component
        onChange={this.handleActionsChange}
        onPathsEdit={this.handlePathsEdit}
        schema={this.props.schemas[this.state.selectedPathIndex]} />);
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
