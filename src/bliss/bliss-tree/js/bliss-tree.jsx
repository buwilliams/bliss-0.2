var BlissTree = {
  "component": React.createClass({
    getInitialState: function() {
      var state = {
        focused: false,
        selected: null,
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

      state.selected = this.props.data.rootId;

      return state;
    },

    componentDidMount: function() {
      document.addEventListener("keydown", this.handleKey);
      if(typeof this.props.onSelect !== "undefined") {
        this.props.onSelect(this.state.selected);
      }
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

    handleSelect: function(id) {
      var copyState = Object.assign({}, this.state);
      copyState.selected = id;

      if(copyState.collapsed[id] === true) {
        delete copyState.collapsed[id];
      } else {
        copyState.collapsed[id] = true;
      }

      if(typeof this.props.onSelect !== "undefined") {
        this.props.onSelect(id);
      }

      this.setState(copyState);
    },

    setSelected: function(id) {
      this.setState({selected: id}, function() {
        if(typeof this.props.onSelect !== "undefined") {
          this.props.onSelect(id);
        }
      });
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
      var component = this.get(this.state.selected);
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
      var component = this.get(this.state.selected);
      if(component.child !== null && this.state.collapsed[this.state.selected] !== true) {
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

    collaspeSelection: function() {
      var copyState = Object.assign({}, this.state);
      var component = this.get(this.state.selected);
      if(component.child === null && component.parent !== null) {
        copyState.collapsed[component.parent] = true;
        copyState.selected = component.parent;
      } else if(this.state.collapsed[this.state.selected] === true && component.parent !== null) {
        copyState.collapsed[component.parent] = true;
        copyState.selected = component.parent;
      } else {
        copyState.collapsed[this.state.selected] = true;
      }
      this.setState(copyState, function() {
        this.setSelected(copyState.selected);
      });
    },

    expandSelection: function() {
      var copyState = Object.assign({}, this.state);
      if(copyState.collapsed[this.state.selected] === true) {
        delete copyState.collapsed[this.state.selected];
      }
      this.setState(copyState, function() {
        this.setSelected(copyState.selected);
      });
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

      console.log('from:', this.state.drag_from,
        'to:', to_component_id,
        'inBetween', inBetween);

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
        this.props.onCreate.call(this.props._this, this.state.selected);

        var copyState = Object.assign({}, this.state);
        var component = this.get(this.state.selected);
        if(component.child !== null) {
          copyState.collapsed[component.id] = false;
        }
        this.setState(copyState, function() {
          if(component.child !== null) {
            that.handleSelect(component.child);
          }
        });
      }
    },

    handleCloneClick: function(e) {
      e.preventDefault();
      var that = this;

      if(typeof this.props.onClone !== "undefined") {
        this.props.onClone.call(this.props._this, this.state.selected);
      }
    },

    handleDeleteClick: function(e) {
      e.preventDefault();
      if(typeof this.props.onDelete !== "undefined") {
        var selectedId = this.state.selected;
        var parentId = this.get(this.state.selected).parent;
        if(parentId === null) parentId = this.props.data.rootId;
        this.handleSelect(parentId);
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
      if(this.state.selected === id) {
        out.push(
          <div key={`node_${id}`}
               className={getClass(id, "node draggable")}
               draggable="true"
               onDrop={this.handleNodeDrop.bind(this, event, id, false)}
               onDragStart={this.handleNodeDragStart.bind(this, event, id)}
               onDragEnter={this.handleNodeDragEnter.bind(this, event, id)}
               onDragOver={this.handleNodeDragOver}
               onDragLeave={this.handleNodeDragLeave.bind(this, event, id)}
               onClick={this.handleSelect.bind(this, id)}>
            {this.getNodeIcon(id)}{component.name}
            <div className="selected-text" draggable="true" onDragStart={this.handleNodeDragStart.bind(this, event, id)}>
              {this.getNodeIcon(id)}{component.name}
            </div>
            <div className="selected"></div>
          </div>
        );
      } else {
        out.push(<div key={`node_${id}`}
                      className={getClass(id, "node draggable")}
                      draggable="true"
                      onDrop={this.handleNodeDrop.bind(this, event, id, false)}
                      onDragStart={this.handleNodeDragStart.bind(this, event, id)}
                      onDragEnter={this.handleNodeDragEnter.bind(this, event, id)}
                      onDragOver={this.handleNodeDragOver}
                      onDragLeave={this.handleNodeDragLeave.bind(this, event, id)}
                      onClick={this.handleSelect.bind(this, id)}>
                  {this.getNodeIcon(id)}{component.name}</div>);
      }

      var betweenId = id+"_between";
      out.push(<div key={`node_between_${id}`}
                    className={getClass(betweenId, "node node-child")}
                    onDrop={this.handleNodeDrop.bind(this, event, id, true)}
                    onDragEnter={this.handleNodeDragEnter.bind(this, event, betweenId)}
                    onDragOver={this.handleNodeDragOver}
                    onDragLeave={this.handleNodeDragLeave.bind(this, event, betweenId)}>
                    <i className="fa" aria-hidden="true"></i>
              </div>);

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
          <div className="menu-options clearfix">
            <a title="Add" className="float-left" href="#" onClick={this.handleCreateClick}><i className="fa fa-plus" aria-hidden="true"></i></a>
            <a title="Clone" className="float-left" href="#" onClick={this.handleCloneClick}><i className="fa fa-clone" aria-hidden="true"></i></a>
            <a title="Delete" className="float-left" href="#" onClick={this.handleDeleteClick}><i className="fa fa-trash" aria-hidden="true"></i></a>
            <a title="Full Screen" className="float-right" href="/designer/designer.html" target="_blank"><i className="fa fa-external-link-square" aria-hidden="true"></i></a>
            <a title="Expand" className="float-right" href="#" onClick={this.handleExpandClick}><i className="fa fa-expand" aria-hidden="true"></i></a>
            <a title="Collapse" className="float-right" href="#" onClick={this.handleCollapseClick}><i className="fa fa-compress" aria-hidden="true"></i></a>
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
  }),

  get: function(proj, id) {
    return proj.components[id];
  },

  parent: function(proj, id) {
    var component = this.get(proj, id);
    var parentId = component.parent;
    var parent = parentId === null ? null : this.get(proj, parentId);
    return parent;
  },

  child: function(proj, id) {
    var component = this.get(proj, id);
    var childId = component.child;
    var child = (childId === null) ? null : this.get(proj, childId);
    return child;
  },

  next: function(proj, id) {
    var component = this.get(proj, id);
    var nextId = component.next;
    var next = (nextId === null) ? null : this.get(proj, nextId);
    return next;
  },

  previous: function(proj, id) {
    var component = this.get(proj, id);
    var previousId = component.previous;
    var previous = (previousId === null) ? null : this.get(proj, previousId);
    return previous;
  },

  hasChild: function(proj, parentId, childId) {
    var that = this;
    var component = this.get(proj, childId);
    var out = false;

    var walk = function(component) {
      if(component.parent === parentId) out = true;
      var parent = that.parent(proj, component.id);
      if(parent !== null) walk(parent);
    };

    walk(component);

    return out;
  },

  getTemplate: function(proj) {
    var newId = String(proj.nextId++);
    return {
      "id": newId,
      "name": "new_"+newId,
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": null
    };
  },

  createComponent: function(proj, toId) {
    var tmpl = this.getTemplate(proj);
    proj.components[tmpl.id] = tmpl;
    return this.moveComponent(proj, tmpl.id, toId, true);
  },

  cloneComponent: function(proj, cloneId) {
    var component = this.get(proj, cloneId);
    var tmpl = this.getTemplate(proj);

    tmpl.name = component.name + "_copy";
    tmpl.element = component.element;
    tmpl.text = component.text;
    tmpl.attributes = component.attributes.slice(0);
    tmpl.css = component.css.slice(0);
    tmpl.js = component.js.slice(0);
    tmpl.dynamicAttributes = component.dynamicAttributes.slice(0);

    proj.components[tmpl.id] = tmpl;

    return this.moveComponent(proj, tmpl.id, cloneId, false);
  },

  deleteComponent: function(proj, id) {
    var that = this;
    if(proj.rootId === id) return proj;

    this.removeFromTree(proj, id);

    var deleteNode = function(id) {
      var component = that.get(proj, id);
      if(component.child !== null) deleteNode(component.child);
      if(component.next !== null) deleteNode(component.next);
      delete proj.components[id];
    };
    deleteNode(id);

    return proj;
  },

  addNext: function(proj, toId, id) {
    var toComponent = this.get(proj, toId);
    var toNextComponent = this.next(proj, toId);
    var component = this.get(proj, id);

    if(toNextComponent !== null) {
      toNextComponent.previous = id;
      component.next = toNextComponent.id;
    }

    component.parent = toComponent.parent;
    component.previous = toId;
    toComponent.next = id;
  },

  addChild: function(proj, toId, id) {
    var toComponent = this.get(proj, toId);
    var toChildComponent = this.child(proj, toId);
    var component = this.get(proj, id);

    if(toChildComponent !== null) {
      component.next = toComponent.child;
      toChildComponent.previous = id;
    }

    toComponent.child = id;
    component.parent = toId;
  },

  removeFromTree: function(proj, id) {
    var component = this.get(proj, id);
    var parent = this.parent(proj, id);
    var next = this.next(proj, id);
    var previous = this.previous(proj, id);

    if(parent === null) return proj; // new component

    if(previous === null) {
      // update the parent
      parent.child = component.next;
    } else {
      // update the previous
      previous.next = component.next;
    }

    if(next !== null) {
      // update the next
      next.previous = component.previous;
    }

    component.parent = null;
    component.next = null;
    component.previous = null;

    return proj;
  },

  moveComponent: function(proj, fromId, toId, shouldBeChild) {
    var hasChild = this.hasChild(proj, fromId, toId);
    if(fromId === toId || hasChild) return proj;

    this.removeFromTree(proj, fromId);

    if(toId === proj.rootId || shouldBeChild === true) {
      this.addChild(proj, toId, fromId);
    } else {
      this.addNext(proj, toId, fromId);
    }

    return proj;
  }
};
