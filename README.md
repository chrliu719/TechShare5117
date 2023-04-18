# TechShare5117
Link to [Demo](https://youtube.com/).
## Drag and Drop
When we call interact, we can pass in a CSS selector for the class, and since we made all the images in this dragImg we pass in the dragImg class
Then to make it draggable we call .draggable

```
interact('.dragImg')
        .draggable({
            ...
        })
```
inside .draggable here we can specify properties and restrictions of our draggable elements\
We wouldn’t want our images to get dragged off the screen and lost, and we’d like them to stay within the category columns 
So, we add modifiers(restrictions on different actions such as dragging or resizing) the restrictRect modifier and restrict the elements to stay within elements with the class columns\
The aditional attribute endOnly means that this restriction is only applied at the end of the action, which in this case is whenever we let go of the element we’re dragging

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
            <span style="color:blue">
            autoScroll: false,
            // listner that is called when the element is dragged
            listeners: { move: dragMoveListener }
            </span>
        })
```
## Resizing
## Adding Drop Zones

