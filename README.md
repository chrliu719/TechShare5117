# TechShare5117
Link to [Demo](https://benevolent-sprinkles-8db20d.netlify.app).
## Selecting Interactables and Interactions
First we must place all of our interactjs codeinside the UseEffect hook.\
Then we select all the objects that we want to make interactable so we select pass in the CSS class selector ".dragImg" and then add the interaction we want.<br /> 
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
The part of interact thats both a blessing and a curse is that you have to define your own event handlers to move the object.<br />
### Draggable Listener
There are other listeners available such as onEnd.
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
We use this new x and y position to update the transform of the element and then save this x and y for future events.<br />

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
            edges: { left: true, right: true, bottom: true, top: true },
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
First off it is important to not that the property edges which is specific to resizing functionality is needed to make resizing images work. <br />
Now we add an event handler for when an object is resized which follows a similar format to the one for dragging.\
We get the element being resized and store it in target and then retrieve its x and y position.\
We use the event object which has attributes, one of which tells us what the new width and height of our resized element should be which we set to our target element's width and height.\
Then we adjust our x and y position based on if the top of the left edge was moved during resizing<br />
Then just like for dragging an object, we change its translate to the new x and y as well as record that x and y for future use\

### Properties and Modifiers
It was briefly mentioned already but there are properties that are specific to each interaction that can be enabled or disabled to change the interaction.<br />
For resizing this property was edges which determines which edges can be used to resize an image. You can also add Modifiers to customize your interactions. <br />
For example to prevent an issue with making images resized to too big or too small we add a restrictSize modifier where we can specify a max width and height as well as a min width and height for our images when we resize.
```javascript
.resizable({
                // resize from all edges and corners
                edges: { left: true, right: true, bottom: true, top: true },
            
                listeners: {
                    ...
                },
                modifiers: [      
                    // minimum size
                    interact.modifiers.restrictSize({
                        min: { width: 70, height: 70 }
                    })
                ],
            })
```
Now if we go back to draggable we can modify our behavior there as well. First we enable the autoScroll property which will move the page when trying to drag an item off the screen. Then we can add a modifier to keep our draggable elements within a certain region of the page.<br />
For this we pass the css class selector .columns to restrict the region to the columns on our page. The end only attribute means that the modifier is only applied at the end of our dragging event and not during. <br /> Now our draggable functionality is modified on the page.
```javascript
modifiers: [
                    // restrict elements to only stay within elements with the class columns
                    // endOnly means this restriction is enacted when the event (ie. dragging) is done
                    interact.modifiers.restrictRect({
                        restriction: '.columns',
                        endOnly: true
                    })
                ],
                autoScroll: true,
                // listener that is called when the element is dragged
                listeners: {
                    ...
                    } 
                }
         })
 ```

## Adding Drop Zones

We create the dropzone component to represent our columns, with each dropzone having the CSS class of "dropzone{id}" where id is just the index of the column. Each dropzone component has a set corresponding to the images currently dropped in the column, and also has props add and remove that perform those actions to the column's set. In the useEffect, we begin by calling interact with our CSS specicier of ".dropzone{id}" to make the specific column interactable with the dropzone action.

```javascript
interact('#dropzone' + id)
      .dropzone({
        ...
})
```

This interactable element only needs listeners, and we have 3 to handle different actions associated with dragging and dropping images. First we look at the ```ondragenter`` event that occurs when a draggable image is dragged over the column. In this event, the column the image is dragged over will gain the CSS class ```drop-target```, which just changes the background color of the column to indicate the image is currently dragged over that column.

```javascript
ondragenter: function (event) {
    var dropzoneElement = event.target
    // highlight the object can be dropped in this column
    dropzoneElement.classList.add('drop-target')
}
```

Next, we have ondragleave, which occurs when an image is dragged out of a column. When the element is dragged out, the ```drop-target``` class is removed to unhighlight the column and the image is also removed from the column's set of images if it is there.

```javascript
ondragleave: function (event) {
    // unhighlight the column
    event.target.classList.remove('drop-target')

    // remove the dragged element from the column's set of images if in the set
    remove(event.relatedTarget.getAttribute('src'))
}
```

Lastly, we have the event ondrop, which occurs when the image is dropped in the column. Here our listener unhighlights the column and then adds the dropped image into the set.

```javascript
ondrop: function (event) {
    // unhighlight the column
    event.target.classList.remove('drop-target')

    // add the dropped element to the column's set of images
    add(event.relatedTarget.getAttribute('src'))
}
```

Putting everything together, the last interact call looks like:

```javascript
interact('#dropzone' + id)
      .dropzone({
        /// Event Handlers
        // Called when a droppable element enters the drop zone
        
        ondragenter: function (event) {
            var dropzoneElement = event.target
            // highlight the object can be dropped in this column
            dropzoneElement.classList.add('drop-target')
        },

        // Called when a droppable element leaves the drop zone
        ondragleave: function (event) {
            // unhighlight the column
            event.target.classList.remove('drop-target')

            // remove the dragged element from the column's set of images if in the set
            remove(event.relatedTarget.getAttribute('src'))
        },

        // Called when a droppable element is dropped in the zone
        ondrop: function (event) {
            // unhighlight the column
            event.target.classList.remove('drop-target')

            // add the dropped element to the column's set of images
            add(event.relatedTarget.getAttribute('src'))
        },
    });
```
