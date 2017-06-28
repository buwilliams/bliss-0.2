'use strict';

var BlissPaths = {
  "component": React.createClass({
    getInitialState: function getInitialState() {
      return {};
    },

    componentWillReceiveProps: function componentWillReceiveProps(newProps) {},

    handleActionsEdit: function handleActionsEdit(e) {
      e.preventDefault();
      var index = parseInt(e.target.getAttribute('data-index'));
      this.props.onActionsEdit(index);
    },

    handlePathChange: function handlePathChange(e) {
      e.preventDefault();
      var path = e.target.value;
      var index = parseInt(e.target.getAttribute('data-index'));
      var len = this.props.schema.length;
      var newSchema = _.cloneDeep(this.props.schema);

      if (index === len) {
        newSchema.push({
          "path": path,
          "actions": []
        });
      } else {
        newSchema[index].path = path;
      }

      this.props.onChange(newSchema);
    },

    handleDelete: function handleDelete(e) {
      e.preventDefault();
      if (!confirm("Are you sure you want to delete this item?")) {
        return;
      }
      var index = parseInt(e.target.getAttribute('data-index'));
      var newSchema = _.cloneDeep(this.props.schema);
      newSchema.splice(index, 1);

      this.props.onChange(newSchema);
    },

    renderPaths: function renderPaths() {
      var out = [];

      for (var i = 0; i < this.props.schema.length; i++) {
        var item = this.props.schema[i];
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
      var key = "schema_" + this.props.schema.length;
      return React.createElement(
        'div',
        { key: key, className: 'js-path clearfix' },
        React.createElement('input', { className: 'form-control',
          'data-index': this.props.schema.length,
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
