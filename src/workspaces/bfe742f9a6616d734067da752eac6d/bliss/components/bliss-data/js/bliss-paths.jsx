var BlissPaths = {
  "component": React.createClass({
    getInitialState: function() {
      return {}
    },

    componentWillReceiveProps: function(newProps) {
    },

    handleActions: function(e) {
      e.preventDefault();
      var index = parseInt(e.target.getAttribute('data-index'));
      this.props.onActionsEdit(index);
    },

    handlePathChange: function(e) {
      e.preventDefault();
      var path = e.target.value;
      var index = parseInt(e.target.getAttribute('data-index'));
      var len = this.props.schemas.length;
      var newSchemas = _.cloneDeep(this.props.schemas);

      if(index === len) {
        newSchemas.push({
          "path": path,
          "actions": []
        })
      } else {
        newSchemas[index].path = path;
      }

      this.props.onChange(newSchemas);
    },

    handleDelete: function(e) {
      e.preventDefault();
      if(!confirm("Are you sure you want to delete this item?")) { return; }
      var index = parseInt(e.target.getAttribute('data-index'));
      var newSchemas = _.cloneDeep(this.props.schemas);
      newSchemas.splice(index, 1);

      this.props.onChange(newSchemas);
    },

    renderPaths: function() {
      var out = [];

      for(var i=0; i < this.props.schemas.length; i++) {
        var item = this.props.schemas[i];
        var key = "schema_" + i;
        out.push(
          <div key={key} className="js-path clearfix">
            <input className="form-control"
              placeholder="Enter new path..."
              data-index={i}
              value={item.path}
              onChange={this.handlePathChange} />
            <div className="js-path-options">
              <a href="#" onClick={this.handleActions}
                data-index={i}><i className="fa fa-pencil"></i> Actions</a>
              <a href="#" onClick={this.handleDelete}
                data-index={i}><i className="fa fa-trash"></i> Delete</a>
            </div>
          </div>
        )
      }

      out.push(this.renderEmptyPath());

      return out;
    },

    renderEmptyPath: function() {
      var key = "schema_" + this.props.schemas.length;
      return (
        <div key={key} className="js-path clearfix">
          <input className="form-control"
            data-index={this.props.schemas.length}
            placeholder="Enter new path..."
            value=""
            onChange={this.handlePathChange} />
        </div>
      )
    },

    render: function() {
      return (
        <div className="js-paths">
          {this.renderPaths()}
        </div>
      )
    }
  })
}
