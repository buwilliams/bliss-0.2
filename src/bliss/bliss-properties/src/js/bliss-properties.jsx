var BlissProperties = {
  "component": React.createClass({
    _keyIndex: 0,
    _internalKeys: {},

    getReactKey: function(prefix, key) {
      var tmpKey = prefix + '_' + key;
      if(typeof this._internalKeys[tmpKey] === "undefined") {
        this._internalKeys[tmpKey] = this._keyIndex++;
        return this._internalKeys[tmpKey];
      } else {
        return this._internalKeys[tmpKey];
      }
    },

    setReactKey: function(prefix, oldKey, newKey) {
      var tmpKey = prefix + '_' + oldKey;
      var tmpValue = this._internalKeys[tmpKey];
      var newTmpKey = prefix + '_' + newKey;
      delete this._internalKeys[tmpKey];
      this._internalKeys[newTmpKey] = tmpValue;
    },

    handleChange: function(newComponent) {
      var that = this;
      that.props.onChange(newComponent);
    },

    handleGeneralChange: function(key, value) {
      var newComponent = Object.assign({}, this.props.component);
      newComponent[key] = value;
      this.handleChange(newComponent);
    },

    renderObject: function(refName, title) {
      var that = this;

      var handleChange = function(originalKey, newKey, value) {
        var newComponent = Object.assign({}, that.props.component);

        that.setReactKey(refName, originalKey, newKey);

        delete newComponent[refName][originalKey];
        newComponent[refName][newKey] = value;

        // delete blank ones
        delete newComponent[refName][""];

        that.handleChange(newComponent);
      };

      var render = function() {
        var out = [];
        var attrs = that.props.component[refName];
        if(typeof attrs === "undefined") return null;

        Object.keys(attrs).forEach(function(key, index) {
          var reactKey = that.getReactKey(refName, key);
          out.push(
            <BlissProperty.component
              key={reactKey} type="key-value"
              changeFn={handleChange}
              originalKey={key}
              propertyKey={key}
              propertyValue={attrs[key]} />
          );
        });

        var reactKey = that.getReactKey(refName, "zzz~");
        out.push(
          <BlissProperty.component
            key={reactKey} type="key-value"
            changeFn={handleChange}
            originalKey={"zzz~"}
            propertyKey={"zzz~"}
            propertyValue="" />
        );

        return (
          <div>
            <div className="title">{title}</div>
            {out}
          </div>
        );
      };

      return render();
    },

    renderGeneral: function() {
      return (
        <div>
          <div className="title">General</div>
          <BlissProperty.component
            key="name" type=""
            changeFn={this.handleGeneralChange}
            originalKey="name"
            propertyKey="name"
            propertyValue={this.props.component.name} />
          <BlissProperty.component
            key="element" type=""
            changeFn={this.handleGeneralChange}
            originalKey="element"
            propertyKey="element"
            propertyValue={this.props.component.element} />
          <BlissProperty.component
            key="text" type=""
            changeFn={this.handleGeneralChange}
            originalKey="text"
            propertyKey="text"
            propertyValue={this.props.component.text} />
          <BlissProperty.component
            key="textFn" type=""
            label="text(fn)"
            changeFn={this.handleGeneralChange}
            originalKey="textFn"
            propertyKey="textFn"
            propertyValue={this.props.component.textFn} />
          <BlissProperty.component
            key="ifFn" type=""
            label="if(fn)"
            changeFn={this.handleGeneralChange}
            originalKey="ifFn"
            propertyKey="ifFn"
            propertyValue={this.props.component.ifFn} />
          <BlissProperty.component
            key="repeatFn" type=""
            label="repeat(fn)"
            changeFn={this.handleGeneralChange}
            originalKey="repeatFn"
            propertyKey="repeatFn"
            propertyValue={this.props.component.repeatFn} />
        </div>
      );
    },

    render: function() {
      return (
        <div>
          {this.renderGeneral()}
          {this.renderObject("attributes", "Attributes")}
          {this.renderObject("css", "CSS")}
          {this.renderObject("dynamicAttributes", "Dynamic Attributes")}
        </div>
      );
    }
  })
}
