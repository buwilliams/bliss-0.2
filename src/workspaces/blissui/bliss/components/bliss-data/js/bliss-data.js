'use strict';

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
      this.setState({
        showPaths: true,
        selectedPathIndex: -1
      });
    },

    handlePathsEdit: function handlePathsEdit() {
      console.log('handle paths edit');
      this.setState({
        showPaths: true,
        selectedPathIndex: -1
      });
    },

    handleActionsEdit: function handleActionsEdit(index) {
      console.log('handle actions edit');
      this.setState({
        showPaths: false,
        selectedPathIndex: index
      });
    },

    handleSchemaChange: function handleSchemaChange(newSchema) {
      this.props.onChange(newSchema);
    },

    handleActionsChange: function handleActionsChange(newActions) {
      var newSchema = _.cloneDeep(this.props.schemas);
      newSchema[this.state.selectedPathIndex] = newActions;
      this.props.onChange(newSchema);
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
