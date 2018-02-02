# To-do

```javascript
// if fresh state, then skip all below
// determine how to get app name
var appName = 'app_name'
var prevApp = document.getElementById('preview').contentWindow[appName]
var prevState = {}
try { prevState = JSON.parse(JSON.stringify(prevApp.state)) } catch(e){}
// change the iframe src
// sometime after iframe loads
// get new reference to app
var prevApp = document.getElementById('preview').contentWindow[appName]
prevApp.setState(function() {
  Object.keys(prevState).forEach(function(key) {
    prevApp.state[key] = state[key]
  })
})
prevApp = null
prevState = null
```
