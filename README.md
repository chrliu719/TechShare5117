# TechShare5117
Link to [Demo](https://youtube.com/).
## Drag and Drop
When we call interact, we can pass in a CSS selector for the class, and since we made all the images in this dragImg we pass in the dragImg class
Then to make it draggable we call .draggable, and here we can specify properties and restrictions of our draggable elements

```
interact('.dragImg')
        .draggable({
            ...
        })
```
```
interact('.dragImg')
        .draggable({
            modifiers: [
                // restrict elements to only stay within elements with the class columns
                // endOnly means this restriction is enacted when the event (ie. dragging) is done
                interact.modifiers.restrictRect({
                    restriction: '.columns',
                    endOnly: true
                })
            ],
            autoScroll: false,
            // listner that is called when the element is dragged
            listeners: { move: dragMoveListener }
        })
```
## Resizing
## Adding Drop Zones

