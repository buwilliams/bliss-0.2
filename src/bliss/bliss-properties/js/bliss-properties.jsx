var BlissProperties = {
  "component": React.createClass({
    _keyIndex: 0,
    _internalKeys: {},

    getCamel: function(str) {
      str = str.replace(/[^a-z]/gi, ' ').trim();
      var out = str.split(" ").map(function(word, index) {
        if(index === 0) {
          return word.toLowerCase();
        } else {
          return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
        }
      }).join("");
      return out;
    },

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
        var ref = that.props.component[refName];

        if(originalKey === ref.length) {
          ref.push({
            "name": newKey,
            "value": value
          });
        } else if(newKey === "") {
          ref.splice(originalKey, 1);
        } else {
          ref[originalKey].name = newKey;
          ref[originalKey].value = value;
        }

        that.handleChange(that.props.component);
      };

      var render = function() {
        var out = [];
        var attrs = that.props.component[refName];
        if(typeof attrs === "undefined") return null;

        attrs.forEach(function(property, index) {
          var reactKey = that.getReactKey(refName, index);
          out.push(
            <BlissProperty.component
              key={reactKey}
              type="key-value"
              changeFn={handleChange}
              originalKey={index}
              propertyKey={property.name}
              propertyValue={property.value} />
          );
        });

        var reactKey = that.getReactKey(refName, attrs.length);
        out.push(
          <BlissProperty.component
            key={reactKey}
            type="key-value"
            changeFn={handleChange}
            originalKey={attrs.length}
            propertyKey=""
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

    renderCss: function(title) {
      var that = this;

      var css = that.props.component.css;
      var selector = '#' + this.getCamel(that.props.component.name) + that.props.component.id;
      if(css.length === 0) {
        css.push({
          "selector": selector,
          "properties": []
        });
      } else {
        css[0].selector = selector;
      }

      var ref = that.props.component.css[0].properties; // grab the first selector

      var handleChange = function(originalKey, newKey, value) {
        if(originalKey === ref.length) {
          ref.push({
            "name": newKey,
            "value": value
          });
        } else if(newKey === "") {
          ref.splice(originalKey, 1);
        } else {
          ref[originalKey].name = newKey;
          ref[originalKey].value = value;
        }

        that.handleChange(that.props.component);
      };

      var render = function() {
        var out = [];

        ref.forEach(function(property, index) {
          var reactKey = that.getReactKey('css', index);
          out.push(
            <BlissProperty.component
              key={reactKey}
              type="key-value"
              changeFn={handleChange}
              originalKey={index}
              propertyKey={property.name}
              propertyValue={property.value} />
          );
        });

        var reactKey = that.getReactKey('css', ref.length);
        out.push(
          <BlissProperty.component
            key={reactKey}
            type="key-value"
            changeFn={handleChange}
            originalKey={ref.length}
            propertyKey=""
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

    render: function() {
      return (
        <div>
          {this.renderGeneral()}
          {this.renderObject("attributes", "Attributes")}
          {this.renderCss("CSS")}
          {this.renderObject("dynamicAttributes", "Dynamic Attributes")}
        </div>
      );
    }
  })
}
