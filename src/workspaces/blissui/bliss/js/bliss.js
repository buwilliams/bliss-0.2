var blissUi = (function() {
  var createApp = function(component) {
    var app = {
      js: {},
      methods: {},
      props: {},
      state: {}
    };
    app.js.init = function() {
      app._state = state();
      app.js.cleanState(newBlissProject, false);
    }
    app.js.build = function() {
      app.js.log('app.js.build() invoked.');
      if (app.buildProject.type === "bliss") {
        app.buildProject.build = "designer";
      }

      var data = JSON.stringify(app.buildProject);

      $.ajax({
        type: 'POST',
        url: '/compiler/build',
        data: data,
        success: function(data) {
          app.js.refreshIframe();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('POST /build', jqXHR, textStatus, errorThrown);
        },
        contentType: "application/json",
        dataType: 'json'
      });
    }
    app.js.selectComponent = function(id) {
      app.js.log('app.js.selectComponent() invoked.');
      app.setState(function() {
        var internal = app._state.get('internal');
        internal.setData('activeComponent', id);
      });
    }
    app.js.update = function(fn) {
      app.js.log('app.js.update() invoked.');
      app.setState(function() {
        app.state.shouldSave = true;
        clearTimeout(app.state.timer);
        try {
          fn();
        } catch (e) {
          console.error('app.js.update', e);
        }
        app.state.timer = setTimeout(function() {
          if (app.state.shouldBuild === true) {
            app.js.build();
          } else {
            app.js.saveAndReloadProject();
          }
        }, 500);
      });
    }
    app.js.server = function(path, success, data, requestType) {
      app.js.log('app.js.server() invoked.');
      if (_.isNil(data)) data = {};
      if (_.isNil(requestType)) requestType = 'GET';

      $.ajax({
        type: requestType,
        url: '/project/' + path,
        data: data,
        success: function(data) {
          success(data);
        },
        contentType: "application/json",
        dataType: 'json'
      });
    }
    app.js.getProjects = function(scope, attributes) {
      app.js.log('app.js.getProjects() invoked.');
      var projects = app._state.get('projects');
      app.js.server('list', function(data) {
        projects.removeAll();
        app.setState(function() {
          data.projects.forEach(function(project) {
            projects.create({
              name: project
            });
          });
        });
      });
    }
    app.js.loadProject = function(projectName, shouldConfirm) {
      app.js.log('app.js.loadProjects() invoked.');
      if (_.isNil(shouldConfirm)) shouldConfirm = true;
      if (shouldConfirm === true) {
        if (!confirm('Are you sure you want to load a different project?')) return;
      }

      app.setState(function() {
        app.js.setStatus('Loading project ' + projectName + '...');
      });

      app.js.server('load', function(data) {
        app.setState(function() {
          app.js.setStatus('Loaded project ' + data.project.name + '.');
        });
        app.js.cleanState(data.project, true);
        app.js.build();
      }, {
        name: projectName
      });
    }
    app.js.setStatus = function(message) {
      app.js.log('app.js.setStatus() invoked.');
      app.setState(function() {
        app.state.status = message;
      });
    }
    app.js.getCssVar = function(dollarName) {
      var name = dollarName.substring(1);
      var found = _.find(blissProject.cssVars, {
        'name': name
      });
      return (_.isNil(found)) ? '' : found.value;
    }
    app.js.saveProject = function(success) {
      app.js.log('app.js.saveProject() invoked.');
      var proj = app.buildProject;
      var data = JSON.stringify(proj);
      app.js.setStatus('Saving project ' + proj.name + '...');

      $.ajax({
        type: 'POST',
        url: '/project/save',
        data: data,
        success: function(data) {
          app.js.setStatus('Saved project ' + proj.name + '.');
          if (!_.isNil(success)) success(data);
        },
        contentType: "application/json",
        dataType: 'json'
      });
    }
    app.js.createNewProject = function(shouldConfirm) {
      app.js.log('app.js.createNewProject() invoked.');
      if (_.isNil(shouldConfirm)) shouldConfirm = true;

      if (shouldConfirm === true) {
        if (!confirm('Are you sure you want to create a new project?')) return;
      }

      app.setState(function() {
        app.buildProject = newBlissProject;
        app.state.shouldBuild = false;
      });
    }
    app.js.saveAndReloadProject = function() {
      app.js.log('app.js.saveAndReloadProject() invoked.');
      // save current json
      app.js.saveProject(function() {
        // load project
        app.js.loadProject(app.buildProject.name, false);
      });
    }
    app.js.refreshIframe = function() {
      app.js.log('app.js.refreshIframe() invoked.');
      var iframe = $('#preview');
      var currentSrc = iframe.attr('src');
      if (_.isUndefined(currentSrc)) return;

      var url = location.origin + '/bliss/designer/designer.html';
      iframe.attr('src', url);
    }
    app.js.refresh = function() {
      app.js.log('app.js.refresh() invoked.');
      // refresh the project list
      app.js.getProjects();

      // refresh iframe
      app.js.refreshIframe();
    }
    app.js.cleanState = function(buildProject, shouldBuildProject) {
      app.js.log('app.js.cleanState() invoked.');
      app.setState(function() {
        // Clean existing state
        //app._state.reset();
        app._state = state();

        // Set build project
        app.js.log('setting build', buildProject);
        app.buildProject = buildProject;

        // Set State
        app.state.shouldSave = false;
        app.state.shouldBuild = shouldBuildProject;

        // Set internal state
        var internal = app._state.create('internal');
        internal.setData('activeComponent', app.buildProject.rootId);

        var view = app._state.create('view');
        view.create({
          name: 'designer',
          label: 'Designer'
        });
        view.create({
          name: 'js',
          label: 'JavaScript'
        });
        view.create({
          name: 'global_js',
          label: 'Global JS'
        });
        view.create({
          name: 'global_css',
          label: 'Global CSS'
        });
        view.create({
          name: 'css_vars',
          label: 'CSS Variables'
        });
        view.create({
          name: 'page_load',
          label: 'Page Load'
        });
        view.create({
          name: 'node_packages',
          label: 'Node Packages'
        });
        view.create({
          name: 'settings',
          label: 'Settings'
        });
        view.setData('selected', 'designer');

        var color = app._state.create('color');
        color.setData('currentColor', '#ffffff');

        var res = app._state.create('res');
        res.create({
          value: 'full',
          label: 'Viewport',
          width: '100%',
          height: 'calc(100% - 32px)',
          previewWidth: '100%',
          previewHeight: 'calc(100vh - 100px)'
        });
        res.create({
          value: 'galaxys5',
          label: 'Galaxy S5',
          width: '360px',
          height: '640px',
          previewWidth: 'calc(360px + 20px)',
          previewHeight: 'calc(640px + 52px)'
        });
        res.create({
          value: 'nexus5x',
          label: 'Nexus 5X',
          width: '412px',
          height: '732px',
          previewWidth: 'calc(412px + 20px)',
          previewHeight: 'calc(732px + 52px)'
        });
        res.create({
          value: 'nexus6p',
          label: 'Nexus 6P',
          width: '412px',
          height: '732px',
          previewWidth: 'calc(412px + 20px)',
          previewHeight: 'calc(732px + 52px)'
        });
        res.create({
          value: 'iphone5',
          label: 'iPhone 5',
          width: '320px',
          height: '568px',
          previewWidth: 'calc(320px + 20px)',
          previewHeight: 'calc(568px + 52px)'
        });
        res.create({
          value: 'iphone6',
          label: 'iPhone 6',
          width: '375px',
          height: '667px',
          previewWidth: 'calc(375px + 20px)',
          previewHeight: 'calc(667px + 52px)'
        });
        res.create({
          value: 'iphone6plus',
          label: 'iPhone 6 Plus',
          width: '414px',
          height: '736px',
          previewWidth: 'calc(414px + 20px)',
          previewHeight: 'calc(736px + 52px)'
        });
        res.create({
          value: 'ipad',
          label: 'iPad',
          width: '768px',
          height: '1024px',
          previewWidth: 'calc(768px + 20px)',
          previewHeight: 'calc(1024px + 52px)'
        });
        res.create({
          value: 'ipadpro',
          label: 'iPad Pro',
          width: '1024px',
          height: '1366px',
          previewWidth: 'calc(1024px + 20px)',
          previewHeight: 'calc(1366px + 52px)'
        });
        res.setData('selected', 'full');

        var display = app._state.create('display');
        display.create({
          name: 'components',
          width: '20%',
          active: true
        });
        display.create({
          name: 'designer',
          width: '60%',
          width2: '80%',
          width3: '100%',
          active: true
        });
        display.create({
          name: 'properties',
          width: '20%',
          active: true
        });

        var projects = app._state.create('projects');
        app.js.getProjects();
      });
    }
    app.js.log = function() {
      return;
      if (typeof app.buildProject !== 'undefined') {
        if (app.buildProject.build === 'bliss') {
          var args = Array.prototype.slice.call(arguments);
          console.log.apply(this, args);
        }
      }
    }
    app.methods["85"] = {};
    app.methods["85"].handleClick = function(scope, attributes) {
      return function(e) {
        app.js.createNewProject();
      }
    };
    app.methods["161"] = {};
    app.methods["161"].repeater = function(scope, attributes) {
      return app._state.get('projects').getAll();
    };

    app.methods["161"].getText = function(scope, attributes) {
      return scope.repeater[scope.repeater_index].name;
    };

    app.methods["161"].handleClick = function(scope, attributes) {
      var project = scope.repeater[scope.repeater_index].name;
      return function(e) {
        app.setState(function() {
          app.js.loadProject(project);
        });
      }
    };
    app.methods["165"] = {};
    app.methods["165"].getText = function(scope, attributes) {
      return scope.repeater[scope.repeater_index].name;
    };
    app.methods["190"] = {};
    app.methods["190"].handleClick = function(scope, attributes) {
      var comp = this;
      return function(e) {
        comp.exportProject();
      }
    };
    app.methods["190"].setStatus = function(message) {
      app.setState(function() {
        app.state.status = message;
      });
    }
    app.methods["190"].exportProject = function() {
      var comp = this;
      var proj = app.buildProject;
      var data = JSON.stringify(proj);
      comp.setStatus('Building ' + proj.name + '...');

      $.ajax({
        type: 'POST',
        url: '/compiler/export',
        data: data,
        success: function(data) {
          comp.setStatus('Built ' + proj.name + '.');
        },
        contentType: "application/json",
        dataType: 'json'
      });
    }
    app.methods["104"] = {};
    app.methods["104"].handleClick = function(scope, attributes) {
      var comp = this;
      return function(e) {
        comp.createProjectDist();
      }
    };
    app.methods["104"].setStatus = function(message) {
      app.setState(function() {
        app.state.status = message;
      });
    }
    app.methods["104"].createProjectDist = function() {
      var comp = this;
      var proj = app.buildProject;
      var data = JSON.stringify(proj);
      comp.setStatus('Deploying ' + proj.name + '...');

      $.ajax({
        type: 'POST',
        url: '/compiler/dist',
        data: data,
        success: function(data) {
          comp.setStatus('Deployed ' + proj.name + '.');
        },
        contentType: "application/json",
        dataType: 'json'
      });
    }
    app.methods["93"] = {};
    app.methods["93"].saveProject = function() {
      var comp = this;
      var proj = app.buildProject;
      var data = JSON.stringify(proj);
      comp.setStatus('Saving project ' + proj.name + '...');

      $.ajax({
        type: 'POST',
        url: '/project/save',
        data: data,
        success: function(data) {
          comp.setStatus('Saved project ' + proj.name + '.');
        },
        contentType: "application/json",
        dataType: 'json'
      });
    }
    app.methods["93"].handleClick = function(scope, attributes) {
      var comp = this;
      return function(e) {
        comp.saveProject();
      }
    };
    app.methods["93"].setStatus = function(message) {
      app.setState(function() {
        app.state.shouldSave = false;
        app.state.status = message;
      });
    }
    app.methods["93"].getClass = function(scope, attributes) {
      if (app.state.shouldSave === true) {
        return "btn btn-primary btn-sm";
      } else {
        return "btn btn-default btn-sm";
      }
    }
    app.methods["93"].getStyles = function(scope, attributes) {
      var styles = {};
      if (app.state.shouldSave === true) {
        styles.backgroundColor = app.js.getCssVar('$menuWarn');
        styles.borderColor = app.js.getCssVar('$menuWarn');
      }
      return styles;
    }
    app.methods["201"] = {};
    app.methods["201"].handleClick = function(scope, attributes) {
      return function(e) {
        //var iframe = $('#preview');
        try {
          //iframe[0].contentWindow.location.reload();
          $('#preview').attr("src", $('#preview').attr("src"));
        } catch (e) {
          console.log('Unable to refresh preview iframe', e);
        }
      }
    };
    app.methods["229"] = {};
    app.methods["229"].getText = function(scope, attributes) {
      var viewState = app._state.get('view');
      var view = viewState.findBy('name', viewState.getData('selected'));
      return view.label;
    }
    app.methods["231"] = {};
    app.methods["231"].repeater = function(scope, attributes) {
      var views = app._state.get('view').getAll();
      return views;
    };

    app.methods["231"].getText = function(scope, attributes) {
      return scope.repeater[scope.repeater_index].label;
    }
    app.methods["231"].handleClick = function(scope, attributes) {
      var view = app._state.get('view');
      var name = scope.repeater[scope.repeater_index].name;

      return function(e) {
        //var value = e.target.value;
        app.setState(function() {
          view.setData('selected', name);
        });
      }
    };
    app.methods["234"] = {};
    app.methods["234"].getText = function(scope, attributes) {
      var viewState = app._state.get('res');
      var view = viewState.findBy('value', viewState.getData('selected'));
      return view.label;
    }
    app.methods["236"] = {};
    app.methods["236"].repeater = function(scope, attributes) {
      var res = app._state.get('res').getAll();
      return res;
    };

    app.methods["236"].getText = function(scope, attributes) {
      return scope.repeater[scope.repeater_index].label;
    }
    app.methods["236"].handleClick = function(scope, attributes) {
      var view = app._state.get('res');
      var name = scope.repeater[scope.repeater_index].value;

      return function(e) {
        //var value = e.target.value;
        app.setState(function() {
          view.setData('selected', name);
        });
      }
    };
    app.methods["150"] = {};
    app.methods["150"].getClass = function() {
      var show = app._state.get('display').findBy('name', 'components').active;
      if (show === true) {
        return "btn btn-sm btn-primary";
      } else {
        return "btn btn-sm btn-default";
      }
    }
    app.methods["150"].setContentValue = function() {
      return function() {
        var components = app._state.get('display').findBy('name', 'components');
        app.setState(function() {
          app._state.get('display').update(components.id, {
            active: !components.active
          });
        });
      };
    }
    app.methods["150"].getStyles = function(scope, attributes) {
      var styles = {};
      var show = app._state.get('display').findBy('name', 'components').active;
      if (show === true) {
        styles.backgroundColor = app.js.getCssVar('$menuHighlight');
        styles.borderColor = app.js.getCssVar('$menuHighlight');
      }
      return styles;
    }
    app.methods["157"] = {};
    app.methods["157"].getClass = function() {
      var show = app._state.get('display').findBy('name', 'properties').active;
      if (show === true) {
        return "btn btn-sm btn-primary";
      } else {
        return "btn btn-sm btn-default";
      }
    }
    app.methods["157"].setContentValue = function() {
      return function() {
        var properties = app._state.get('display').findBy('name', 'properties');
        app.setState(function() {
          app._state.get('display').update(properties.id, {
            active: !properties.active
          });
        });
      };
    }
    app.methods["157"].getStyles = function(scope, attributes) {
      var styles = {};
      var show = app._state.get('display').findBy('name', 'properties').active;
      if (show === true) {
        styles.backgroundColor = app.js.getCssVar('$menuHighlight');
        styles.borderColor = app.js.getCssVar('$menuHighlight');
      }
      return styles;
    }
    app.methods["153"] = {};
    app.methods["153"].getValue = function(scope, attributes) {
      var color = app._state.get('color');
      return color.getData('currentColor');
    }
    app.methods["153"].handleChange = function(scope, attributes) {
      return function(e) {
        var color = app._state.get('color');
        app.setState(function() {
          color.setData('currentColor', e.target.value);
        });
      }
    };
    app.methods["154"] = {};
    app.methods["154"].handleChange = function(scope, attributes) {
      return function(e) {
        app.setState(function() {
          var color = app._state.get('color');
          color.setData('currentColor', e.target.value);
        });
      };
    };

    app.methods["154"].getValue = function(scope, attributes) {
      var color = app._state.get('color');
      return color.getData('currentColor');
    }
    app.methods["3"] = {};
    app.methods["3"].shouldShow = function(scope, attributes) {
      var display = app._state.get('display');
      var show = display.findBy('name', 'components').active;
      return show;
    }
    app.methods["18"] = {};
    app.methods["18"].setDataProp = function(scope, props) {
      return app.buildProject;
    }
    app.methods["18"].setOnSelectProp = function(scope, props) {
      return function(id) {
        app.js.selectComponent(id);
      };
    }
    app.methods["18"].setOnCreateProp = function(scope, props) {
      return function(toId) {
        var proj = BlissTree.createComponent(app.buildProject, toId);
        app.js.update(function() {
          app.buildProject = proj;
        });
      };
    }
    app.methods["18"].setOnCloneProp = function(scope, props) {
      return function(cloneId) {
        var proj = BlissTree.cloneComponent(app.buildProject, cloneId);
        app.js.update(function() {
          app.buildProject = proj;
        });
      };
    }
    app.methods["18"].setOnDeleteProp = function(scope, props) {
      return function(id) {
        var proj = BlissTree.deleteComponent(app.buildProject, id);
        app.js.update(function() {
          app.buildProject = proj;
        });
      };
    }
    app.methods["18"].setOnMoveProp = function(scope, props) {
      return function(fromId, toId, shouldBeChild) {
        var proj = BlissTree.moveComponent(app.buildProject, fromId, toId, shouldBeChild);
        app.js.update(function() {
          app.buildProject = proj;
        });
      }
    }
    app.methods["18"].setThis = function(scope, props) {
      var that = app;
      return function() {
        return that;
      };
    }
    app.methods["18"].getSelected = function(scope, attributes) {
      var selected = app._state.get('internal').getData('activeComponent');
      return selected;
    }
    app.methods["4"] = {};
    app.methods["4"].getStyles = function(scope, attributes) {
      var designer = app._state.get('display').findBy('name', 'designer');
      var properties = app._state.get('display').findBy('name', 'properties');
      var components = app._state.get('display').findBy('name', 'components');

      var newWidth = designer.width;

      if (!properties.active && !components.active) {
        newWidth = designer.width3;
      } else if (!properties.active || !components.active) {
        newWidth = designer.width2;
      }

      var styles = {
        'width': newWidth
      };

      return styles;
    }
    app.methods["80"] = {};
    app.methods["80"].getStyle = function() {
      var selected = app._state.get('view').getData('selected');
      var displayValue = (selected === 'designer') ? 'block' : 'none';
      return {
        'display': displayValue
      };
    }
    app.methods["205"] = {};
    app.methods["205"].getStyles = function(scope, attributes) {
      var styles = {
        width: 'auto',
        height: 'auto'
      };

      var res = app._state.get('res');
      var selected = res.findBy('value', res.getData('selected'));

      styles.width = selected.previewWidth;
      styles.height = selected.previewHeight;

      return styles;
    }
    app.methods["204"] = {};
    app.methods["204"].getText = function(scope, attributes) {
      var res = app._state.get('res');
      var currentRes = res.findBy('value', res.getData('selected'));
      return currentRes.label;
    }
    app.methods["17"] = {};
    app.methods["17"].getStyles = function(scope, attributes) {
      var styles = {
        width: '100%',
        height: 'calc(100vh - 50px)'
      };

      var res = app._state.get('res');
      var selected = res.findBy('value', res.getData('selected'));

      styles.width = selected.width;
      styles.height = selected.height;

      return styles;
    }
    app.methods["17"].shouldShow = function(scope, attributes) {
      return (app.state.shouldBuild === true);
    }
    app.methods["54"] = {};
    app.methods["54"].getStyle = function() {
      var selected = app._state.get('view').getData('selected');
      var displayValue = (selected === 'js') ? 'block' : 'none';
      return {
        'display': displayValue
      };
    }
    app.methods["55"] = {};
    app.methods["55"].getText = function(scope, attributes) {
      var internal = app._state.get('internal');
      var activeComponent = internal.getData('activeComponent');
      return (app.buildProject.components[activeComponent].name || '') + " - JS";
    };
    app.methods["79"] = {};
    app.methods["79"].setComponentProp = function(scope, props) {
      var internal = app._state.get('internal');
      var activeComponent = internal.getData('activeComponent');
      return app.buildProject.components[activeComponent];
    }
    app.methods["79"].setOnChangeProp = function(scope, props) {
      return function(newComponent) {
        app.js.update(function() {
          var internal = app._state.get('internal');
          var activeComponent = internal.getData('activeComponent');
          app.buildProject.components[activeComponent] = newComponent;
        });
      }
    }
    app.methods["97"] = {};
    app.methods["97"].getStyle = function() {
      var selected = app._state.get('view').getData('selected');
      var displayValue = (selected === 'settings') ? 'block' : 'none';
      return {
        'display': displayValue
      };
    }
    app.methods["102"] = {};
    app.methods["102"].getValue = function(scope, attributes) {
      return app.buildProject.name;
    };

    app.methods["102"].handleChange = function(scope, attributes) {
      return function(e) {
        app.setState(function() {
          app.state.shouldSave = true;
          app.buildProject.name = e.target.value;
        });
      }
    };
    app.methods["179"] = {};
    app.methods["179"].getStyle = function() {
      var selected = app._state.get('view').getData('selected');
      var displayValue = (selected === 'global_js') ? 'block' : 'none';
      return {
        'display': displayValue
      };
    }
    app.methods["108"] = {};
    app.methods["108"].setComponentProp = function(scope, props) {
      return app.buildProject;
    }
    app.methods["108"].setOnChangeProp = function(scope, props) {
      return function(newComponent) {
        app.js.update(function() {
          app.buildProject.js = newComponent.js;
        });
      }
    }
    app.methods["180"] = {};
    app.methods["180"].getStyle = function() {
      var selected = app._state.get('view').getData('selected');
      var displayValue = (selected === 'global_css') ? 'block' : 'none';
      return {
        'display': displayValue
      };
    }
    app.methods["224"] = {};
    app.methods["224"].setComponent = function(scope, props) {
      return app.buildProject;
    };

    app.methods["224"].setOnChange = function(scope, attributes) {
      return function(newBuildProject) {
        app.js.update(function() {
          app.buildProject = newBuildProject;
        });
      }
    };
    app.methods["225"] = {};
    app.methods["225"].getStyle = function() {
      var selected = app._state.get('view').getData('selected');
      var displayValue = (selected === 'css_vars') ? 'block' : 'none';
      return {
        'display': displayValue
      };
    }
    app.methods["141"] = {};
    app.methods["141"].setObjectContainer = function(scope, props) {
      return app.buildProject;
    };

    app.methods["141"].setObjectKey = function(scope, props) {
      return "cssVars";
    };

    app.methods["141"].setObjectType = function(scope, props) {
      return "object";
    };

    app.methods["141"].setOnChange = function(scope, attributes) {
      return function(newCssVars) {
        app.js.update(function() {
          app.buildProject.cssVars = newCssVars;
        });
      }
    };

    app.methods["141"].setItemKey = function(scope, attributes) {
      return "name";
    }
    app.methods["141"].setItemValue = function(scope, attributes) {
      return "value";
    }
    app.methods["226"] = {};
    app.methods["226"].getStyle = function() {
      var selected = app._state.get('view').getData('selected');
      var displayValue = (selected === 'page_load') ? 'block' : 'none';
      return {
        'display': displayValue
      };
    }
    app.methods["156"] = {};
    app.methods["156"].setObjectContainer = function(scope, props) {
      return app.buildProject;
    };

    app.methods["156"].setObjectKey = function(scope, props) {
      return "load";
    };

    app.methods["156"].setObjectType = function(scope, props) {
      return "primitive";
    };

    app.methods["156"].setOnChange = function(scope, attributes) {
      return function(newLoad) {
        app.js.update(function() {
          app.buildProject.load = newLoad;
        });
      }
    };
    app.methods["139"] = {};
    app.methods["139"].setObjectContainer = function(scope, props) {
      return app.buildProject;
    };

    app.methods["139"].setObjectKey = function(scope, props) {
      return "externalCss";
    };

    app.methods["139"].setObjectType = function(scope, props) {
      return "primitive";
    };

    app.methods["139"].setOnChange = function(scope, attributes) {
      return function(newExternalCss) {
        app.js.update(function() {
          app.buildProject.externalCss = newExternalCss;
        });
      }
    };
    app.methods["135"] = {};
    app.methods["135"].setObjectContainer = function(scope, props) {
      return app.buildProject;
    };

    app.methods["135"].setObjectKey = function(scope, props) {
      return "externalJs";
    };

    app.methods["135"].setObjectType = function(scope, props) {
      return "primitive";
    };

    app.methods["135"].setOnChange = function(scope, attributes) {
      return function(newExternalJs) {
        app.js.update(function() {
          app.buildProject.externalJs = newExternalJs;
        });
      }
    };
    app.methods["227"] = {};
    app.methods["227"].getStyle = function() {
      var selected = app._state.get('view').getData('selected');
      var displayValue = (selected === 'node_packages') ? 'block' : 'none';
      return {
        'display': displayValue
      };
    }
    app.methods["143"] = {};
    app.methods["143"].setObjectContainer = function(scope, props) {
      return app.buildProject;
    };

    app.methods["143"].setObjectKey = function(scope, props) {
      return "packages";
    };

    app.methods["143"].setObjectType = function(scope, props) {
      return "object";
    };

    app.methods["143"].setOnChange = function(scope, attributes) {
      return function(newPackages) {
        app.js.update(function() {
          app.buildProject.packages = newPackages;
        });
      }
    };

    app.methods["143"].setItemKey = function(scope, attributes) {
      return "name";
    }
    app.methods["143"].setItemValue = function(scope, attributes) {
      return "version";
    }
    app.methods["77"] = {};
    app.methods["77"].shouldShow = function(scope, attributes) {
      var display = app._state.get('display');
      var show = display.findBy('name', 'properties').active;
      return show;
    }
    app.methods["11"] = {};
    app.methods["11"].setComponentProp = function(scope, props) {
      var internal = app._state.get('internal');
      return app.buildProject.components[internal.getData('activeComponent')];
    }
    app.methods["11"].setOnChangeProp = function(scope, props) {
      return function(newComponent) {
        var internal = app._state.get('internal');
        var activeComponent = internal.getData('activeComponent');
        app.js.update(function() {
          app.buildProject.components[activeComponent] = newComponent;
        });
      }
    }
    app.methods["95"] = {};
    app.methods["95"].showStatus = function(scope, attributes) {
      return app.state.status || 'Ready.';
    };
    app.getKey = function() {
      var out = [];
      for (var i = 0; i < arguments.length; i++) out.push(arguments[i]);
      return out.join('_');
    };
    app.mergeAttributes = function(id, scope, dynamicAttributes, attrs) {
      for (key in dynamicAttributes) {
        if (dynamicAttributes.hasOwnProperty(key)) {
          var fn = dynamicAttributes[key];
          var value = app.methods[id][fn](scope, attrs);
          attrs[key] = value;
        }
      }
      return attrs;
    }
    app.rootComponent = function(props) {
      if (typeof props !== "undefined") app.props = props;
      var scope = {};
      return (
        React.createElement('div', app.mergeAttributes('1', scope, {}, {
            "id": "blissUi_1",
            "key": app.getKey('id', '1')
          }),
          React.createElement('div', app.mergeAttributes('111', scope, {}, {
              "id": "mainNav",
              "key": app.getKey('id', '111')
            }),
            React.createElement('div', app.mergeAttributes('181', scope, {}, {
              "className": "pull-left",
              "id": "appHeader_181",
              "key": app.getKey('id', '181')
            }), "Bliss UI"),
            React.createElement('div', app.mergeAttributes('88', scope, {}, {
                "className": "float-left",
                "id": "projectOptions_88",
                "key": app.getKey('id', '88')
              }),
              React.createElement('div', app.mergeAttributes('105', scope, {}, {
                  "id": "projectDropdown",
                  "className": "btn-group",
                  "key": app.getKey('id', '105')
                }),
                React.createElement('button', app.mergeAttributes('106', scope, {}, {
                  "type": "button",
                  "data-toggle": "dropdown",
                  "className": "btn btn-default dropdown-toggle btn-sm",
                  "id": "dropdownButton_106",
                  "key": app.getKey('id', '106')
                }), "Projects"),
                React.createElement('div', app.mergeAttributes('107', scope, {}, {
                    "className": "dropdown-menu",
                    "id": "options_107",
                    "key": app.getKey('id', '107')
                  }),
                  React.createElement('a', app.mergeAttributes('85', scope, {
                      "onClick": "handleClick"
                    }, {
                      "id": "newButton",
                      "className": "dropdown-item",
                      "href": "#",
                      "key": app.getKey('id', '85')
                    }),
                    React.createElement('i', app.mergeAttributes('163', scope, {}, {
                      "className": "fa fa-plus",
                      "id": "icon_163",
                      "key": app.getKey('id', '163')
                    })),
                    React.createElement('span', app.mergeAttributes('164', scope, {}, {
                      "id": "label_164",
                      "key": app.getKey('id', '164')
                    }), "New project")),
                  React.createElement('div', app.mergeAttributes('158', scope, {}, {
                    "className": "dropdown-divider",
                    "id": "divider_158",
                    "key": app.getKey('id', '158')
                  })),
                  React.createElement('h6', app.mergeAttributes('162', scope, {}, {
                    "className": "dropdown-header",
                    "id": "existingProjectLabels_162",
                    "key": app.getKey('id', '162')
                  }), "Open project"),
                  (function(scope) {
                    var out = [];
                    var list = scope['repeater'] = app.methods['161']['repeater'](scope);
                    for (var i = 0; i < list.length; i++) {
                      scope['repeater_index'] = i;
                      out.push(React.createElement('a', app.mergeAttributes('161', scope, {
                          "onClick": "handleClick"
                        }, {
                          "href": "#",
                          "className": "dropdown-item",
                          "id": "existingProject_161",
                          "key": app.getKey('id', '161', i)
                        }),
                        React.createElement('i', app.mergeAttributes('166', scope, {}, {
                          "className": "fa fa-file-o",
                          "id": "icon_166",
                          "key": app.getKey('id', '166')
                        })),
                        React.createElement('span', app.mergeAttributes('165', scope, {}, {
                          "id": "label_165",
                          "key": app.getKey('id', '165')
                        }), app.methods['165']['getText'](scope))));
                    }
                    return out;
                  })(scope),
                  React.createElement('div', app.mergeAttributes('159', scope, {}, {
                    "className": "dropdown-divider",
                    "id": "divider_159",
                    "key": app.getKey('id', '159')
                  })),
                  React.createElement('h6', app.mergeAttributes('194', scope, {}, {
                    "className": "dropdown-header",
                    "id": "exportLabel_194",
                    "key": app.getKey('id', '194')
                  }), "export"),
                  React.createElement('a', app.mergeAttributes('190', scope, {
                      "onClick": "handleClick"
                    }, {
                      "id": "exportButton",
                      "href": "#",
                      "className": "dropdown-item",
                      "key": app.getKey('id', '190')
                    }),
                    React.createElement('i', app.mergeAttributes('191', scope, {}, {
                      "className": "fa fa-puzzle-piece",
                      "id": "icon_191",
                      "key": app.getKey('id', '191')
                    })),
                    React.createElement('span', app.mergeAttributes('192', scope, {}, {
                      "id": "label_192",
                      "key": app.getKey('id', '192')
                    }), "Build component")),
                  React.createElement('a', app.mergeAttributes('104', scope, {
                      "onClick": "handleClick"
                    }, {
                      "href": "#",
                      "className": "dropdown-item",
                      "id": "deployProject_104",
                      "key": app.getKey('id', '104')
                    }),
                    React.createElement('i', app.mergeAttributes('167', scope, {}, {
                      "className": "fa fa-paper-plane",
                      "id": "icon_167",
                      "key": app.getKey('id', '167')
                    })),
                    React.createElement('span', app.mergeAttributes('168', scope, {}, {
                      "id": "label_168",
                      "key": app.getKey('id', '168')
                    }), "Deploy project")))),
              React.createElement('button', app.mergeAttributes('93', scope, {
                  "onClick": "handleClick",
                  "className": "getClass",
                  "style": "getStyles"
                }, {
                  "id": "saveButton",
                  "key": app.getKey('id', '93')
                }),
                React.createElement('i', app.mergeAttributes('94', scope, {}, {
                  "className": "fa fa-floppy-o",
                  "id": "icon_94",
                  "key": app.getKey('id', '94')
                }))),
              React.createElement('button', app.mergeAttributes('201', scope, {
                  "onClick": "handleClick"
                }, {
                  "className": "btn btn-default btn-sm",
                  "id": "refreshButton_201",
                  "key": app.getKey('id', '201')
                }),
                React.createElement('i', app.mergeAttributes('202', scope, {}, {
                  "className": "fa fa-refresh",
                  "id": "icon_202",
                  "key": app.getKey('id', '202')
                })))),
            React.createElement('div', app.mergeAttributes('101', scope, {}, {
                "className": "pull-left",
                "id": "toggleContent",
                "key": app.getKey('id', '101')
              }),
              React.createElement('div', app.mergeAttributes('189', scope, {}, {
                "className": "pull-left",
                "id": "toggleLabel_189",
                "key": app.getKey('id', '189')
              }), "Current View"),
              React.createElement('div', app.mergeAttributes('228', scope, {}, {
                  "id": "projectDropdown",
                  "className": "btn-group",
                  "key": app.getKey('id', '228')
                }),
                React.createElement('button', app.mergeAttributes('229', scope, {}, {
                  "type": "button",
                  "data-toggle": "dropdown",
                  "className": "btn btn-default dropdown-toggle btn-sm",
                  "id": "viewButton_229",
                  "key": app.getKey('id', '229')
                }), app.methods['229']['getText'](scope)),
                React.createElement('div', app.mergeAttributes('230', scope, {}, {
                    "className": "dropdown-menu",
                    "id": "viewOptions_230",
                    "key": app.getKey('id', '230')
                  }),
                  (function(scope) {
                    var out = [];
                    var list = scope['repeater'] = app.methods['231']['repeater'](scope);
                    for (var i = 0; i < list.length; i++) {
                      scope['repeater_index'] = i;
                      out.push(React.createElement('a', app.mergeAttributes('231', scope, {
                        "onClick": "handleClick"
                      }, {
                        "href": "#",
                        "className": "dropdown-item",
                        "id": "viewItem_231",
                        "key": app.getKey('id', '231', i)
                      }), app.methods['231']['getText'](scope)));
                    }
                    return out;
                  })(scope)))),
            React.createElement('div', app.mergeAttributes('147', scope, {}, {
                "className": "pull-left",
                "id": "resolutionContainer_147",
                "key": app.getKey('id', '147')
              }),
              React.createElement('div', app.mergeAttributes('185', scope, {}, {
                "className": "pull-left",
                "id": "resolutionLabel_185",
                "key": app.getKey('id', '185')
              }), "Resolution"),
              React.createElement('div', app.mergeAttributes('233', scope, {}, {
                  "id": "projectDropdown",
                  "className": "btn-group",
                  "key": app.getKey('id', '233')
                }),
                React.createElement('button', app.mergeAttributes('234', scope, {}, {
                  "type": "button",
                  "data-toggle": "dropdown",
                  "className": "btn btn-default dropdown-toggle btn-sm",
                  "id": "resButton_234",
                  "key": app.getKey('id', '234')
                }), app.methods['234']['getText'](scope)),
                React.createElement('div', app.mergeAttributes('235', scope, {}, {
                    "className": "dropdown-menu",
                    "id": "resOptions_235",
                    "key": app.getKey('id', '235')
                  }),
                  (function(scope) {
                    var out = [];
                    var list = scope['repeater'] = app.methods['236']['repeater'](scope);
                    for (var i = 0; i < list.length; i++) {
                      scope['repeater_index'] = i;
                      out.push(React.createElement('a', app.mergeAttributes('236', scope, {
                        "onClick": "handleClick"
                      }, {
                        "href": "#",
                        "className": "dropdown-item",
                        "id": "resItem_236",
                        "key": app.getKey('id', '236', i)
                      }), app.methods['236']['getText'](scope)));
                    }
                    return out;
                  })(scope)))),
            React.createElement('div', app.mergeAttributes('187', scope, {}, {
                "id": "toggleLayoutContainer_187",
                "key": app.getKey('id', '187')
              }),
              React.createElement('div', app.mergeAttributes('188', scope, {}, {
                "id": "layoutLabel_188",
                "key": app.getKey('id', '188')
              }), "Layout"),
              React.createElement('button', app.mergeAttributes('150', scope, {
                "onClick": "setContentValue",
                "className": "getClass",
                "style": "getStyles"
              }, {
                "id": "showElements_150",
                "key": app.getKey('id', '150')
              }), "Elements"),
              React.createElement('button', app.mergeAttributes('157', scope, {
                "onClick": "setContentValue",
                "className": "getClass",
                "style": "getStyles"
              }, {
                "id": "showProperties_157",
                "key": app.getKey('id', '157')
              }), "Properties")),
            React.createElement('div', app.mergeAttributes('152', scope, {}, {
                "className": "pull-right",
                "id": "colorPicker_152",
                "key": app.getKey('id', '152')
              }),
              React.createElement('input', app.mergeAttributes('153', scope, {
                "value": "getValue",
                "onChange": "handleChange"
              }, {
                "id": "inputText_153",
                "key": app.getKey('id', '153')
              })),
              React.createElement('input', app.mergeAttributes('154', scope, {
                "onChange": "handleChange",
                "value": "getValue"
              }, {
                "type": "color",
                "id": "inputColor_154",
                "key": app.getKey('id', '154')
              }))),
            React.createElement('div', app.mergeAttributes('186', scope, {}, {
              "className": "pull-right",
              "id": "colorPickerLabel_186",
              "key": app.getKey('id', '186')
            }), "Color picker")),
          React.createElement('div', app.mergeAttributes('96', scope, {}, {
              "id": "container_96",
              "key": app.getKey('id', '96')
            }),
            React.createElement('div', app.mergeAttributes('2', scope, {}, {
                "className": "clearfix",
                "id": "row_2",
                "key": app.getKey('id', '2')
              }),
              (function(scope) {
                var out = [];
                scope['shouldShow'] = app.methods['3']['shouldShow'](scope);
                if (app.methods['3']['shouldShow'](scope) === true) {
                  out.push(React.createElement('div', app.mergeAttributes('3', scope, {}, {
                      "className": "float-left",
                      "id": "elements_3",
                      "key": app.getKey('id', '3')
                    }),
                    React.createElement('h3', app.mergeAttributes('20', scope, {}, {
                      "id": "elementsHeader_20",
                      "key": app.getKey('id', '20')
                    }), "Elements"),
                    React.createElement('div', app.mergeAttributes('110', scope, {}, {
                        "id": "treeContainer_110",
                        "key": app.getKey('id', '110')
                      }),
                      React.createElement(BlissTree.component, app.mergeAttributes('18', scope, {
                        "data": "setDataProp",
                        "onSelect": "setOnSelectProp",
                        "onCreate": "setOnCreateProp",
                        "onClone": "setOnCloneProp",
                        "onDelete": "setOnDeleteProp",
                        "onMove": "setOnMoveProp",
                        "_this": "setThis",
                        "selected": "getSelected"
                      }, {
                        "id": "elementTree_18",
                        "key": app.getKey('id', '18')
                      })))));
                }
                return out;
              })(scope),
              React.createElement('div', app.mergeAttributes('4', scope, {
                  "style": "getStyles"
                }, {
                  "id": "designer",
                  "className": "float-left",
                  "key": app.getKey('id', '4')
                }),
                React.createElement('div', app.mergeAttributes('80', scope, {
                    "style": "getStyle"
                  }, {
                    "id": "designerContainer_80",
                    "key": app.getKey('id', '80')
                  }),
                  React.createElement('div', app.mergeAttributes('205', scope, {
                      "style": "getStyles"
                    }, {
                      "id": "previewContainer_205",
                      "key": app.getKey('id', '205')
                    }),
                    React.createElement('h3', app.mergeAttributes('204', scope, {}, {
                      "className": "clearfix",
                      "id": "iframeHeader_204",
                      "key": app.getKey('id', '204')
                    }), app.methods['204']['getText'](scope)),
                    (function(scope) {
                      var out = [];
                      scope['shouldShow'] = app.methods['17']['shouldShow'](scope);
                      if (app.methods['17']['shouldShow'](scope) === true) {
                        out.push(React.createElement('iframe', app.mergeAttributes('17', scope, {
                          "style": "getStyles"
                        }, {
                          "id": "preview",
                          "src": "about:blank",
                          "key": app.getKey('id', '17')
                        })));
                      }
                      return out;
                    })(scope))),
                React.createElement('div', app.mergeAttributes('54', scope, {
                    "style": "getStyle"
                  }, {
                    "id": "jsEditor",
                    "key": app.getKey('id', '54')
                  }),
                  React.createElement('h3', app.mergeAttributes('55', scope, {}, {
                    "id": "h3Js",
                    "key": app.getKey('id', '55')
                  }), app.methods['55']['getText'](scope)),
                  React.createElement('div', app.mergeAttributes('56', scope, {}, {
                      "id": "code",
                      "key": app.getKey('id', '56')
                    }),
                    React.createElement(BlissJavascript.component, app.mergeAttributes('79', scope, {
                      "component": "setComponentProp",
                      "onChange": "setOnChangeProp"
                    }, {
                      "id": "blissJavascript_79",
                      "key": app.getKey('id', '79')
                    })))),
                React.createElement('div', app.mergeAttributes('97', scope, {
                    "style": "getStyle"
                  }, {
                    "id": "generalEditor",
                    "key": app.getKey('id', '97')
                  }),
                  React.createElement('h3', app.mergeAttributes('98', scope, {}, {
                    "id": "h3General",
                    "key": app.getKey('id', '98')
                  }), "Settings"),
                  React.createElement('div', app.mergeAttributes('199', scope, {}, {
                      "className": "clearfix",
                      "id": "projectDetailsContainer_199",
                      "key": app.getKey('id', '199')
                    }),
                    React.createElement('span', app.mergeAttributes('103', scope, {}, {
                      "className": "pull-left",
                      "id": "nameLabel_103",
                      "key": app.getKey('id', '103')
                    }), "Project name: "),
                    React.createElement('input', app.mergeAttributes('102', scope, {
                      "onChange": "handleChange",
                      "value": "getValue"
                    }, {
                      "className": "form-control pull-left input-sm",
                      "id": "projectName_102",
                      "key": app.getKey('id', '102')
                    })),
                    React.createElement('button', app.mergeAttributes('196', scope, {}, {
                        "className": "btn btn-default btn-sm pull-right",
                        "id": "deleteProject_196",
                        "key": app.getKey('id', '196')
                      }),
                      React.createElement('i', app.mergeAttributes('197', scope, {}, {
                        "className": "fa fa-trash",
                        "id": "icon_197",
                        "key": app.getKey('id', '197')
                      })),
                      React.createElement('span', app.mergeAttributes('198', scope, {}, {
                        "id": "deleteLabel_198",
                        "key": app.getKey('id', '198')
                      }), "Delete project")))),
                React.createElement('div', app.mergeAttributes('179', scope, {
                    "style": "getStyle"
                  }, {
                    "id": "globalJavascriptEditor_179",
                    "key": app.getKey('id', '179')
                  }),
                  React.createElement('h3', app.mergeAttributes('109', scope, {}, {
                    "id": "h3GeneralJs",
                    "key": app.getKey('id', '109')
                  }), "Global JavaScript"),
                  React.createElement('div', app.mergeAttributes('137', scope, {}, {
                      "className": "clearfix",
                      "id": "generalJsEditorContainer_137",
                      "key": app.getKey('id', '137')
                    }),
                    React.createElement(BlissJavascript.component, app.mergeAttributes('108', scope, {
                      "component": "setComponentProp",
                      "onChange": "setOnChangeProp"
                    }, {
                      "id": "projJs_108",
                      "key": app.getKey('id', '108')
                    })))),
                React.createElement('div', app.mergeAttributes('180', scope, {
                    "style": "getStyle"
                  }, {
                    "id": "globalCssEditor_180",
                    "key": app.getKey('id', '180')
                  }),
                  React.createElement('h3', app.mergeAttributes('223', scope, {}, {
                    "className": "clearfix",
                    "id": "globalCssHeader_223",
                    "key": app.getKey('id', '223')
                  }), "Global CSS"),
                  React.createElement(BlissPropertiesCss.component, app.mergeAttributes('224', scope, {
                    "onChange": "setOnChange",
                    "component": "setComponent"
                  }, {
                    "id": "globalCss_224",
                    "key": app.getKey('id', '224')
                  }))),
                React.createElement('div', app.mergeAttributes('225', scope, {
                    "style": "getStyle"
                  }, {
                    "id": "cssVarsEditor_225",
                    "key": app.getKey('id', '225')
                  }),
                  React.createElement('h3', app.mergeAttributes('140', scope, {}, {
                    "className": "clearfix",
                    "id": "globalCssVarsHeader_140",
                    "key": app.getKey('id', '140')
                  }), "Global CSS Vars"),
                  React.createElement(BlissPropertiesGeneric.component, app.mergeAttributes('141', scope, {
                    "objectContainer": "setObjectContainer",
                    "objectKey": "setObjectKey",
                    "objectType": "setObjectType",
                    "onChange": "setOnChange",
                    "itemKey": "setItemKey",
                    "itemValue": "setItemValue"
                  }, {
                    "id": "globalCssVars_141",
                    "key": app.getKey('id', '141')
                  }))),
                React.createElement('div', app.mergeAttributes('226', scope, {
                    "style": "getStyle"
                  }, {
                    "id": "pageLoadEditor_226",
                    "key": app.getKey('id', '226')
                  }),
                  React.createElement('h3', app.mergeAttributes('155', scope, {}, {
                    "className": "clearfix",
                    "id": "loadHeader_155",
                    "key": app.getKey('id', '155')
                  }), "Page Load Functions"),
                  React.createElement(BlissPropertiesGeneric.component, app.mergeAttributes('156', scope, {
                    "objectContainer": "setObjectContainer",
                    "objectKey": "setObjectKey",
                    "objectType": "setObjectType",
                    "onChange": "setOnChange"
                  }, {
                    "id": "loadFunctions_156",
                    "key": app.getKey('id', '156')
                  })),
                  React.createElement('h3', app.mergeAttributes('138', scope, {}, {
                    "className": "clearfix",
                    "id": "stylesheetHeader_138",
                    "key": app.getKey('id', '138')
                  }), "Stylesheets"),
                  React.createElement(BlissPropertiesGeneric.component, app.mergeAttributes('139', scope, {
                    "objectContainer": "setObjectContainer",
                    "objectKey": "setObjectKey",
                    "objectType": "setObjectType",
                    "onChange": "setOnChange"
                  }, {
                    "id": "stylesheetProperties_139",
                    "key": app.getKey('id', '139')
                  })),
                  React.createElement('h3', app.mergeAttributes('136', scope, {}, {
                    "className": "clearfix",
                    "id": "scriptsHeader_136",
                    "key": app.getKey('id', '136')
                  }), "Scripts"),
                  React.createElement(BlissPropertiesGeneric.component, app.mergeAttributes('135', scope, {
                    "objectContainer": "setObjectContainer",
                    "objectKey": "setObjectKey",
                    "objectType": "setObjectType",
                    "onChange": "setOnChange"
                  }, {
                    "id": "scriptProperties_135",
                    "key": app.getKey('id', '135')
                  }))),
                React.createElement('div', app.mergeAttributes('227', scope, {
                    "style": "getStyle"
                  }, {
                    "id": "packagesEditor_227",
                    "key": app.getKey('id', '227')
                  }),
                  React.createElement('h3', app.mergeAttributes('142', scope, {}, {
                    "className": "clearfix",
                    "id": "packagesHeader_142",
                    "key": app.getKey('id', '142')
                  }), "node packages (name, version)"),
                  React.createElement(BlissPropertiesGeneric.component, app.mergeAttributes('143', scope, {
                    "objectContainer": "setObjectContainer",
                    "objectKey": "setObjectKey",
                    "objectType": "setObjectType",
                    "onChange": "setOnChange",
                    "itemKey": "setItemKey",
                    "itemValue": "setItemValue"
                  }, {
                    "id": "packagesProperties_143",
                    "key": app.getKey('id', '143')
                  })))),
              (function(scope) {
                var out = [];
                scope['shouldShow'] = app.methods['77']['shouldShow'](scope);
                if (app.methods['77']['shouldShow'](scope) === true) {
                  out.push(React.createElement('div', app.mergeAttributes('77', scope, {}, {
                      "id": "propertiesContainer",
                      "className": "float-left",
                      "key": app.getKey('id', '77')
                    }),
                    React.createElement('h3', app.mergeAttributes('182', scope, {}, {
                      "id": "propertyHeader_182",
                      "key": app.getKey('id', '182')
                    }), "properties"),
                    React.createElement('div', app.mergeAttributes('151', scope, {}, {
                        "id": "propertiesPadding_151",
                        "key": app.getKey('id', '151')
                      }),
                      React.createElement(BlissProperties.component, app.mergeAttributes('11', scope, {
                        "component": "setComponentProp",
                        "onChange": "setOnChangeProp"
                      }, {
                        "id": "blissProperties_11",
                        "key": app.getKey('id', '11')
                      })))));
                }
                return out;
              })(scope))),
          React.createElement('div', app.mergeAttributes('95', scope, {}, {
            "id": "statusBar",
            "key": app.getKey('id', '95')
          }), app.methods['95']['showStatus'](scope))));
    };
    app.state = {
      "timer": null,
      "shouldSave": false
    };
    app.render = function() {
      var isComponent = (typeof component === 'undefined') ? false : true;
      if (isComponent) {
        if (component.state === null) return;
        component.forceUpdate();
      } else {
        ReactDOM.render(app.rootComponent(), document.getElementById('app'));
      }
    }
    app.stateQueue = [];
    app.stateProcessing = false;
    app.setState = function(fn, callback) {
      app.stateQueue.push({
        fn: fn,
        callback: callback
      });
      var _process = function() {
        app.stateProcessing = true;
        var _item = app.stateQueue.shift();
        _item.fn();
        app.render();
        if (typeof _item.callback !== "undefined") _item.callback();
        if (app.stateQueue.length === 0) {
          app.stateProcessing = false;
        } else {
          _process();
        }
      };
      if (!app.stateProcessing) _process();
    };
    app.load = function() {
      app.js.init();
    }
    app.load();

    return app;
  };
  var instance = createApp();
  instance.component = React.createClass({
    getInitialState: function() {
      var that = this;
      return {
        app: createApp(that)
      };
    },
    componentDidMount: function() {
      this.state.app.props = this.props;
      this.setState({
        app: this.state.app
      });
    },
    componentWillUnmount: function() {
      if (this.state.app.js.destroy_component !== 'undefined') this.state.app.js.destroy_component();
    },
    componentWillReceiveProps: function(newProps) {
      this.state.app.props = newProps;
      this.setState({
        app: this.state.app
      });
    },
    render: function() {
      return this.state.app.rootComponent(this.state.app.props);
    }
  });

  return instance;
})();