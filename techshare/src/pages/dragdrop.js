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
            // addDropZone(i, addItem, removeItem);
            tempSets.push(items);
            tempCols.push((<Dropzone id={i} add={addItem} remove={removeItem}/>));    
        }
        setCols(tempCols);
        setColSets(tempSets);
        
        function dragMoveListener (event) {
            var target = event.target
            // keep the dragged position in the data-x/data-y attributes
            var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
            var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
        
            // translate the element
            target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
        
            // update the posiion attributes
            target.setAttribute('data-x', x)
            target.setAttribute('data-y', y)
        }
        
        window.dragMoveListener = dragMoveListener

        interact('.dragImg')
        .draggable({
            inertia: true,
            modifiers: [
            interact.modifiers.restrictRect({
                restriction: '.columns',
                endOnly: true
            })
            ],
            autoScroll: false,
            // dragMoveListener from the dragging demo above
            listeners: { move: dragMoveListener }
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

    return<>
        <div className="title">
        <h1>Move the Images</h1>
        </div>
        <div className="columns">
            <div className="col outer title lower-dropzone">
                Column 0
                <div className="imgcols">
                    <div className="imgstack">
                        <img className="dragImg" src="https://static.www.nfl.com/image/private/t_headshot_desktop/league/zdstmm4sloqnichybgja"></img>
                        <img className="dragImg" src="https://static.www.nfl.com/image/private/t_headshot_desktop/league/h9ndf9ralxifgjvot2q4"></img>
                        <img className="dragImg" src="https://static.www.nfl.com/image/private/t_headshot_desktop/league/zdstmm4sloqnichybgja"></img>
                        <img className="dragImg" src="https://static.www.nfl.com/image/private/t_headshot_desktop/league/zdstmm4sloqnichybgja"></img>
                        <img className="dragImg" src="https://static.www.nfl.com/image/private/t_headshot_desktop/league/zdstmm4sloqnichybgja"></img>
                    </div>
                    <div className="imgstack">
                        <img className="dragImg" src="https://static.www.nfl.com/image/private/t_headshot_desktop/league/zdstmm4sloqnichybgja"></img>
                        <img className="dragImg" src="https://static.www.nfl.com/image/private/t_headshot_desktop/league/zdstmm4sloqnichybgja"></img>
                        <img className="dragImg" src="https://static.www.nfl.com/image/private/t_headshot_desktop/league/zdstmm4sloqnichybgja"></img>
                        <img className="dragImg" src="https://static.www.nfl.com/image/private/t_headshot_desktop/league/zdstmm4sloqnichybgja"></img>
                        <img className="dragImg" src="https://static.www.nfl.com/image/private/t_headshot_desktop/league/zdstmm4sloqnichybgja"></img>
                    </div>
                </div>
            </div>
            {cols.map(col => col)}
        </div>
    </>
}