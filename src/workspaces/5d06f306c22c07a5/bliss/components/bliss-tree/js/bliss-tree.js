"use strict";

var BlissTree = {
  "component": React.createClass({
    getInitialState: function getInitialState() {
      var state = {
        focused: false,
        drag_from: null,
        drag_to: null,
        collapsed: {},
        dragOver: {}
      };

      Object.keys(this.props.data.components).forEach(function (k) {
        state.collapsed[k] = true;
        state.dragOver[k] = false;
        state.dragOver[k + "_between"] = false;
      });

      return state;
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if (this.props.data === nextProps.data) return;

      var state = {
        drag_from: null,
        drag_to: null,
        collapsed: {},
        dragOver: {}
      };

      Object.keys(this.props.data.components).forEach(function (k) {
        state.collapsed[k] = true;
        state.dragOver[k] = false;
        state.dragOver[k + "_between"] = false;
      });

      this.setState(state);
    },

    componentDidMount: function componentDidMount() {
      document.addEventListener("keydown", this.handleKey);
    },

    componentWillUnmount: function componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKey);
    },

    handleCollapseClick: function handleCollapseClick(e) {
      e.preventDefault();
      var newCollapsed = {};
      Object.keys(this.props.data.components).forEach(function (k) {
        newCollapsed[k] = true;
      });
      this.setState({ collapsed: newCollapsed }, function () {
        this.setSelected(this.props.data.rootId);
      });
    },

    handleExpandClick: function handleExpandClick(e) {
      e.preventDefault();
      this.setState({ collapsed: {} });
    },

    handleSelect: function handleSelect(id, shouldUpdateCollapse, e) {
      var copyState = Object.assign({}, this.state);

      if (shouldUpdateCollapse) {
        if (this.isExpanded(id) && this.isSelected(id)) {
          copyState.collapsed[id] = true;
        } else if (!this.isExpanded(id)) {
          delete copyState.collapsed[id];
        }
      }

      this.props.onSelect(id);

      this.setState(copyState);
    },

    setSelected: function setSelected(id) {
      this.props.onSelect(id);
    },

    getLast: function getLast(component) {
      while (component.next !== null) {
        component = this.get(component.next);
      }
      return component;
    },

    hasPrev: function hasPrev(id) {
      var component = this.get(id);
      return component.previous !== null;
    },

    hasNext: function hasNext(id) {
      var component = this.get(id);
      return component.next !== null;
    },

    hasChild: function hasChild(id) {
      var component = this.get(id);
      return component.child !== null;
    },

    isCollapsed: function isCollapsed(id) {
      return this.state.collapsed[id] === true;
    },

    getChild: function getChild(id) {
      return this.get(this.get(id).child);
    },

    moveSelectionUp: function moveSelectionUp() {
      var component = this.get(this.props.selected);
      if (this.hasPrev(component.id) && (this.isCollapsed(component.previous) || !this.hasChild(component.previous))) {
        this.setSelected(component.previous);
      } else if (this.hasPrev(component.id)) {
        var refComponent = this.getChild(component.previous);
        refComponent = this.getLast(refComponent);
        while (this.hasChild(refComponent.id) && !this.isCollapsed(refComponent.id)) {
          var child = this.getChild(refComponent.id);
          refComponent = this.getLast(child);
        }
        this.setSelected(refComponent.id);
      } else if (component.parent !== null) {
        this.setSelected(component.parent);
      }
    },

    moveSelectionDown: function moveSelectionDown() {
      var component = this.get(this.props.selected);
      if (component.child !== null && this.state.collapsed[this.props.selected] !== true) {
        this.setSelected(component.child);
      } else if (component.next !== null) {
        this.setSelected(component.next);
      } else if (component.parent !== null) {
        var refComponent = this.get(component.parent);
        while (refComponent.next === null) {
          refComponent = this.get(refComponent.parent);
          if (refComponent === null) return;
        }
        this.setSelected(refComponent.next);
      }
    },

    isExpanded: function isExpanded(id) {
      return this.state.collapsed[id] !== true;
    },

    isSelected: function isSelected(id) {
      return this.props.selected === id;
    },

    collaspeSelection: function collaspeSelection() {
      var copyState = Object.assign({}, this.state);
      var component = this.get(this.props.selected);
      var newSelected = this.props.selected;
      if (component.child === null && component.parent !== null) {
        copyState.collapsed[component.parent] = true;
        newSelected = component.parent;
      } else if (this.state.collapsed[this.props.selected] === true && component.parent !== null) {
        copyState.collapsed[component.parent] = true;
        newSelected = component.parent;
      } else {
        copyState.collapsed[this.props.selected] = true;
      }
      this.setState(copyState, function () {
        this.setSelected(newSelected);
      });
    },

    expandSelection: function expandSelection() {
      var copyState = Object.assign({}, this.state);
      if (copyState.collapsed[this.props.selected] === true) {
        delete copyState.collapsed[this.props.selected];
      }
      this.setState(copyState);
    },

    handleKey: function handleKey(e) {
      if (this.state.focused === false) return;
      var LEFT = 37,
          UP = 38,
          RIGHT = 39,
          DOWN = 40;
      if (e.keyCode === LEFT) {
        this.collaspeSelection();
      } else if (e.keyCode === RIGHT) {
        this.expandSelection();
      } else if (e.keyCode === UP) {
        this.moveSelectionUp();
      } else if (e.keyCode === DOWN) {
        this.moveSelectionDown();
      }
    },

    handleFocus: function handleFocus() {
      this.setState({ focused: true });
    },

    handleBlur: function handleBlur() {
      this.setState({ focused: false });
    },

    get: function get(id) {
      if (id === null) return null;
      return this.props.data.components[id];
    },

    getNodeIcon: function getNodeIcon(id) {
      var component = this.get(id);
      if (component === null) return "";

      if (component.child !== null && this.state.collapsed[id] === true) {
        return React.createElement("i", { className: "fa fa-chevron-right", "aria-hidden": "true" });
      } else if (component.child !== null) {
        return React.createElement("i", { className: "fa fa-chevron-down", "aria-hidden": "true" });
      } else {
        return React.createElement("i", { className: "fa", "aria-hidden": "true" });;
      }
    },

    handleNodeDragStart: function handleNodeDragStart(e, id) {
      this.setState({ drag_from: id });
    },

    handleNodeDrop: function handleNodeDrop(e, to_component_id, inBetween) {
      if (typeof inBetween === "undefined") inBetween = false;

      var shouldBeChild = !inBetween;

      if (typeof this.props.onMove !== "undefined") {
        this.props.onMove.call(this.props._this, this.state.drag_from, to_component_id, shouldBeChild);
      }

      var copyState = Object.assign({}, this.state);
      Object.keys(copyState.dragOver).forEach(function (key) {
        copyState.dragOver[key] = false;
      });
      this.setState(copyState);
    },

    handleNodeDragOver: function handleNodeDragOver(e) {
      e.preventDefault();
    },

    handleNodeDragEnter: function handleNodeDragEnter(e, id) {
      var copyState = Object.assign({}, this.state);
      copyState.dragOver[id] = true;
      this.setState(copyState);
    },

    handleNodeDragLeave: function handleNodeDragLeave(e, id) {
      var copyState = Object.assign({}, this.state);
      copyState.dragOver[id] = false;
      this.setState(copyState);
    },

    handleCreateClick: function handleCreateClick(e) {
      e.preventDefault();
      var that = this;

      if (typeof this.props.onCreate !== "undefined") {
        this.props.onCreate.call(this.props._this, this.props.selected);

        var copyState = Object.assign({}, this.state);
        var component = this.get(this.props.selected);
        if (component.child !== null) {
          copyState.collapsed[component.id] = false;
        }
        this.setState(copyState, function () {
          if (component.child !== null) {
            that.handleSelect(component.child, true);
          }
        });
      }
    },

    handleCloneClick: function handleCloneClick(e) {
      e.preventDefault();
      var that = this;

      if (typeof this.props.onClone !== "undefined") {
        this.props.onClone.call(this.props._this, this.props.selected);
      }
    },

    handleDeleteClick: function handleDeleteClick(e) {
      e.preventDefault();
      if (typeof this.props.onDelete !== "undefined") {
        var selectedId = this.props.selected;
        var newSelectedId = this.get(this.props.selected).previous;
        if (newSelectedId === null) newSelectedId = this.get(this.props.selected).parent;
        if (newSelectedId === null) newSelectedId = this.props.data.rootId;
        this.handleSelect(newSelectedId, false);
        this.props.onDelete.call(this.props._this, selectedId);
      }
    },

    renderNode: function renderNode(id) {
      var that = this;
      var component = this.get(id);
      if (component === null) return null;

      var getClass = function getClass(id, classStr) {
        if (that.state.dragOver[id] === true) {
          return classStr + " node-drag-over";
        } else {
          return classStr;
        }
      };

      var out = [];
      if (this.props.selected === id) {
        out.push(React.createElement(
          "div",
          { key: "node_" + id,
            className: getClass(id, "node draggable"),
            draggable: "true",
            onDrop: this.handleNodeDrop.bind(this, event, id, false),
            onDragStart: this.handleNodeDragStart.bind(this, event, id),
            onDragEnter: this.handleNodeDragEnter.bind(this, event, id),
            onDragOver: this.handleNodeDragOver,
            onDragLeave: this.handleNodeDragLeave.bind(this, event, id),
            onClick: this.handleSelect.bind(this, id, true) },
          this.getNodeIcon(id),
          component.name,
          React.createElement(
            "div",
            { className: "selected-text", draggable: "true", onDragStart: this.handleNodeDragStart.bind(this, event, id) },
            this.getNodeIcon(id),
            component.name,
            " ",
            React.createElement(
              "span",
              { className: "elementType" },
              component.element
            )
          ),
          React.createElement("div", { className: "selected" })
        ));
      } else {
        out.push(React.createElement(
          "div",
          { key: "node_" + id,
            className: getClass(id, "node draggable"),
            draggable: "true",
            onDrop: this.handleNodeDrop.bind(this, event, id, false),
            onDragStart: this.handleNodeDragStart.bind(this, event, id),
            onDragEnter: this.handleNodeDragEnter.bind(this, event, id),
            onDragOver: this.handleNodeDragOver,
            onDragLeave: this.handleNodeDragLeave.bind(this, event, id),
            onClick: this.handleSelect.bind(this, id, true) },
          this.getNodeIcon(id),
          component.name,
          " ",
          React.createElement(
            "span",
            { className: "elementType" },
            component.element
          )
        ));
      }

      var betweenId = id + "_between";
      out.push(React.createElement(
        "div",
        { className: "node-child-container",
          key: "node_between_" + id },
        React.createElement("div", { className: getClass(betweenId, "node node-child"),
          onDrop: this.handleNodeDrop.bind(this, event, id, true),
          onDragEnter: this.handleNodeDragEnter.bind(this, event, betweenId),
          onDragOver: this.handleNodeDragOver,
          onDragLeave: this.handleNodeDragLeave.bind(this, event, betweenId) })
      ));

      if (component.child !== null && this.state.collapsed[id] !== true) {
        out.push(React.createElement(
          "div",
          { key: "tree_" + id,
            className: "tree" },
          this.renderNode(component.child)
        ));
      }

      if (component.next !== null) {
        out.push(this.renderNode(component.next));
      }

      return out;
    },

    renderRootNode: function renderRootNode() {
      var that = this;
      var id = this.props.data.rootId;
      var component = this.get(id);

      var getClassName = function getClassName() {
        if (that.state.focused === true) {
          return "menu noselect focus";
        } else {
          return "menu noselect";
        }
      };

      return React.createElement(
        "div",
        { className: getClassName(),
          tabIndex: "0",
          onFocus: this.handleFocus,
          onBlur: this.handleBlur },
        React.createElement(
          "div",
          { className: "menu-container" },
          React.createElement(
            "div",
            { className: "menu-options clearfix" },
            React.createElement(
              "a",
              { title: "Add", className: "float-left", href: "#", onClick: this.handleCreateClick },
              React.createElement("i", { className: "fa fa-plus", "aria-hidden": "true" })
            ),
            React.createElement(
              "a",
              { title: "Clone", className: "float-left", href: "#", onClick: this.handleCloneClick },
              React.createElement("i", { className: "fa fa-clone", "aria-hidden": "true" })
            ),
            React.createElement(
              "a",
              { title: "Delete", className: "float-left", href: "#", onClick: this.handleDeleteClick },
              React.createElement("i", { className: "fa fa-trash", "aria-hidden": "true" })
            ),
            React.createElement(
              "a",
              { title: "Expand", className: "float-right", href: "#", onClick: this.handleExpandClick },
              React.createElement("i", { className: "fa fa-expand", "aria-hidden": "true" })
            ),
            React.createElement(
              "a",
              { title: "Collapse", className: "float-right", href: "#", onClick: this.handleCollapseClick },
              React.createElement("i", { className: "fa fa-compress", "aria-hidden": "true" })
            )
          )
        ),
        React.createElement(
          "div",
          { className: "node-tree" },
          this.renderNode(id)
        )
      );
    },

    render: function render() {
      return this.renderRootNode();
    }
  })
};
