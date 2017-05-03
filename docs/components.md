# Components

## React Components

- dom elements (with event listeners)
- props (data, procedures)
- state (data, procedures)

## How can this be represented in data?

- I had the idea of adding dynamic dom elements

## How do I support dynamic elements?

- use case:
  - display a list of clickable components
  - on click, show the properties of the component

- the element will be determined at runtime
- the element can be defined in the component tree
- how can we reference the element from code?
- add type to element? (static, dynamic)
- if static, render on the screen
- need event to kick of render
- need data to give to the render method
- does it make sense to have a repeater element?
- if dynamic, don't render on screen but create
  javascript to render it
- dynamic elements need dom events just like normal elements

- render
- loops through all components
  - find components that have dom changes, add to queue
  - update dom elements with items in queue
  - invalidate / repaint tree/sub-tree

  - use case:
    - two screens:
      - list of books
      - book info: author, pages, release date
    - event: add book
    - repaint

Dynamic Component:
  - conditions
  - repeated
  - definition
  - selector for element
    - change attribute
    - change text
