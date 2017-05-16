// Assumptions:
// 1. component passed in is attached to an object
// 2. there is a type string passed in (primitive, object)
// 3. always add an empty node at the end
// 4. deleting the contents of either the key or the value (if only has a value) deletes the item

// Properties:
//  objectContainer
//  objectKey
//  objectType [primitive, object] --> defaults to primitive
//  itemKey (required if objectType = object)
//  itemValue (required if objectType = object)
//  onChange

var BlissPropertiesGeneric = {
  "component": React.createClass({
    handleChange: function() {
      this.props.onChange(this.props.objectContainer, this.props.objectKey);
    },

    renderPrimitiveArray: function() {
      var that = this;
      var ref = this.props.objectContainer[this.props.objectKey];

      // on change method
      var _handleChange = function(e) {
        var index = e.target.dataset.id;
        var newValue = e.target.value;

        if(index === ref.length) {
          // handle add
          ref.push(newValue);
        } else if(newValue === "") {
          // handle delete
          ref.splice(index, 1);
        } else {
          // handle update
          ref[index] = e.target.value;
        }

        that.handleChange();
      };

      // loop through the array
      var out = [];
      ref.forEach(function(item, index) {
        // write inputs
        out.push(<input key={"key_" + index} data-index={index} type="text" onChange={_handleChange} value={item} />);
      });

      // write new output
      out.push(<input key={"key_" + ref.length} data-index={ref.length} type="text" onChange={_handleChange} value="" />);

      return out;
    },

    renderObjectArray: function() {
      // on change method
      // loop through the array of objects
      // write inputs
      return null;
    },

    render: function() {
      if(this.props.objectType === "object") {
        return this.renderObjectArray();
      } else {
        // default type
        return this.renderPrimitiveArray();
      }
    }
  })
}
