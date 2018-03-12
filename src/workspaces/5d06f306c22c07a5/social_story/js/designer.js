var socialStoryV = (function() {
  var createApp = function(component) {
    var app = {
      js: {},
      methods: {},
      props: {},
      state: {}
    };
    app.js['app_init'] = function() {
      // Initialize Firebase
      // TODO: Replace with your project's customized code snippet
      var config = {
        apiKey: "AIzaSyCrI98bKkMT3FFgbB5WaRWJoXpzFAu3cfA",
        authDomain: "personal-budget-6f3af.firebaseapp.com",
        databaseURL: "https://personal-budget-6f3af.firebaseio.com",
        storageBucket: "personal-budget-6f3af.appspot.com"
      };

      firebase.initializeApp(config);

      app.setState(function() {
        app.state.signedIn = false;
        app.state.ui = null;
        app.state.user = null;
        app.state.currentPage = 'home';
        app.state.database = firebase.database();
        app.state.auth = firebase.auth();
        app.state.storage = firebase.storage();
        app.state.currentStory = null;
        app.state.currentLine = "";
      });

      app.setState(function() {
        app.js.auth_changed();
      });

      window.app = app;
    }
    app.js['auth_init'] = function(scope, attributes) {
      var uiConfig = {
        callbacks: {
          signInSuccess: function(currentUser, credential, redirectUrl) {
            //app.setState(function() {
            //app.state.signedIn = true;
            //app.state.user = user;
            //});
            return false;
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            //console.log('show element');
          }
        },
        signInSuccessUrl: window.location.href,
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID
          //firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: window.location.href
      };

      var ui;
      if (app.state.ui === null) {
        // Initialize the FirebaseUI Widget using Firebase.
        ui = new firebaseui.auth.AuthUI(firebase.auth());
        app.setState(function() {
          app.state.ui = ui;
        });
      } else {
        ui = app.state.ui;
        ui.reset();
      }

      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
    }
    app.js['auth_changed'] = function() {
      app.state.auth.onAuthStateChanged(function(user) {
        if (user) {
          //console.log('authStatus user', user);
          app.setState(function() {
            app.state.signedIn = true;
            app.state.user = user;
            app.js.story_home();
          });
        } else {
          //console.log('user not logged in');
          app.setState(function() {
            app.state.user = null;
            app.state.signedIn = false;
          });

          app.setState(function() {
            app.js.auth_init();
          });
        }
      });
    }
    app.js['story_start'] = function(storyId) {
      var createStory = function(title, first_line) {
        var db = app.state.database;

        // create new story
        var newStory = db.ref().child('stories').push();
        newStory.set({
          "title": title
        });
        newStory.child('authors').child(app.state.user.uid).set(true);

        // create author
        var newAuthor = db.ref().child('authors')
          .child(app.state.user.uid)
          .child(newStory.key)
          .set(true);

        // create first line
        var newLine = db.ref().child('lines')
          .child(newStory.key)
          .push()
          .set({
            "text": first_line,
            "user": app.state.user.uid
          });

        app.js.firebase_subscribe('lines/' + newStory.key);

        app.setState(function() {
          app.state.currentPage = 'write';
          app.state.currentStory = newStory.key;
        });
      };

      var url = 'https://talaikis.com/api/quotes/random/'

      $.get(url, function(data) {
        createStory(data.quote, data.quote);
      });
    }
    app.js['story_home'] = function() {
      // listen for stories, update state
      app.js.firebase_subscribe('stories');

      app.js.firebase_subscribe_limit_last(100, 'stories');
      app.js.firebase_subscribe_limit_last(100, 'authors/' + app.state.user.uid);
    }
    app.js['firebase_subscribe'] = function(firebasePath, returnRef) {
      if (typeof returnRef === 'undefined') returnRef = false;

      var db = app.state.database;
      var statePath = firebasePath.replace(/\//g, '_');
      var refPath = statePath + '_ref';

      // If state already exists return it
      if (typeof app.state[statePath] !== 'undefined') {
        return (returnRef) ? app.state[refPath] : app.state[statePath];
      }

      // Setup listener
      var valueChanged = function(snapshot) {
        app.setState(function() {
          var value = snapshot.val();
          console.log('data changed', statePath, value);
          app.state[statePath] = value;
        });
      };

      var ref = db.ref().child(firebasePath);
      ref.on('value', valueChanged);

      app.state[statePath] = {};
      app.state[refPath] = ref;

      app.setState(function() {});

      return (returnRef) ? app.state[refPath] : app.state[statePath];
    }
    app.js['firebase_subscribe_limit_last'] = function(limit, firebasePath, returnRef) {
      if (typeof returnRef === 'undefined') returnRef = false;

      var db = app.state.database;
      var statePath = firebasePath.replace(/\//g, '_') + '_last_' + limit;
      var refPath = statePath + '_ref';

      // If state already exists return it
      if (typeof app.state[statePath] !== 'undefined') {
        return (returnRef) ? app.state[refPath] : app.state[statePath];
      }

      // Setup listener
      var valueChanged = function(snapshot) {
        app.setState(function() {
          var value = snapshot.val();
          console.log('data changed', statePath, value);
          app.state[statePath] = value;
        });
      };

      var ref = db.ref().child(firebasePath).limitToLast(limit);
      ref.on('value', valueChanged);

      app.state[statePath] = {};
      app.state[refPath] = ref;

      app.setState(function() {});

      return (returnRef) ? app.state[refPath] : app.state[statePath];
    }
    app.js['firebase_subscribe_limit_first'] = function(limit, firebasePath, returnRef) {
      if (typeof returnRef === 'undefined') returnRef = false;

      var db = app.state.database;
      var statePath = firebasePath.replace(/\//g, '_') + '_first_' + limit;
      var refPath = statePath + '_ref';

      // If state already exists return it
      if (typeof app.state[statePath] !== 'undefined') {
        return (returnRef) ? app.state[refPath] : app.state[statePath];
      }

      // Setup listener
      var valueChanged = function(snapshot) {
        app.setState(function() {
          var value = snapshot.val();
          console.log('data changed', statePath, value);
          app.state[statePath] = value;
        });
      };

      var ref = db.ref().child(firebasePath).limitToFirst(limit);
      ref.on('value', valueChanged);

      app.state[statePath] = {};
      app.state[refPath] = ref;

      app.setState(function() {});

      return (returnRef) ? app.state[refPath] : app.state[statePath];
    }
    app.js['firebase_get'] = function(firebasePath, returnRef) {
      if (typeof returnRef === 'undefined') returnRef = false;

      var db = app.state.database;
      var statePath = firebasePath.replace(/\//g, '_') + '_get';
      var refPath = statePath + '_ref';

      // If state already exists return it
      if (typeof app.state[statePath] !== 'undefined') {
        return (returnRef) ? app.state[refPath] : app.state[statePath];
      }

      // Setup listener
      var valueChanged = function(snapshot) {
        app.setState(function() {
          var value = snapshot.val();
          console.log('data changed', statePath, value);
          app.state[statePath] = value;
        });
      };

      var ref = db.ref().child(firebasePath).limitToFirst(1);
      ref.once('value').then(valueChanged);

      app.state[statePath] = {};
      app.state[refPath] = ref;

      app.setState(function() {});

      return (returnRef) ? app.state[refPath] : app.state[statePath];
    }
    app.js['story_excerpt'] = function(storyId) {
      return null;
    }
    app.methods["7"] = {};
    app.methods["7"]['shouldShow'] = function(scope, attributes) {
      return !app.state.signedIn;
    }
    app.methods["5"] = {};
    app.methods["5"]['shouldShow'] = function(scope, attributes) {
      return app.state.signedIn;
    }
    app.methods["40"] = {};
    app.methods["40"]['handleClick'] = function(scope, attributes) {
      return function(e) {
        app.setState(function() {
          app.state.currentPage = 'home';
        });
      }
    };
    app.methods["41"] = {};
    app.methods["41"]['handleClick'] = function(scope, attributes) {
      return function(e) {
        app.js.story_start();
      }
    };
    app.methods["6"] = {};
    app.methods["6"]['handleClick'] = function(scope, attributes) {
      return function(e) {
        firebase.auth().signOut();
      }
    };

    app.methods["6"]['shouldShow'] = function(scope, attributes) {
      return app.state.signedIn;
    }
    app.methods["26"] = {};
    app.methods["26"]['shouldShow'] = function() {
      return app.state.currentPage === 'home';
    }
    app.methods["43"] = {};
    app.methods["43"]['shouldShow'] = function(scope, attributes) {
      var state = app.js.firebase_subscribe_limit_last(100, 'stories');
      return state === null;
    }
    app.methods["49"] = {};
    app.methods["49"]['repeater'] = function(scope, attributes) {
      var state = app.js.firebase_subscribe_limit_last(100, 'stories');
      return (state === null) ? [] : Object.keys(state);
    };
    app.methods["52"] = {};
    app.methods["52"]['handleClick'] = function(scope, attributes) {
      var key = scope.repeater[scope.repeater_index];
      return function(e) {
        app.setState(function() {
          app.state.currentStory = key;
          app.state.currentPage = 'write';
        });
      }
    };

    app.methods["52"]['getText'] = function(scope, attributes) {
      var key = scope.repeater[scope.repeater_index];
      var state = app.js.firebase_subscribe('stories');
      return state[key].title;
    };
    app.methods["38"] = {};
    app.methods["38"]['shouldShow'] = function() {
      return app.state.currentPage === 'write';
    }
    app.methods["50"] = {};
    app.methods["50"]['getText'] = function(scope, attributes) {
      var state = app.js.firebase_subscribe('stories/' + app.state.currentStory);
      return state.title;
    };
    app.methods["47"] = {};
    app.methods["47"]['repeater'] = function(scope, attributes) {
      var state = app.js.firebase_subscribe('lines/' + app.state.currentStory);
      var keys = Object.keys(state);
      return keys;
    };

    app.methods["47"]['getText'] = function(scope, attributes) {
      var state = app.js.firebase_subscribe('lines/' + app.state.currentStory);
      var key = scope.repeater[scope.repeater_index];
      //console.log('lines state', state);
      return state[key].text;
    };
    app.methods["46"] = {};
    app.methods["46"]['handleChange'] = function(scope, attributes) {
      return function(e) {
        app.setState(function() {
          app.state.currentLine = e.target.value;
        });
      }
    };

    app.methods["46"]['getValue'] = function(scope, attributes) {
      return app.state.currentLine;
    }
    app.methods["46"]['handleKeyDown'] = function(scope, attributes) {
      var comp = this;
      return function(e) {
        var key = e.which,
          ENTER = 13,
          ESCAPE = 27;
        if (key !== ENTER && key !== ESCAPE) return;

        app.setState(function() {
          if (key === ENTER && app.state.currentLine !== '') {
            comp.addLine();
          } else if (key === ESCAPE) {
            app.state.currentLine = '';
          }
        });
      }
    };

    app.methods["46"]['addLine'] = function() {
      var db = app.state.database;

      // add new line
      var newLine = db.ref().child('lines/' + app.state.currentStory).push();
      newLine.set({
        "text": app.state.currentLine,
        "user": app.state.user.uid
      });

      // add to authors
      var newAuthor = db.ref().child('authors/' + app.state.user.uid);
      newAuthor.child(app.state.currentStory).set(true);

      // add to story authors
      var newStoryAuthor = db.ref().child('stories/' + app.state.currentStory + '/authors');
      newStoryAuthor.child(app.state.user.uid).set(true);

      app.setState(function() {
        app.state.currentLine = '';
      });
    }
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
            "id": "socialStoryV_1",
            "key": app.getKey('id', '1')
          }),
          React.createElement('div', app.mergeAttributes('9', scope, {}, {
              "id": "header_9",
              "key": app.getKey('id', '9')
            }),
            React.createElement('div', app.mergeAttributes('10', scope, {}, {
                "id": "brand_10",
                "key": app.getKey('id', '10')
              }),
              React.createElement('span', app.mergeAttributes('22', scope, {}, {
                "id": "label_22",
                "key": app.getKey('id', '22')
              }), ' Social Story'),
              React.createElement('div', app.mergeAttributes('28', scope, {}, {
                "id": "brandSubtitle_28",
                "key": app.getKey('id', '28')
              }), 'collaborative story-telling'))),
          (function(scope) {
            var out = [];
            scope['shouldShow'] = app.methods['7']['shouldShow'](scope);
            if (app.methods['7']['shouldShow'](scope) === true) {
              out.push(React.createElement('div', app.mergeAttributes('7', scope, {}, {
                  "id": "signInContainer_7",
                  "key": app.getKey('id', '7')
                }),
                React.createElement('div', app.mergeAttributes('3', scope, {}, {
                  "id": "firebaseui-auth-container",
                  "key": app.getKey('id', '3')
                }))));
            }
            return out;
          })(scope),
          (function(scope) {
            var out = [];
            scope['shouldShow'] = app.methods['5']['shouldShow'](scope);
            if (app.methods['5']['shouldShow'](scope) === true) {
              out.push(React.createElement('div', app.mergeAttributes('5', scope, {}, {
                  "id": "pages_5",
                  "key": app.getKey('id', '5')
                }),
                React.createElement('div', app.mergeAttributes('39', scope, {}, {
                    "id": "menu_39",
                    "key": app.getKey('id', '39')
                  }),
                  React.createElement('a', app.mergeAttributes('40', scope, {
                    "onClick": "handleClick"
                  }, {
                    "href": "#",
                    "id": "home_40",
                    "key": app.getKey('id', '40')
                  }), 'Home'),
                  React.createElement('a', app.mergeAttributes('41', scope, {
                    "onClick": "handleClick"
                  }, {
                    "href": "#",
                    "id": "startANewStory_41",
                    "key": app.getKey('id', '41')
                  }), 'Start a new story'),
                  (function(scope) {
                    var out = [];
                    scope['shouldShow'] = app.methods['6']['shouldShow'](scope);
                    if (app.methods['6']['shouldShow'](scope) === true) {
                      out.push(React.createElement('a', app.mergeAttributes('6', scope, {
                        "onClick": "handleClick"
                      }, {
                        "href": "#",
                        "id": "signOut_6",
                        "key": app.getKey('id', '6')
                      }), 'Sign-out'));
                    }
                    return out;
                  })(scope)),
                (function(scope) {
                  var out = [];
                  scope['shouldShow'] = app.methods['26']['shouldShow'](scope);
                  if (app.methods['26']['shouldShow'](scope) === true) {
                    out.push(React.createElement('div', app.mergeAttributes('26', scope, {}, {
                        "id": "home_26",
                        "key": app.getKey('id', '26')
                      }),
                      React.createElement('div', app.mergeAttributes('31', scope, {}, {
                          "id": "latestStories_31",
                          "key": app.getKey('id', '31')
                        }),
                        React.createElement('div', app.mergeAttributes('33', scope, {}, {
                          "id": "header_33",
                          "key": app.getKey('id', '33')
                        }), 'Latest stories'),
                        (function(scope) {
                          var out = [];
                          scope['shouldShow'] = app.methods['43']['shouldShow'](scope);
                          if (app.methods['43']['shouldShow'](scope) === true) {
                            out.push(React.createElement('div', app.mergeAttributes('43', scope, {}, {
                              "id": "noLatestStory_43",
                              "key": app.getKey('id', '43')
                            }), '(no latest story)'));
                          }
                          return out;
                        })(scope),
                        (function(scope) {
                          var out = [];
                          var list = scope['repeater'] = app.methods['49']['repeater'](scope);
                          for (var i = 0; i < list.length; i++) {
                            scope['repeater_index'] = i;
                            out.push(React.createElement('div', app.mergeAttributes('49', scope, {}, {
                                "id": "storyList_49",
                                "key": app.getKey('id', '49', i)
                              }),
                              React.createElement('a', app.mergeAttributes('52', scope, {
                                "onClick": "handleClick"
                              }, {
                                "href": "#",
                                "id": "storyLink_52",
                                "key": app.getKey('id', '52')
                              }), app.methods['52']['getText'](scope))));
                          }
                          return out;
                        })(scope)),
                      React.createElement('div', app.mergeAttributes('32', scope, {}, {
                          "id": "about_32",
                          "key": app.getKey('id', '32')
                        }),
                        React.createElement('div', app.mergeAttributes('54', scope, {}, {
                          "id": "instructions_54",
                          "key": app.getKey('id', '54')
                        }), 'Instructions'),
                        React.createElement('ol', app.mergeAttributes('55', scope, {}, {
                            "id": "orderedList_55",
                            "key": app.getKey('id', '55')
                          }),
                          React.createElement('li', app.mergeAttributes('56', scope, {}, {
                            "id": "listItem_56",
                            "key": app.getKey('id', '56')
                          }), 'Create a new story'),
                          React.createElement('li', app.mergeAttributes('62', scope, {}, {
                            "id": "listItem_62",
                            "key": app.getKey('id', '62')
                          }), 'We\'ll start you off with a story title'),
                          React.createElement('li', app.mergeAttributes('58', scope, {}, {
                            "id": "listItem_58",
                            "key": app.getKey('id', '58')
                          }), 'Ask your friends to join in the fun'),
                          React.createElement('li', app.mergeAttributes('59', scope, {}, {
                            "id": "listItem_59",
                            "key": app.getKey('id', '59')
                          }), 'Take turns adding a new line to the story'),
                          React.createElement('li', app.mergeAttributes('60', scope, {}, {
                            "id": "listItem_60",
                            "key": app.getKey('id', '60')
                          }), 'Be sure to leave your lines open-ended (ie. The frog had no pants but he did have...)'),
                          React.createElement('li', app.mergeAttributes('61', scope, {}, {
                            "id": "listItem_61",
                            "key": app.getKey('id', '61')
                          }), 'There\'s no need to refresh the page. All stories and lines are updated immediately.')),
                        React.createElement('div', app.mergeAttributes('34', scope, {}, {
                          "id": "header_34",
                          "key": app.getKey('id', '34')
                        }), 'About'),
                        React.createElement('div', app.mergeAttributes('53', scope, {}, {
                          "id": "aboutText_53",
                          "key": app.getKey('id', '53')
                        }), 'Social Story is a fun way to get creative with your friends. You\'ll each take turns adding a single line to the story. Over time themes will emerge and no one knows where the story will end! It\'s also a great way to escape writers block!'))));
                  }
                  return out;
                })(scope),
                (function(scope) {
                  var out = [];
                  scope['shouldShow'] = app.methods['38']['shouldShow'](scope);
                  if (app.methods['38']['shouldShow'](scope) === true) {
                    out.push(React.createElement('div', app.mergeAttributes('38', scope, {}, {
                        "id": "writeAStory_38",
                        "key": app.getKey('id', '38')
                      }),
                      React.createElement('div', app.mergeAttributes('50', scope, {}, {
                        "id": "title_50",
                        "key": app.getKey('id', '50')
                      }), app.methods['50']['getText'](scope)),
                      (function(scope) {
                        var out = [];
                        var list = scope['repeater'] = app.methods['47']['repeater'](scope);
                        for (var i = 0; i < list.length; i++) {
                          scope['repeater_index'] = i;
                          out.push(React.createElement('div', app.mergeAttributes('47', scope, {}, {
                            "id": "lines_47",
                            "key": app.getKey('id', '47', i)
                          }), app.methods['47']['getText'](scope)));
                        }
                        return out;
                      })(scope),
                      React.createElement('input', app.mergeAttributes('46', scope, {
                        "value": "getValue",
                        "onChange": "handleChange",
                        "onKeyDown": "handleKeyDown"
                      }, {
                        "placeholder": "write next line here (max 120 characters)",
                        "maxLength": "120",
                        "id": "newLine_46",
                        "key": app.getKey('id', '46')
                      }))));
                  }
                  return out;
                })(scope)));
            }
            return out;
          })(scope),
          React.createElement('div', app.mergeAttributes('24', scope, {}, {
              "id": "footer_24",
              "key": app.getKey('id', '24')
            }),
            React.createElement('span', app.mergeAttributes('35', scope, {}, {
              "id": "text_35",
              "key": app.getKey('id', '35')
            }), 'powered by '),
            React.createElement('a', app.mergeAttributes('36', scope, {}, {
              "href": "http://blissui.com",
              "id": "link_36",
              "key": app.getKey('id', '36')
            }), 'bliss ui'))));
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
      app.js.app_init();
      if (window.parent && !window.blissUi) {
        if (window.parent.blissUi) {
          if (window.parent.blissUi.js.reloadSavedState) {
            try {
              window.parent.blissUi.js.reloadSavedState(app)
            } catch (e) {
              console.error('error reloading saved state', e)
            }
          }
        }
      }
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