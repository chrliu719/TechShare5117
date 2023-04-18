# TechShare5117
Link to [Demo](https://youtube.com/).
## Drag and Drop
When we call interact, we can pass in a CSS selector for the class, and since we made all the images in this dragImg we pass in the dragImg class
Then to make it draggable we call .draggable.

```javascript
interact('.dragImg')
        .draggable({
            ...
        })
```
inside .draggable here we can specify properties and restrictions of our draggable elements.\
We wouldn’t want our images to get dragged off the screen and lost, and we’d like them to stay within the category columns. So, we add modifiers(restrictions on different actions such as dragging or resizing) the restrictRect modifier and restrict the elements to stay within elements with the class columns.\
The aditional attribute endOnly means that this restriction is only applied at the end of the action, which in this case is whenever we let go of the element we’re dragging.\
Another aspect to point out is to prevent the object from scrolling the page around when we go to the boudaries, we set autoScroll to false.

```javascript
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
            listeners: { move: dragMoveListener }
        })
```
Now we need to actually make our objects move.\
The part of interact thats both a blessing and a curse is that you have to define your own event handlers to move the object.\
In this case, we need to write a function to handle the move event when the object is dragged, and we do this with the function dragMoveListener.\
The event object passed into this function gives us information about the elements involved in the event.
```javascript
function dragMoveListener (event) {
            // target is the element being interacted with
            var target = event.target
            // Get the current data-x and data-y
            // First time interacting with an object these won't exist so we start with 0
            // Add the change in x and y that this dragging event caused
            var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
            var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

            // translate the element
            target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
        
            // set data-x and data-y for future use
            target.setAttribute('data-x', x)
            target.setAttribute('data-y', y)
        }
```
Walking through this function, the target is the element being interacted with.\
To find where we need to move the object, we take the previous x-y position if there is one, and add it to the change in x and y recorded by the event.\
We use this new x and y position to update the transform of the element and then save this x and y for future events.\\

So, now we can drag our images around, but this one looks a little thin, it’d be nice if we could resize it.
## Resizing
## Adding Drop Zones

