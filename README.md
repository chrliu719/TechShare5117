# TechShare5117
Link to [Demo](https://youtube.com/).
## Selecting Interactables and Interactions
First we must place all of our interactjs codeinside the UseEffect hook.\
Then we select all the objects that we want to make interactable so we select pass in the CSS class selector ".dragImg" (show html??) and then add the interaction we want.<br /> 
In this case we want to make our elements draggable<br />
```javascript
interact('.dragImg')
        .draggable({
            ...
        })
```
Let's say we want our images to be resizeable we would instead do <br />
```javascript
interact('.dragImg')
        .resizable({
            ...
        })
```
For our demo we would like to have both so we do
```javascript
interact('.dragImg')
        .draggable({
            ...
        })
        .resizable({
            ...
        })
```
## Listeners
Now we need to actually make our objects move when dragged.\
The part of interact thats both a blessing and a curse is that you have to define your own event handlers to move the object.\
### Draggable Listener
There are different listeners available such as onEnd.
However, In this case, we need to write a function to handle the move event when the object is being moved, and we do this with the function dragMoveListener.\
The event object passed into this function gives us information about the elements involved in the drag event.<br />
```javascript
interact('.dragImg')
        .draggable({
            ...
            listeners: {
                move: function dragMoveListener (event) {
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
            }
        })
        .resizable({
            ...
        })
```

Walking through this function, the target is the element being interacted with.\
To find where we need to move the object, we take the previous x-y position if there is one, and add it to the change in x and y recorded by the event.\
We use this new x and y position to update the transform of the element and then save this x and y for future events.

So, now we can drag our images around, but this one looks a little thin, it’d be nice if we could resize it. <br />
To do this we need to create our resizeable interaction listener.
### Resizeable listener
```javascript
interact('.dragImg')
        .draggable({
            ...
            listeners: {
                    ...
            }
        })
        .resizable({
            ...
            listeners: {
                move: function (event) {
                        // target is the element being interacted with
                        var target = event.target
                        // Get the current data-x and data-y
                        // First time interacting with an object these won't exist so we start with 0
                        var x = (parseFloat(target.getAttribute('data-x')) || 0)
                        var y = (parseFloat(target.getAttribute('data-y')) || 0)
                
                        // update the width and height of the element
                        // event.rect is an object with information about the new dimensions
                        target.style.width = event.rect.width + 'px'
                        target.style.height = event.rect.height + 'px'
                
                        // translate when resizing from top or left edges
                        // if resizing from the top or left, we need to change where the top left corner of the element is
                        // as well as resize it
                        x += event.deltaRect.left
                        y += event.deltaRect.top
                
                        // set the transform with the calculated values
                        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'
                
                        // set data-x and data-y for future use
                        target.setAttribute('data-x', x)
                        target.setAttribute('data-y', y)
                    }
            }
        })
        
```
Now we add an event handler for when an object is resized which follows a similar format to the one for dragging.\
We get the element being resized and store it in target and then retrieve its x and y position.\
We use the event object which has attributes, one of which tells us what the new width and height of our resized element should be which we set to our target element's width and height.\
Then just like for dragging an object, we change its translate to the new x and y as well as record that x and y for future use\

## Drag and Drop
First we must place all of our interactjs codeinside the UseEffect hook.\n
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
We use this new x and y position to update the transform of the element and then save this x and y for future events.

So, now we can drag our images around, but this one looks a little thin, it’d be nice if we could resize it.
## Resizing
We can make our draggable images resizable as well by adding the resizable action\
The edges attribute allows us to select which corners and edges we can resize from and we just enable all resizing options\
We also add another modifier to restrict the size of our images when resizing. In this case we add a minimum height and width.
```javascript
interact('.dragImg')
        .draggable({
            ...
        })
        .resizable({
            // resize from all edges and corners
            edges: { left: true, right: true, bottom: true, top: true },
            modifiers: [      
                // minimum size
                interact.modifiers.restrictSize({
                  min: { width: 70, height: 70 }
                })
            ],
            ...
            
          })
```
Now we add an event handler for when an object is resized which follows a similar format to the one for dragging.\
We get the element being resized and store it in target and then retrieve its x and y position.\
We use the event object which has attributes, one of which tells us what the new width and height of our resized element should be which we set to our target element's width and height.\
Then just like for dragging an object, we change its translate to the new x and y as well as record that x and y for future use\

```javascript
interact('.dragImg')
        .draggable({
            ...
        })
        .resizable({
            // resize from all edges and corners
            edges: ... ,
            modifiers: [      
                ...
            ],
            listeners: {
              move (event) {
                // target is the element being interacted with
                var target = event.target
                // Get the current data-x and data-y
                // First time interacting with an object these won't exist so we start with 0
                var x = (parseFloat(target.getAttribute('data-x')) || 0)
                var y = (parseFloat(target.getAttribute('data-y')) || 0)
        
                // update the width and height of the element
                // event.rect is an object with information about the new dimensions
                target.style.width = event.rect.width + 'px'
                target.style.height = event.rect.height + 'px'
        
                // translate when resizing from top or left edges
                // if resizing from the top or left, we need to change where the top left corner of the element is
                // as well as resize it
                //x += event.deltaRect.left
                //y += event.deltaRect.top
        
                // set the transform with the calculated values
                target.style.transform = 'translate(' + x + 'px,' + y + 'px)'
        
                // set data-x and data-y for future use
                target.setAttribute('data-x', x)
                target.setAttribute('data-y', y)
              }
            },
            
          })
```
Now we have to fix one issue. If we try and resize from the top or left edges because currently the the elements are resizing in place.\
To fix this we uncomment the lines x += event.deltaRect.left and y += event.deltaRect.top.\ 
Now we are adjusting the x and y positions of an element(using information from the event) taking into account if the top or left edges are adjusted. 
```javascript
interact('.dragImg')
        .draggable({
            ...
        })
        .resizable({
            // resize from all edges and corners
            edges: { left: true, right: true, bottom: true, top: true },
            modifiers: [      
                // minimum size
                interact.modifiers.restrictSize({
                  min: { width: 70, height: 70 }
                })
            ],
            listeners: {
              move (event) {
                // target is the element being interacted with
                var target = event.target
                // Get the current data-x and data-y
                // First time interacting with an object these won't exist so we start with 0
                var x = (parseFloat(target.getAttribute('data-x')) || 0)
                var y = (parseFloat(target.getAttribute('data-y')) || 0)
        
                // update the width and height of the element
                // event.rect is an object with information about the new dimensions
                target.style.width = event.rect.width + 'px'
                target.style.height = event.rect.height + 'px'
        
                // translate when resizing from top or left edges
                // if resizing from the top or left, we need to change where the top left corner of the element is
                // as well as resize it
                x += event.deltaRect.left
                y += event.deltaRect.top
        
                // set the transform with the calculated values
                target.style.transform = 'translate(' + x + 'px,' + y + 'px)'
        
                // set data-x and data-y for future use
                target.setAttribute('data-x', x)
                target.setAttribute('data-y', y)
              }
            },
            
          })
```
Now we are going to create zones where we can drag our images to to record which column they are in.
## Adding Drop Zones

