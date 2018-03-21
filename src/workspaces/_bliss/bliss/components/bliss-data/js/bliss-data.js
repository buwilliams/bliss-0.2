"use strict";

var BlissData = {
  "component": React.createClass({
    getInitialState: function getInitialState() {
      var state = {
        showPaths: true,
        selectedPathIndex: -1
      };

      return state;
    },

    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
      //this.setState({
      //showPaths: true,
      //selectedPathIndex: -1
      //})
    },

    handlePathsEdit: function handlePathsEdit() {
      this.setState({
        showPaths: true,
        selectedPathIndex: -1
      });
    },

    handleActionsEdit: function handleActionsEdit(index) {
      this.setState({
        showPaths: false,
        selectedPathIndex: index
      });
    },

    handleSchemaChange: function handleSchemaChange(newSchemas) {
      this.props.onChange(newSchemas);
    },

    handleActionsChange: function handleActionsChange(newSchema) {
      var newSchemas = _.cloneDeep(this.props.schemas);
      newSchemas[this.state.selectedPathIndex] = newSchema;
      this.props.onChange(newSchemas);
    },

    renderPaths: function renderPaths() {
      return React.createElement(BlissPaths.component, {
        onChange: this.handleSchemaChange,
        onActionsEdit: this.handleActionsEdit,
        schemas: this.props.schemas,
        selectedPathIndex: this.state.selectedPathIndex });
    },

    renderActions: function renderActions() {
      return React.createElement(BlissActions.component, {
        onChange: this.handleActionsChange,
        onPathsEdit: this.handlePathsEdit,
        schema: this.props.schemas[this.state.selectedPathIndex] });
    },

    render: function render() {
      if (this.state.showPaths) {
        return this.renderPaths();
      } else {
        return this.renderActions();
      }
    }
  })
};
