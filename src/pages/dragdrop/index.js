import {React, useEffect, useState} from 'react'
import Dropzone from '@/components/dropzone';
import interact from 'interactjs';
import { useRouter } from 'next/router'


export default function Home() {
	const router = useRouter()
    const [colSets, setColSets] = useState([])
    const [cols, setCols] = useState([]);

	function handleClick () {
		const query = {}
		const colNameElements = document.getElementsByClassName("col_input")
		const colNames = []

		for (var i = 0; i < colSets.length; i++){
			colNames.push(colNameElements[i].value)
			query[colNameElements[i].value] = Array.from(colSets[i])
		}
		query['colNames'] = colNames
		console.log(query)
		router.push({
			pathname: "/save",
			query: query
		})
	}

    useEffect(() => {
        if(router.isReady){
            const query = router.query
            console.log("Query params", router.query)
            const numCols = query["num"];
            const images = query["imgs"]
            let tempCols = []
            let tempSets = []
            for(let i = 0; i < numCols; i++){
                let items = new Set();

                // Add images to the first column's set
                if(i == 0){
                    images.map(image => items.add(image));
                }

                const addItem = item =>{
                    items.add(item)
                }
            
                const removeItem = item =>{
                    items.delete(item)
                }
                
                tempSets.push(items);

                // Add images to first  column
                if(i == 0){
                    tempCols.push((<Dropzone id={i} add={addItem} remove={removeItem} images={images}/>));    
                } 
                else {
                    tempCols.push((<Dropzone id={i} add={addItem} remove={removeItem} images={[]}/>));
                }
            }
            
            setCols(tempCols);
            setColSets(tempSets);

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
                autoScroll: true,
                // listener that is called when the element is dragged
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
        }
    }, [router.isReady]);
    
    return<>
        <div className="title">
        <h1>Move the Images</h1>
        </div>
        <div className="columns">
            {cols.map(col => col)}
        </div>
        <button onClick={handleClick}>Save</button>
    </>
}