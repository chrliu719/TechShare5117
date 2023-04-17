import {React, useEffect, useState} from 'react'
import Dropzone from './dropzone'
import interact from 'interactjs';

export default function Home() {
    const [colSets, setColSets] = useState([])
    const [cols, setCols] = useState([]);
    const numCols = 3;

    useEffect(() => {
        let tempCols = []
        let tempSets = []
        for(let i = 1; i <= numCols; i++){
            let items = new Set();
            const addItem = item =>{
                items.add(item)
            }
        
            const removeItem = item =>{
                items.delete(item)
            }
            tempSets.push(items);
            tempCols.push((<Dropzone id={i} add={addItem} remove={removeItem}/>));    
        }
        
        setCols(tempCols);
        setColSets(tempSets);
        
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
        
        window.dragMoveListener = dragMoveListener

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
        .resizable({
            // resize from all edges and corners
            edges: { left: true, right: true, bottom: true, top: true },
        
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
            modifiers: [      
              // minimum size
              interact.modifiers.restrictSize({
                min: { width: 70, height: 70 }
              })
            ],
          })

        interact('.lower-dropzone').dropzone({
            // only accept elements matching this CSS selector
            // accept: '#yes-drop',

            // Require a 75% element overlap for a drop to be possible
            overlap: 0.75,

            // listen for drop related events:
            ondropactivate: function (event) {
                // add active dropzone feedback
                event.target.classList.add('drop-active')
            },
            ondragenter: function (event) {
                var draggableElement = event.relatedTarget
                var dropzoneElement = event.target
            
                // feedback the possibility of a drop
                dropzoneElement.classList.add('drop-target')
                draggableElement.classList.add('can-drop')
                draggableElement.textContent = 'Dragged in'
            },
            ondragleave: function (event) {
                // remove the drop feedback style
                event.target.classList.remove('drop-target')
                event.relatedTarget.classList.remove('can-drop')
                event.relatedTarget.textContent = 'Dragged out'
            },
            ondrop: function (event) {
                event.relatedTarget.textContent = 'Dropped'
            },
            ondropdeactivate: function (event) {
                // remove active dropzone feedback
                event.target.classList.remove('drop-active')
                event.target.classList.remove('drop-target')
            }
        });
    }, []);
//style={{transform:"translate(0px," + id * 110 + "px)"}}
    const images = ["https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4383351.png&w=350&h=254", "https://static.www.nfl.com/image/private/t_headshot_desktop/league/h9ndf9ralxifgjvot2q4", "https://b.fssta.com/uploads/application/nfl/headshots/13985.png",
    "https://static.www.nfl.com/image/private/t_headshot_desktop/league/vs40h82nvqaqvyephwwu", "https://static.www.nfl.com/image/private/t_headshot_desktop/league/hdwbdlyiose4znenx5ed" ]
    return<>
        <div className="title">
        <h1>Move the Images</h1>
        </div>
        <div className="columns">
            <div className="col outer title lower-dropzone">
                Column 0 
                <br></br>
                {images.map((image, idx) =>
                    (<img class="dragImg" src={image} style={{transform:"translate(0px," + idx * 145 + "px)"}}/>))}
            </div>
            {cols.map(col => col)}
        </div>
    </>
}