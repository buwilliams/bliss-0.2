var BlissPropertiesCss = {
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

    handleChange: function(newComponent) {
      this.props.onChange(newComponent);
    },

    renderSelector: function(selector, index) {
      var that = this;
      var ref = selector.properties;

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

      var handleSelectorChange = function(e) {
        var newSelector = e.target.value;
        selector.selector = newSelector;
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
          <div key={that.getReactKey('css_selector', index)}>
            <div className="clearfix">
              <input className="small green"
                key={that.getReactKey('css_selector_index', index)}
                onChange={handleSelectorChange}
                value={selector.selector || ''}
                placeholder="new css selector" />
            </div>
            {out}
          </div>
        );
      };

      return render();
    },

    render: function() {
      var that = this;
      var out = [];
      var css = this.props.component.css;

      if(css.length === 0) {
        css.push({
          "selector": '$id',
          "properties": []
        });
      }

      css.forEach(function(selector, index) {
        out.push(that.renderSelector(selector, index));
      });

      // render new selector
      var handleSelectorChange = function(e) {
        var newSelector = e.target.value;

        css.push({
          "selector": newSelector,
          "properties": []
        });

        that.handleChange(that.props.component);
      };

      out.push(
        <div className="clearfix" key={this.getReactKey('css_selector', css.length)}>
          <input className="small green"
            key={this.getReactKey('css_selector_index', css.length)}
            onChange={handleSelectorChange}
            value=""
            placeholder="new css selector" />
        </div>
      );

      // render existing selector
      return (
        <div>
          <div className="title">CSS</div>
          {out}
        </div>
      );
    }
  })
}
