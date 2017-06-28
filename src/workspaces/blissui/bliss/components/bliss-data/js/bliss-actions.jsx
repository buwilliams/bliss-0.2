var BlissActions = {
  "component": React.createClass({
    getInitialState: function() {
      return {}
    },

    componentWillReceiveProps: function(newProps) {
    },

    handleChange: function(newComponent) {
    },

    render: function() {
      return (
        <div className="js-paths">
          <div className="js-right-menu">
            <a href="#" className="float-left"><i className="fa fa-trash"></i> Delete</a>
            <a href="#" className="float-left"><i className="fa fa-trash"></i> Open</a>
            Paths
          </div>
        </div>
        <div className="js-editor">
          <div className="js-menu clearfix">
            <a href="#" className="float-left"><i className="fa fa-plus"></i> Path</a>
          </div>
          <div className="js-left">
            <div className="js-left-menu">
              <a href="#" className="js-left-menu-item">/some/locale</a>
            </div>
          </div>
          <div className="js-right">
            <div className="js-right-menu">
              <a href="#" className="float-left"><i className="fa fa-trash"></i> Delete</a>
              <a href="#" className="float-left"><i className="fa fa-trash"></i> Open</a>
              Paths
            </div>
          </div>
        </div>
      )
    }
  })
}
