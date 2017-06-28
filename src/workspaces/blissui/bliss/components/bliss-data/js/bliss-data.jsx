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
      this.setState({
        showPaths: true,
        selectedPathIndex: -1
      })
    },

    handlePathsEdit: function() {
      console.log('handle paths edit');
      this.setState({
        showPaths: true,
        selectedPathIndex: -1
      })
    },

    handleActionsEdit: function(index) {
      console.log('handle actions edit');
      this.setState({
        showPaths: false,
        selectedPathIndex: index
      })
    },

    handleSchemaChange: function(newSchema) {
      this.props.onChange(newSchema);
    },

    handleActionsChange: function(newActions) {
      var newSchema = _.cloneDeep(this.props.schemas);
      newSchema[this.state.selectedPathIndex] = newActions;
      this.props.onChange(newSchema);
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
