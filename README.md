# Bliss Core

Painless Front-end Design & Development

## Todo

- bug: render problems with deeply nested tree structure
- bug: tree menu fixed position
- bug: tree scroll in right place

- bug: remove color picker from properties (move to experiments project json)
- bug: scroll bliss-tree horizontally
- feature: global css editor
- feature: edit css selectors and properties (missing selectors)
- bug: on bliss page load, dependencies are missing

## Done Today

- bug: delete always collapsed
- bug: delete always went to parent
- bug: clone component is shallow and causes bugs
- improvement: collapse tree on load

## Backlog

- improvement: auto-save project
- improvement: reload deps on packages update
- improvement: electron, move workspace to documents
- feature: list projects pane
- feature: theme layout
- feature: theme colors (dark gray-blue, gray-white text)
- feature: import HTML

## Roadmap

- Open project (open components from a project)
- New UI Theme
- Feature: Build Environment (npm packages)
- Feature: Zoom, focus on one component and children
- Feature: Endpoint Mocks (with functions for dynamic data)

## Ideas to Explore

- Compile to Angular
- Feature: Upgrade Project (uses the new project json)

## Recently Completed Todos

- use bootstrap to make basic layout for app
- 3 column layout in bootstrap (preview, tree, properties)
- javascript functions
- support invoke property
- link external css
- link external javascript
- add support for preprocessors
- write javascript and convert to string
- display a simple list of components
- wrap all functions in an anonymous function so as to not pollute the namespace
- functional properties panel
- Feature: Preview App
- lib/tree seed
- lib/state seed
- produce app.css & app.js and reference in html document instead of inline
- move component methods from tree into separate file
- renderIf: ""
- repeatOn: ""
- events: {}
- Feature: React UI Builder
- project js to: { "name": "function name(a, b, c) {body...}"}
- add global javascript
- Feature: Component Navigation Tree
- build project json for design mode (ajax request to server)
- add iframe component
- Make a list of known html elements and if element isn't one of them use a global reference instead
- Integrate bliss-tree
- remove events from project file
- remove component.events from compiler
- rename attributesFn to dynamicAttributes in project file
- move dynamic.textFn to textFn
- move and rename dynamic.repeatOn to repeatFn
- move and rename dynamic.renderIf to ifFn
- refactor compiler for mergeAttributes
- add global css
- add css for react compiler
- add design mode (only building bliss)
- Feature: Rearrange components (up, down)
- Feature: Load & Save Project
- Feature: Properties Editor
- rename workspace to project names
- generic properties editor (bliss-properties)
- put json files in `components` dir
- move `export` dir to `compiled` dir
- npm management (read json, write package.json, install deps)
