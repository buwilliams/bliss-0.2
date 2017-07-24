var BlissProperty = {
  "component": React.createClass({
    getKey: function() {
      return this.props.propertyKey;
    },

    handleKeyChange: function(e) {
      var newKey = e.target.value;
      if(this.props.type === "key-value") {
        this.props.changeFn(this.props.originalKey, newKey, this.props.propertyValue);
      } else {
        this.props.changeFn(newKey, this.props.propertyValue);
      }
    },

    handleValueChange: function(e) {
      var newValue = e.target.value;
      if(this.props.type === "key-value") {
        this.props.changeFn(this.props.originalKey, this.props.propertyKey, newValue);
      } else {
        this.props.changeFn(this.props.propertyKey, newValue);
      }
    },

    handleValueFocus: function() {
    },

    renderPropertyKey: function() {
      if(this.props.type === "key-value") {
        var className = "small"
        return (
          <input className={className}
                 onChange={this.handleKeyChange}
                 value={this.getKey() || ''}
                 placeholder="new key" />);
      } else {
        var label = this.props.propertyKey || '';
        if(typeof this.props.label !== "undefined") label = this.props.label;
        return (<div className="small">{label}</div>);
      }
    },

    renderPropertyValue: function() {
      if(this.props.type === "readonly") {
        return (<div className="small">{this.props.propertyKey}</div>);
      } else {
        var className = "small"
        return (
          <input className={className}
                 onChange={this.handleValueChange}
                 onFocus={this.handleValueFocus}
                 value={this.props.propertyValue || ''}
                 placeholder="new value" />);
      }
    },

    render: function() {
      return (
        <div className="clearfix">
          {this.renderPropertyKey()}
          {this.renderPropertyValue()}
        </div>
      );
    }
  })
}
