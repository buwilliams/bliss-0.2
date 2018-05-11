var blissProject = {
  "name": "Social Story v2",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 64,
  "rootId": "1",
  "externalCss": [
    "https://cdn.firebase.com/libs/firebaseui/2.1.1/firebaseui.css",
    "node_modules/font-awesome/css/font-awesome.css",
    "https://fonts.googleapis.com/css?family=Playfair+Display|Pacifico|Rammetto+One|Supermercado+One"
  ],
  "externalJs": [
    "node_modules/react/dist/react.js",
    "node_modules/react-dom/dist/react-dom.js",
    "https://www.gstatic.com/firebasejs/4.1.1/firebase.js",
    "https://cdn.firebase.com/libs/firebaseui/2.1.1/firebaseui.js",
    "node_modules/jquery/dist/jquery.min.js"
  ],
  "state": {},
  "packages": [
    {
      "name": "react",
      "version": "15.4.2"
    },
    {
      "name": "react-dom",
      "version": "15.4.2"
    },
    {
      "name": "font-awesome",
      "version": "4.7.0"
    },
    {
      "name": "jquery",
      "version": "3.2.1"
    }
  ],
  "js": [
    {
      "name": "app_init",
      "body": "function() {\n  // Initialize Firebase\n  // TODO: Replace with your project's customized code snippet\n  var config = {\n    apiKey: \"AIzaSyCrI98bKkMT3FFgbB5WaRWJoXpzFAu3cfA\",\n    authDomain: \"personal-budget-6f3af.firebaseapp.com\",\n    databaseURL: \"https://personal-budget-6f3af.firebaseio.com\",\n    storageBucket: \"personal-budget-6f3af.appspot.com\"\n  };\n  \n  firebase.initializeApp(config);\n  \n  app.setState(function() {\n    app.state.signedIn = false;\n    app.state.ui = null;\n    app.state.user = null;\n    app.state.currentPage = 'home';\n    app.state.database = firebase.database();\n    app.state.auth = firebase.auth();\n    app.state.storage = firebase.storage();\n    app.state.currentStory = null;\n    app.state.currentLine = \"\";\n  });\n  \n  app.setState(function() {\n  \tapp.js.auth_changed();\n  });\n  \n  window.app = app;\n}"
    },
    {
      "name": "auth_init",
      "body": "function(scope, attributes) {\n  var uiConfig = {\n    callbacks: {\n      signInSuccess: function(currentUser, credential, redirectUrl) {\n        //app.setState(function() {\n          //app.state.signedIn = true;\n        \t//app.state.user = user;\n        //});\n        return false;\n      },\n      uiShown: function() {\n        // The widget is rendered.\n        // Hide the loader.\n        //console.log('show element');\n      }\n    },\n    signInSuccessUrl: window.location.href,\n    signInOptions: [\n      // Leave the lines as is for the providers you want to offer your users.\n      //firebase.auth.GoogleAuthProvider.PROVIDER_ID,\n      firebase.auth.FacebookAuthProvider.PROVIDER_ID\n      //firebase.auth.PhoneAuthProvider.PROVIDER_ID\n    ],\n    // Terms of service url.\n    tosUrl: window.location.href\n  };\n\n  var ui;\n  if(app.state.ui === null) {\n    // Initialize the FirebaseUI Widget using Firebase.\n    ui = new firebaseui.auth.AuthUI(firebase.auth());\n    app.setState(function() {\n      app.state.ui = ui;\n    });\n  } else {\n    ui = app.state.ui;\n    ui.reset();\n  }\n  \n  // The start method will wait until the DOM is loaded.\n  ui.start('#firebaseui-auth-container', uiConfig);\n}"
    },
    {
      "name": "auth_changed",
      "body": "function() {\n  app.state.auth.onAuthStateChanged(function(user) {\n    if(user) {\n      //console.log('authStatus user', user);\n      app.setState(function() {\n        app.state.signedIn = true;\n        app.state.user = user;\n        app.js.story_home();\n      });\n    } else {\n      //console.log('user not logged in');\n      app.setState(function() {\n        app.state.user = null;\n        app.state.signedIn = false;\n      });\n      \n      app.setState(function() {\n        app.js.auth_init();\n      });\n    }\n  });\n}"
    },
    {
      "name": "story_start",
      "body": "function(storyId) {\n  var createStory = function(title, first_line) {\n    var db = app.state.database;\n\n    // create new story\n    var newStory = db.ref().child('stories').push();\n    newStory.set({\"title\": title});\n    newStory.child('authors').child(app.state.user.uid).set(true);\n\n    // create author\n    var newAuthor = db.ref().child('authors')\n                            .child(app.state.user.uid)\n                            .child(newStory.key)\n                            .set(true);\n\n    // create first line\n    var newLine = db.ref().child('lines')\n    .child(newStory.key)\n    .push()\n    .set({\n      \"text\": first_line,\n      \"user\": app.state.user.uid\n    });\n\n    app.js.firebase_subscribe('lines/'+newStory.key);\n\n    app.setState(function() {\n      app.state.currentPage = 'write';\n      app.state.currentStory = newStory.key;\n    });\n  };\n  \n  var url = 'https://talaikis.com/api/quotes/random/'\n  \n  $.get(url, function(data) {\n    createStory(data.quote, data.quote);\n  });\n}"
    },
    {
      "name": "story_home",
      "body": "function() {\n  // listen for stories, update state\n  app.js.firebase_subscribe('stories');\n  \n  app.js.firebase_subscribe_limit_last(100, 'stories');\n  app.js.firebase_subscribe_limit_last(100, 'authors/'+app.state.user.uid);\n}"
    },
    {
      "name": "firebase_subscribe",
      "body": "function(firebasePath, returnRef) {\n  if(typeof returnRef === 'undefined') returnRef = false;\n  \n  var db = app.state.database;\n  var statePath = firebasePath.replace(/\\//g, '_');\n  var refPath = statePath + '_ref';\n  \n  // If state already exists return it\n  if(typeof app.state[statePath] !== 'undefined') {\n    return (returnRef) ? app.state[refPath] : app.state[statePath];\n  }\n  \n  // Setup listener\n  var valueChanged = function(snapshot) {\n    app.setState(function() {\n      var value = snapshot.val();\n      console.log('data changed', statePath, value);\n      app.state[statePath] = value;\n    });\n  };\n  \n  var ref = db.ref().child(firebasePath);\n  ref.on('value', valueChanged);\n  \n  app.state[statePath] = {};\n  app.state[refPath] = ref;\n  \n  app.setState(function(){});\n  \n  return (returnRef) ? app.state[refPath] : app.state[statePath];\n}"
    },
    {
      "name": "firebase_subscribe_limit_last",
      "body": "function(limit, firebasePath, returnRef) {\n  if(typeof returnRef === 'undefined') returnRef = false;\n  \n  var db = app.state.database;\n  var statePath = firebasePath.replace(/\\//g, '_') + '_last_' + limit;\n  var refPath = statePath + '_ref';\n  \n  // If state already exists return it\n  if(typeof app.state[statePath] !== 'undefined') {\n    return (returnRef) ? app.state[refPath] : app.state[statePath];\n  }\n  \n  // Setup listener\n  var valueChanged = function(snapshot) {\n    app.setState(function() {\n      var value = snapshot.val();\n      console.log('data changed', statePath, value);\n      app.state[statePath] = value;\n    });\n  };\n  \n  var ref = db.ref().child(firebasePath).limitToLast(limit);\n  ref.on('value', valueChanged);\n  \n  app.state[statePath] = {};\n  app.state[refPath] = ref;\n  \n  app.setState(function(){});\n  \n  return (returnRef) ? app.state[refPath] : app.state[statePath];\n}"
    },
    {
      "name": "firebase_subscribe_limit_first",
      "body": "function(limit, firebasePath, returnRef) {\n  if(typeof returnRef === 'undefined') returnRef = false;\n  \n  var db = app.state.database;\n  var statePath = firebasePath.replace(/\\//g, '_') + '_first_' + limit;\n  var refPath = statePath + '_ref';\n  \n  // If state already exists return it\n  if(typeof app.state[statePath] !== 'undefined') {\n    return (returnRef) ? app.state[refPath] : app.state[statePath];\n  }\n  \n  // Setup listener\n  var valueChanged = function(snapshot) {\n    app.setState(function() {\n      var value = snapshot.val();\n      console.log('data changed', statePath, value);\n      app.state[statePath] = value;\n    });\n  };\n  \n  var ref = db.ref().child(firebasePath).limitToFirst(limit);\n  ref.on('value', valueChanged);\n  \n  app.state[statePath] = {};\n  app.state[refPath] = ref;\n  \n  app.setState(function(){});\n  \n  return (returnRef) ? app.state[refPath] : app.state[statePath];\n}"
    },
    {
      "name": "firebase_get",
      "body": "function(firebasePath, returnRef) {\n  if(typeof returnRef === 'undefined') returnRef = false;\n  \n  var db = app.state.database;\n  var statePath = firebasePath.replace(/\\//g, '_') + '_get';\n  var refPath = statePath + '_ref';\n  \n  // If state already exists return it\n  if(typeof app.state[statePath] !== 'undefined') {\n    return (returnRef) ? app.state[refPath] : app.state[statePath];\n  }\n  \n  // Setup listener\n  var valueChanged = function(snapshot) {\n    app.setState(function() {\n      var value = snapshot.val();\n      console.log('data changed', statePath, value);\n      app.state[statePath] = value;\n    });\n  };\n  \n  var ref = db.ref().child(firebasePath).limitToFirst(1);\n  ref.once('value').then(valueChanged);\n  \n  app.state[statePath] = {};\n  app.state[refPath] = ref;\n  \n  app.setState(function(){});\n  \n  return (returnRef) ? app.state[refPath] : app.state[statePath];\n}"
    },
    {
      "name": "story_excerpt",
      "body": "function(storyId) {\n  return null;\n}"
    }
  ],
  "cssVars": [
    {
      "name": "medium",
      "value": "#d1784a"
    },
    {
      "name": "light",
      "value": "#eeeeee"
    },
    {
      "name": "dark",
      "value": "#454545"
    },
    {
      "name": "links",
      "value": "#2d4931"
    },
    {
      "name": "lightFontColor",
      "value": "#eeeeee"
    },
    {
      "name": "darkFontColor",
      "value": "#333"
    },
    {
      "name": "font1",
      "value": "'Supermercado One', cursive"
    },
    {
      "name": "font2",
      "value": "'Pacifico', cursive"
    },
    {
      "name": "font3",
      "value": "'Playfair Display', serif"
    }
  ],
  "css": [
    {
      "selector": "body",
      "properties": [
        {
          "name": "margin",
          "value": "0"
        },
        {
          "name": "padding",
          "value": "0"
        },
        {
          "name": "font-family",
          "value": "$font3"
        },
        {
          "name": "font-size",
          "value": "12pt"
        },
        {
          "name": "color",
          "value": "$darkFontColor"
        },
        {
          "name": "background-color",
          "value": "$light"
        }
      ]
    },
    {
      "selector": "a",
      "properties": [
        {
          "name": "color",
          "value": "$darkFontColor"
        }
      ]
    },
    {
      "selector": "*",
      "properties": [
        {
          "name": "box-sizing",
          "value": "border-box"
        }
      ]
    },
    {
      "selector": "a.subnav.active",
      "properties": [
        {
          "name": "background-color",
          "value": "$dark"
        },
        {
          "name": "color",
          "value": "$lightFontColor"
        }
      ]
    },
    {
      "selector": "a.subnav",
      "properties": [
        {
          "name": "padding",
          "value": "3px 10px"
        },
        {
          "name": "font-size",
          "value": "10pt"
        },
        {
          "name": "border-radius",
          "value": "15px"
        },
        {
          "name": "margin",
          "value": "0 5px"
        },
        {
          "name": "color",
          "value": "$darkFontColor"
        }
      ]
    },
    {
      "selector": "a.subnav:hover",
      "properties": [
        {
          "name": "background-color",
          "value": "$dark"
        },
        {
          "name": "color",
          "value": "$lightFontColor"
        }
      ]
    }
  ],
  "load": [
    "app_init"
  ],
  "components": {
    "1": {
      "id": "1",
      "name": "Social Story v2",
      "element": "div",
      "text": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "9",
      "parent": null
    },
    "3": {
      "id": "3",
      "name": "Firebase Sign-in",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "id",
          "value": "firebaseui-auth-container"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "position",
              "value": "relative"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "7"
    },
    "5": {
      "id": "5",
      "name": "Pages",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": "shouldShow",
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "width",
              "value": "90%"
            },
            {
              "name": "position",
              "value": "relative"
            },
            {
              "name": "margin",
              "value": "0 auto"
            },
            {
              "name": "background-color",
              "value": "$light"
            },
            {
              "name": "border-bottom-left-radius",
              "value": "4px"
            },
            {
              "name": "border-bottom-right-radius",
              "value": "4px"
            },
            {
              "name": "padding",
              "value": "10px 15px 60px 15px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "shouldShow",
          "body": "function(scope, attributes) {\n  return app.state.signedIn;\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": "24",
      "previous": "7",
      "child": "39",
      "parent": "1"
    },
    "6": {
      "id": "6",
      "name": "Sign-out",
      "element": "a",
      "text": "Sign-out",
      "textFn": null,
      "ifFn": "shouldShow",
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-left",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  return function(e) {\n    firebase.auth().signOut();\n  }\n};\n"
        },
        {
          "name": "shouldShow",
          "body": "function(scope, attributes) {\n  return app.state.signedIn;\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": null,
      "previous": "41",
      "child": null,
      "parent": "39"
    },
    "7": {
      "id": "7",
      "name": "Sign-in Container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": "shouldShow",
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "position",
              "value": "relative"
            },
            {
              "name": "width",
              "value": "50%"
            },
            {
              "name": "margin",
              "value": "20px auto 0 auto"
            },
            {
              "name": "border-width",
              "value": "1px"
            },
            {
              "name": "border-style",
              "value": "solid"
            },
            {
              "name": "border-color",
              "value": "$dark"
            },
            {
              "name": "clear",
              "value": "both"
            },
            {
              "name": "background-color",
              "value": "$light"
            },
            {
              "name": "border-radius",
              "value": "3px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "shouldShow",
          "body": "function(scope, attributes) {\n  return !app.state.signedIn;\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": "5",
      "previous": "9",
      "child": "3",
      "parent": "1"
    },
    "9": {
      "id": "9",
      "name": "Header",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "font-size",
              "value": "30pt"
            },
            {
              "name": "background-image",
              "value": "url(https://sleepycoffeeandfables.files.wordpress.com/2014/11/img_6794.jpg)"
            },
            {
              "name": "height",
              "value": "300px"
            },
            {
              "name": "background-size",
              "value": "cover"
            },
            {
              "name": "border-bottom",
              "value": "solid 3px #333"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "7",
      "previous": null,
      "child": "10",
      "parent": "1"
    },
    "10": {
      "id": "10",
      "name": "Brand",
      "element": "div",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "text-align",
              "value": "center"
            },
            {
              "name": "padding",
              "value": "15px"
            },
            {
              "name": "color",
              "value": "$lightFontColor"
            },
            {
              "name": "background-color",
              "value": "rgba(15, 13, 10, 0.5)"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "22",
      "parent": "9"
    },
    "22": {
      "id": "22",
      "name": "label",
      "element": "span",
      "text": " Social Story",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "font-family",
              "value": "'Supermercado One', cursive"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "28",
      "previous": null,
      "child": null,
      "parent": "10"
    },
    "24": {
      "id": "24",
      "name": "Footer",
      "element": "div",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "text-align",
              "value": "center"
            },
            {
              "name": "margin",
              "value": "10px 0"
            },
            {
              "name": "font-size",
              "value": "8pt"
            },
            {
              "name": "text-transform",
              "value": "uppercase"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "5",
      "child": "35",
      "parent": "1"
    },
    "26": {
      "id": "26",
      "name": "Home",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": "shouldShow",
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "shouldShow",
          "body": "function() {\n  return app.state.currentPage === 'home';\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": "38",
      "previous": "39",
      "child": "31",
      "parent": "5"
    },
    "28": {
      "id": "28",
      "name": "Brand subtitle",
      "element": "div",
      "text": "collaborative story-telling",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "color",
              "value": "$lightFontColor"
            },
            {
              "name": "font-size",
              "value": "14pt"
            },
            {
              "name": "text-align",
              "value": "center"
            },
            {
              "name": "font-family",
              "value": "'Pacifico', cursive"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "22",
      "child": null,
      "parent": "10"
    },
    "31": {
      "id": "31",
      "name": "Latest stories",
      "element": "div",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-top",
              "value": "30px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "32",
      "previous": null,
      "child": "33",
      "parent": "26"
    },
    "32": {
      "id": "32",
      "name": "About",
      "element": "div",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "31",
      "child": "54",
      "parent": "26"
    },
    "33": {
      "id": "33",
      "name": "Header",
      "element": "div",
      "text": "Latest stories",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "border-bottom-color",
              "value": "$darkFontColor"
            },
            {
              "name": "border-bottom-width",
              "value": "2px"
            },
            {
              "name": "border-bottom-style",
              "value": "solid"
            },
            {
              "name": "font-weight",
              "value": "bold"
            },
            {
              "name": "font-family",
              "value": "$font1"
            },
            {
              "name": "font-size",
              "value": "1.5em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "43",
      "previous": null,
      "child": null,
      "parent": "31"
    },
    "34": {
      "id": "34",
      "name": "Header",
      "element": "div",
      "text": "About",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "border-bottom-color",
              "value": "$darkFontColor"
            },
            {
              "name": "border-bottom-width",
              "value": "2px"
            },
            {
              "name": "border-bottom-style",
              "value": "solid"
            },
            {
              "name": "margin-bottom",
              "value": "10px"
            },
            {
              "name": "margin-top",
              "value": "30px"
            },
            {
              "name": "font-family",
              "value": "$font1"
            },
            {
              "name": "font-size",
              "value": "1.5em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "53",
      "previous": "55",
      "child": null,
      "parent": "32"
    },
    "35": {
      "id": "35",
      "name": "text",
      "element": "span",
      "text": "powered by ",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "36",
      "previous": null,
      "child": null,
      "parent": "24"
    },
    "36": {
      "id": "36",
      "name": "link",
      "element": "a",
      "text": "bliss ui",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "http://blissui.com"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "35",
      "child": null,
      "parent": "24"
    },
    "38": {
      "id": "38",
      "name": "Write a story",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": "shouldShow",
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-top",
              "value": "20px"
            },
            {
              "name": "text-align",
              "value": "center"
            },
            {
              "name": "font-size",
              "value": "16pt"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "shouldShow",
          "body": "function() {\n  return app.state.currentPage === 'write';\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": null,
      "previous": "26",
      "child": "50",
      "parent": "5"
    },
    "39": {
      "id": "39",
      "name": "Menu",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "text-align",
              "value": "center"
            },
            {
              "name": "position",
              "value": "absolute"
            },
            {
              "name": "top",
              "value": "-91px"
            },
            {
              "name": "width",
              "value": "100%"
            }
          ]
        },
        {
          "selector": "$id a",
          "properties": [
            {
              "name": "background-color",
              "value": "#af1f23"
            },
            {
              "name": "text-decoration",
              "value": "none"
            },
            {
              "name": "padding",
              "value": "10px 20px"
            },
            {
              "name": "border-radius",
              "value": "5px"
            },
            {
              "name": "color",
              "value": "#ffffff"
            },
            {
              "name": "box-shadow",
              "value": "4px 4px 2px -2px rgba(0,0,0,0.4);"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "26",
      "previous": null,
      "child": "40",
      "parent": "5"
    },
    "40": {
      "id": "40",
      "name": "Home",
      "element": "a",
      "text": "Home",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#"
        }
      ],
      "css": [],
      "js": [
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.setState(function() {\n      app.state.currentPage = 'home';\n    });\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": "41",
      "previous": null,
      "child": null,
      "parent": "39"
    },
    "41": {
      "id": "41",
      "name": "Start a new story",
      "element": "a",
      "text": "Start a new story",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-left",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.js.story_start();\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": "6",
      "previous": "40",
      "child": null,
      "parent": "39"
    },
    "43": {
      "id": "43",
      "name": "No latest story",
      "element": "div",
      "text": "(no latest story)",
      "textFn": null,
      "ifFn": "shouldShow",
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-top",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "shouldShow",
          "body": "function(scope, attributes) {\n  var state = app.js.firebase_subscribe_limit_last(100, 'stories');\n  return state === null;\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": "49",
      "previous": "33",
      "child": null,
      "parent": "31"
    },
    "46": {
      "id": "46",
      "name": "new line",
      "element": "input",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "placeholder",
          "value": "write next line here (max 120 characters)"
        },
        {
          "name": "maxLength",
          "value": "120"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "border",
              "value": "none"
            },
            {
              "name": "width",
              "value": "50%"
            },
            {
              "name": "padding",
              "value": "10px"
            },
            {
              "name": "margin-top",
              "value": "10px"
            },
            {
              "name": "outline",
              "value": "none"
            },
            {
              "name": "font-size",
              "value": "16pt"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleChange",
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.setState(function() {\n      app.state.currentLine = e.target.value;\n    });\n  }\n};\n"
        },
        {
          "name": "getValue",
          "body": "function(scope, attributes) {\n  return app.state.currentLine;\n}"
        },
        {
          "name": "handleKeyDown",
          "body": "function(scope, attributes) {\n  var comp = this;\n  return function(e) {\n    var key = e.which, ENTER = 13, ESCAPE = 27;\n    if(key !== ENTER && key !== ESCAPE) return;\n    \n    app.setState(function() {\n      if(key === ENTER && app.state.currentLine !== '') {\n        comp.addLine();\n      } else if(key === ESCAPE) {\n        app.state.currentLine = '';\n      }\n    });\n  }\n};\n"
        },
        {
          "name": "addLine",
          "body": "function() {\n  var db = app.state.database;\n  \n  // add new line\n  var newLine = db.ref().child('lines/'+app.state.currentStory).push();\n  newLine.set({\"text\": app.state.currentLine, \"user\": app.state.user.uid});\n  \n  // add to authors\n  var newAuthor = db.ref().child('authors/'+app.state.user.uid);\n  newAuthor.child(app.state.currentStory).set(true);\n  \n  // add to story authors\n  var newStoryAuthor = db.ref().child('stories/'+app.state.currentStory+'/authors');\n  newStoryAuthor.child(app.state.user.uid).set(true);\n  \n  app.setState(function() {\n    app.state.currentLine = '';\n  });\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "value",
          "value": "getValue"
        },
        {
          "name": "onChange",
          "value": "handleChange"
        },
        {
          "name": "onKeyDown",
          "value": "handleKeyDown"
        }
      ],
      "next": null,
      "previous": "47",
      "child": null,
      "parent": "38"
    },
    "47": {
      "id": "47",
      "name": "lines",
      "element": "div",
      "text": null,
      "textFn": "getText",
      "ifFn": null,
      "repeatFn": "repeater",
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "repeater",
          "body": "function(scope, attributes) {\n  var state = app.js.firebase_subscribe('lines/'+app.state.currentStory);\n  var keys = Object.keys(state);\n  return keys;\n};\n"
        },
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  var state = app.js.firebase_subscribe('lines/'+app.state.currentStory);\n  var key = scope.repeater[scope.repeater_index];\n  //console.log('lines state', state);\n  return state[key].text;\n};\n"
        }
      ],
      "dynamicAttributes": [],
      "next": "46",
      "previous": "50",
      "child": null,
      "parent": "38"
    },
    "49": {
      "id": "49",
      "name": "Story list",
      "element": "div",
      "text": "",
      "textFn": "",
      "ifFn": null,
      "repeatFn": "repeater",
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-top",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "repeater",
          "body": "function(scope, attributes) {\n  var state = app.js.firebase_subscribe_limit_last(100, 'stories');\n  return (state === null) ? [] : Object.keys(state);\n};\n"
        }
      ],
      "dynamicAttributes": [],
      "next": null,
      "previous": "43",
      "child": "52",
      "parent": "31"
    },
    "50": {
      "id": "50",
      "name": "title",
      "element": "div",
      "text": null,
      "textFn": "getText",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "text-decoration",
              "value": "underline"
            },
            {
              "name": "font-weight",
              "value": "bold"
            },
            {
              "name": "margin-bottom",
              "value": "30px"
            },
            {
              "name": "margin-top",
              "value": "30px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  var state = app.js.firebase_subscribe('stories/'+app.state.currentStory);\n  return state.title;\n};\n"
        }
      ],
      "dynamicAttributes": [],
      "next": "47",
      "previous": null,
      "child": null,
      "parent": "38"
    },
    "52": {
      "id": "52",
      "name": "Story link",
      "element": "a",
      "text": "",
      "textFn": "getText",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#"
        }
      ],
      "css": [],
      "js": [
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  var key = scope.repeater[scope.repeater_index];\n  return function(e) {\n    app.setState(function() {\n      app.state.currentStory = key;\n      app.state.currentPage = 'write';\n    });\n  }\n};\n"
        },
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  var key = scope.repeater[scope.repeater_index];\n  var state = app.js.firebase_subscribe('stories');\n  return state[key].title;\n};"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "49"
    },
    "53": {
      "id": "53",
      "name": "About Text",
      "element": "div",
      "text": "Social Story is a fun way to get creative with your friends. You'll each take turns adding a single line to the story. Over time themes will emerge and no one knows where the story will end! It's also a great way to escape writers block!",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "34",
      "child": null,
      "parent": "32"
    },
    "54": {
      "id": "54",
      "name": "Instructions",
      "element": "div",
      "text": "Instructions",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "font-weight",
              "value": "bold"
            },
            {
              "name": "margin-top",
              "value": "30px"
            },
            {
              "name": "border-bottom",
              "value": "solid 2px"
            },
            {
              "name": "border-bottom-color",
              "value": "$darkFontColor"
            },
            {
              "name": "font-family",
              "value": "$font1"
            },
            {
              "name": "font-size",
              "value": "1.5em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "55",
      "previous": null,
      "child": null,
      "parent": "32"
    },
    "55": {
      "id": "55",
      "name": "ordered list",
      "element": "ol",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "padding-left",
              "value": "20px"
            },
            {
              "name": "margin-top",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "34",
      "previous": "54",
      "child": "56",
      "parent": "32"
    },
    "56": {
      "id": "56",
      "name": "list item",
      "element": "li",
      "text": "Create a new story",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "62",
      "previous": null,
      "child": null,
      "parent": "55"
    },
    "58": {
      "id": "58",
      "name": "list item",
      "element": "li",
      "text": "Ask your friends to join in the fun",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "59",
      "previous": "62",
      "child": null,
      "parent": "55"
    },
    "59": {
      "id": "59",
      "name": "list item",
      "element": "li",
      "text": "Take turns adding a new line to the story",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "60",
      "previous": "58",
      "child": null,
      "parent": "55"
    },
    "60": {
      "id": "60",
      "name": "list item",
      "element": "li",
      "text": "Be sure to leave your lines open-ended (ie. The frog had no pants but he did have...)",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "61",
      "previous": "59",
      "child": null,
      "parent": "55"
    },
    "61": {
      "id": "61",
      "name": "list item",
      "element": "li",
      "text": "There's no need to refresh the page. All stories and lines are updated immediately.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "60",
      "child": null,
      "parent": "55"
    },
    "62": {
      "id": "62",
      "name": "list item",
      "element": "li",
      "text": "We'll start you off with a story title",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "58",
      "previous": "56",
      "child": null,
      "parent": "55"
    }
  },
  "pageTitle": "Social Story",
  "filename": "index"
}
if(typeof module !== "undefined") module.exports = blissProject;
