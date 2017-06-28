'use strict';

var BlissPaths = {
  "component": React.createClass({
    getInitialState: function getInitialState() {
      return {};
    },

    componentWillReceiveProps: function componentWillReceiveProps(newProps) {},

    handleActions: function handleActions(e) {
      e.preventDefault();
      var index = parseInt(e.target.getAttribute('data-index'));
      this.props.onActionsEdit(index);
    },

    handlePathChange: function handlePathChange(e) {
      e.preventDefault();
      var path = e.target.value;
      var index = parseInt(e.target.getAttribute('data-index'));
      var len = this.props.schemas.length;
      var newSchemas = _.cloneDeep(this.props.schemas);

      if (index === len) {
        newSchemas.push({
          "path": path,
          "actions": []
        });
      } else {
        newSchemas[index].path = path;
      }

      this.props.onChange(newSchemas);
    },

    handleDelete: function handleDelete(e) {
      e.preventDefault();
      if (!confirm("Are you sure you want to delete this item?")) {
        return;
      }
      var index = parseInt(e.target.getAttribute('data-index'));
      var newSchemas = _.cloneDeep(this.props.schemas);
      newSchemas.splice(index, 1);

      this.props.onChange(newSchemas);
    },

    renderPaths: function renderPaths() {
      var out = [];

      for (var i = 0; i < this.props.schemas.length; i++) {
        var item = this.props.schemas[i];
        var key = "schema_" + i;
        out.push(React.createElement(
          'div',
          { key: key, className: 'js-path clearfix' },
          React.createElement('input', { className: 'form-control',
            placeholder: 'Enter new path...',
            'data-index': i,
            value: item.path,
            onChange: this.handlePathChange }),
          React.createElement(
            'div',
            { className: 'js-path-options' },
            React.createElement(
              'a',
              { href: '#', onClick: this.handleActions,
                'data-index': i },
              React.createElement('i', { className: 'fa fa-pencil' }),
              ' Actions'
            ),
            React.createElement(
              'a',
              { href: '#', onClick: this.handleDelete,
                'data-index': i },
              React.createElement('i', { className: 'fa fa-trash' }),
              ' Delete'
            )
          )
        ));
      }

      out.push(this.renderEmptyPath());

      return out;
    },

    renderEmptyPath: function renderEmptyPath() {
      var key = "schema_" + this.props.schemas.length;
      return React.createElement(
        'div',
        { key: key, className: 'js-path clearfix' },
        React.createElement('input', { className: 'form-control',
          'data-index': this.props.schemas.length,
          placeholder: 'Enter new path...',
          value: '',
          onChange: this.handlePathChange })
      );
    },

    render: function render() {
      return React.createElement(
        'div',
        { className: 'js-paths' },
        this.renderPaths()
      );
    }
  })
};
