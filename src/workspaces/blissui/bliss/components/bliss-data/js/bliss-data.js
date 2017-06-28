'use strict';

var BlissData = {
  "component": React.createClass({
    getInitialState: function getInitialState() {
      var state = {
        showPaths: true,
        selectedPathIndex: -1,
        selectedActionIndex: -1
      };

      return state;
    },

    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
      this.setState({
        showPaths: true,
        selectedPathIndex: -1,
        selectedActionIndex: -1
      });
    },

    handlePathsEdit: function handlePathsEdit() {
      console.log('handle paths edit');
    },

    handleActionsEdit: function handleActionsEdit() {
      console.log('handle actions edit');
    },

    handleChange: function handleChange(newSchema) {
      this.props.onChange(newSchema);
    },

    renderPaths: function renderPaths() {
      return React.createElement(BlissPaths.component, {
        onChange: this.handleChange,
        onActionsEdit: this.handleActionsEdit,
        schema: this.props.schema,
        selectedPathIndex: this.state.selectedPathIndex });
    },

    renderActions: function renderActions() {
      return React.createElement(BlissActions.component, {
        onChange: this.handleChange,
        actions: this.props.schema[this.state.selectedPathIndex] });
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
