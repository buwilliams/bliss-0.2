var BlissTree = {
  "component": React.createClass({
    getInitialState: function() {
      var state = {
        focused: false,
        drag_from: null,
        drag_to: null,
        collapsed: {},
        dragOver: {}
      };

      Object.keys(this.props.data.components).forEach(function(k) {
        state.collapsed[k] = true;
        state.dragOver[k] = false;
        state.dragOver[k+"_between"] = false;
      });

      return state;
    },

    componentWillReceiveProps: function(nextProps) {
      if(this.props.data === nextProps.data) return;

      var state = {
        drag_from: null,
        drag_to: null,
        collapsed: {},
        dragOver: {}
      };

      Object.keys(this.props.data.components).forEach(function(k) {
        state.collapsed[k] = true;
        state.dragOver[k] = false;
        state.dragOver[k+"_between"] = false;
      });

      this.setState(state);
    },

    componentDidMount: function() {
      document.addEventListener("keydown", this.handleKey);
    },

    componentWillUnmount: function() {
      document.removeEventListener("keydown", this.handleKey);
    },

    handleCollapseClick: function(e) {
      e.preventDefault();
      var newCollapsed = {};
      Object.keys(this.props.data.components).forEach(function(k) {
        newCollapsed[k] = true;
      });
      this.setState({collapsed: newCollapsed}, function() {
        this.setSelected(this.props.data.rootId);
      });
    },

    handleExpandClick: function(e) {
      e.preventDefault();
      this.setState({collapsed: {}});
    },

    handleSelect: function(id, shouldUpdateCollapse, e) {
      var copyState = Object.assign({}, this.state);

      if(shouldUpdateCollapse) {
        if(this.isExpanded(id) && this.isSelected(id)) {
          copyState.collapsed[id] = true;
        } else if(!this.isExpanded(id)) {
          delete copyState.collapsed[id];
        }
      }

      this.props.onSelect(id);

      this.setState(copyState);
    },

    setSelected: function(id) {
      this.props.onSelect(id);
    },

    getLast: function(component) {
      while(component.next !== null) {
        component = this.get(component.next);
      }
      return component;
    },

    hasPrev: function(id) {
      var component = this.get(id);
      return (component.previous !== null);
    },

    hasNext: function(id) {
      var component = this.get(id);
      return (component.next !== null);
    },

    hasChild: function(id) {
      var component = this.get(id);
      return (component.child !== null);
    },

    isCollapsed: function(id) {
      return (this.state.collapsed[id] === true);
    },

    getChild: function(id) {
      return this.get(this.get(id).child);
    },

    moveSelectionUp: function() {
      var component = this.get(this.props.selected);
      if(this.hasPrev(component.id) &&
          (this.isCollapsed(component.previous) || !this.hasChild(component.previous))) {
        this.setSelected(component.previous);
      } else if (this.hasPrev(component.id)) {
        var refComponent = this.getChild(component.previous);
        refComponent = this.getLast(refComponent);
        while(this.hasChild(refComponent.id) && !this.isCollapsed(refComponent.id)) {
          var child = this.getChild(refComponent.id);
          refComponent = this.getLast(child);
        }
        this.setSelected(refComponent.id);
      } else if(component.parent !== null) {
        this.setSelected(component.parent);
      }
    },

    moveSelectionDown: function() {
      var component = this.get(this.props.selected);
      if(component.child !== null && this.state.collapsed[this.props.selected] !== true) {
        this.setSelected(component.child);
      } else if(component.next !== null) {
        this.setSelected(component.next);
      } else if(component.parent !== null) {
        var refComponent = this.get(component.parent);
        while(refComponent.next === null) {
          refComponent = this.get(refComponent.parent);
          if(refComponent === null) return;
        }
        this.setSelected(refComponent.next);
      }
    },

    isExpanded: function(id) {
      return (this.state.collapsed[id] !== true);
    },

    isSelected: function(id) {
      return (this.props.selected === id);
    },

    collaspeSelection: function() {
      var copyState = Object.assign({}, this.state);
      var component = this.get(this.props.selected);
      var newSelected = this.props.selected;
      if(component.child === null && component.parent !== null) {
        copyState.collapsed[component.parent] = true;
        newSelected = component.parent;
      } else if(this.state.collapsed[this.props.selected] === true && component.parent !== null) {
        copyState.collapsed[component.parent] = true;
        newSelected = component.parent;
      } else {
        copyState.collapsed[this.props.selected] = true;
      }
      this.setState(copyState, function() {
        this.setSelected(newSelected);
      });
    },

    expandSelection: function() {
      var copyState = Object.assign({}, this.state);
      if(copyState.collapsed[this.props.selected] === true) {
        delete copyState.collapsed[this.props.selected];
      }
      this.setState(copyState);
    },

    handleKey: function(e) {
      if(this.state.focused === false) return;
      var LEFT=37, UP=38, RIGHT=39, DOWN=40;
      if(e.keyCode === LEFT) {
        this.collaspeSelection();
      } else if(e.keyCode === RIGHT) {
        this.expandSelection();
      } else if(e.keyCode === UP) {
        this.moveSelectionUp();
      } else if(e.keyCode === DOWN) {
        this.moveSelectionDown();
      }
    },

    handleFocus: function() {
      this.setState({focused: true});
    },

    handleBlur: function() {
      this.setState({focused: false});
    },

    get: function(id) {
      if(id === null) return null;
      return this.props.data.components[id];
    },

    getNodeIcon: function(id) {
      var component = this.get(id);
      if(component === null) return "";

      if(component.child !== null && this.state.collapsed[id] === true) {
        return (<i className="fa fa-chevron-right" aria-hidden="true"></i>);
      } else if(component.child !== null) {
        return (<i className="fa fa-chevron-down" aria-hidden="true"></i>);
      } else {
        return (<i className="fa" aria-hidden="true"></i>);;
      }
    },

    handleNodeDragStart: function(e, id) {
      this.setState({drag_from: id});
    },

    handleNodeDrop: function(e, to_component_id, inBetween) {
      if(typeof inBetween === "undefined") inBetween = false;

      var shouldBeChild = !inBetween;

      if(typeof this.props.onMove !== "undefined") {
        this.props.onMove.call(this.props._this,
          this.state.drag_from, to_component_id, shouldBeChild);
      }

      var copyState = Object.assign({}, this.state);
      Object.keys(copyState.dragOver).forEach(function(key) {
        copyState.dragOver[key] = false;
      });
      this.setState(copyState);
    },

    handleNodeDragOver: function(e) {
      e.preventDefault();
    },

    handleNodeDragEnter: function(e, id) {
      var copyState = Object.assign({}, this.state);
      copyState.dragOver[id] = true;
      this.setState(copyState);
    },

    handleNodeDragLeave: function(e, id) {
      var copyState = Object.assign({}, this.state);
      copyState.dragOver[id] = false;
      this.setState(copyState);
    },

    handleCreateClick: function(e) {
      e.preventDefault();
      var that = this;

      if(typeof this.props.onCreate !== "undefined") {
        this.props.onCreate.call(this.props._this, this.props.selected);

        var copyState = Object.assign({}, this.state);
        var component = this.get(this.props.selected);
        if(component.child !== null) {
          copyState.collapsed[component.id] = false;
        }
        this.setState(copyState, function() {
          if(component.child !== null) {
            that.handleSelect(component.child, true);
          }
        });
      }
    },

    handleCloneClick: function(e) {
      e.preventDefault();
      var that = this;

      if(typeof this.props.onClone !== "undefined") {
        this.props.onClone.call(this.props._this, this.props.selected);
      }
    },

    handleDeleteClick: function(e) {
      e.preventDefault();
      if(typeof this.props.onDelete !== "undefined") {
        var selectedId = this.props.selected;
        var newSelectedId = this.get(this.props.selected).previous;
        if(newSelectedId === null) newSelectedId = this.get(this.props.selected).parent;
        if(newSelectedId === null) newSelectedId = this.props.data.rootId;
        this.handleSelect(newSelectedId, false);
        this.props.onDelete.call(this.props._this, selectedId);
      }
    },

    renderNode: function(id) {
      var that = this;
      var component = this.get(id);
      if(component === null) return null;

      var getClass = function(id, classStr) {
        if(that.state.dragOver[id] === true) {
          return classStr + " node-drag-over";
        } else {
          return classStr;
        }
      };

      var out = [];
      if(this.props.selected === id) {
        out.push(
          <div key={`node_${id}`}
               className={getClass(id, "node draggable")}
               draggable="true"
               onDrop={this.handleNodeDrop.bind(this, event, id, false)}
               onDragStart={this.handleNodeDragStart.bind(this, event, id)}
               onDragEnter={this.handleNodeDragEnter.bind(this, event, id)}
               onDragOver={this.handleNodeDragOver}
               onDragLeave={this.handleNodeDragLeave.bind(this, event, id)}
               onClick={this.handleSelect.bind(this, id, true)}>
            {this.getNodeIcon(id)}{component.name}
            <div className="selected-text" draggable="true" onDragStart={this.handleNodeDragStart.bind(this, event, id)}>
              {this.getNodeIcon(id)}{component.name} <span className="elementType">{component.element}</span>
            </div>
            <div className="selected"></div>
          </div>
        );
      } else {
        out.push(
          <div key={`node_${id}`}
               className={getClass(id, "node draggable")}
               draggable="true"
               onDrop={this.handleNodeDrop.bind(this, event, id, false)}
               onDragStart={this.handleNodeDragStart.bind(this, event, id)}
               onDragEnter={this.handleNodeDragEnter.bind(this, event, id)}
               onDragOver={this.handleNodeDragOver}
               onDragLeave={this.handleNodeDragLeave.bind(this, event, id)}
               onClick={this.handleSelect.bind(this, id, true)}>
            {this.getNodeIcon(id)}{component.name} <span className="elementType">{component.element}</span>
          </div>
        );
      }

      var betweenId = id+"_between";
      out.push(
        <div className="node-child-container"
             key={`node_between_${id}`}>
          <div className={getClass(betweenId, "node node-child")}
               onDrop={this.handleNodeDrop.bind(this, event, id, true)}
               onDragEnter={this.handleNodeDragEnter.bind(this, event, betweenId)}
               onDragOver={this.handleNodeDragOver}
               onDragLeave={this.handleNodeDragLeave.bind(this, event, betweenId)}></div>
        </div>
      );

      if(component.child !== null && this.state.collapsed[id] !== true) {
        out.push(<div key={`tree_${id}`}
                      className="tree">
                  {this.renderNode(component.child)}</div>)
      }

      if(component.next !== null) {
        out.push(this.renderNode(component.next));
      }

      return out;
    },

    renderRootNode: function() {
      var that = this;
      var id = this.props.data.rootId;
      var component = this.get(id);

      var getClassName = function() {
        if(that.state.focused === true) {
          return "menu noselect focus";
        } else {
          return "menu noselect";
        }
      }

      return (
        <div className={getClassName()}
             tabIndex="0"
             onFocus={this.handleFocus}
             onBlur={this.handleBlur}>
          <div className="menu-container">
            <div className="menu-options clearfix">
              <a title="Add" className="float-left" href="#" onClick={this.handleCreateClick}><i className="fa fa-plus" aria-hidden="true"></i></a>
              <a title="Clone" className="float-left" href="#" onClick={this.handleCloneClick}><i className="fa fa-clone" aria-hidden="true"></i></a>
              <a title="Delete" className="float-left" href="#" onClick={this.handleDeleteClick}><i className="fa fa-trash" aria-hidden="true"></i></a>
              <a title="Expand" className="float-right" href="#" onClick={this.handleExpandClick}><i className="fa fa-expand" aria-hidden="true"></i></a>
              <a title="Collapse" className="float-right" href="#" onClick={this.handleCollapseClick}><i className="fa fa-compress" aria-hidden="true"></i></a>
            </div>
          </div>
          <div className="node-tree">
            {this.renderNode(id)}
          </div>
        </div>
      );
    },

    render: function(){
      return this.renderRootNode();
    }
  })
};
