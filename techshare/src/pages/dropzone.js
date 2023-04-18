import {React, useEffect, useState} from 'react'
import interact from 'interactjs';

export default function Dropzone({id, add, remove, images}) {
  useEffect(() => {
    interact('#dropzone' + id).dropzone({
        // only accept elements matching this CSS selector
        // accept: '#yes-drop',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.75,
        // listen for drop related events:
        
        // Called when a droppable element is dragged
        ondropactivate: function (event) {
            // add active dropzone feedback
            event.target.classList.add('drop-active')
        },
        // Called when a droppable element enters the drop zone
        ondragenter: function (event) {
            var draggableElement = event.relatedTarget
            var dropzoneElement = event.target
        
            // feedback the possibility of a drop
            dropzoneElement.classList.add('drop-target')
            draggableElement.classList.add('can-drop')
        },
        // Called when a droppable element leaves the drop zone
        ondragleave: function (event) {
            // remove the drop feedback style
            event.target.classList.remove('drop-target')
            event.relatedTarget.classList.remove('can-drop')
            remove(event.relatedTarget.getAttribute('src'))
        },
        // Called when a droppable element is dropped in the zone
        ondrop: function (event) {
            event.relatedTarget.textContent = 'Dropped'
            add(event.relatedTarget.getAttribute('src'))
        },
        // Called when a droppable element is let go of
        ondropdeactivate: function (event) {
            // remove active dropzone feedback
            event.target.classList.remove('drop-active')
            event.target.classList.remove('drop-target')
        }
    });
  }, []);

  return (
    <div className={"col outer title"} id={"dropzone" + id}>
      Column {id} <br></br>
      {images.map((image, idx) => {
                    const yOffset = idx * 145
                    return (<img class="dragImg" src={image} style={{transform:"translate(0px," + yOffset + "px)"}} data-y={yOffset}/>)
      })}
    </div>
  )
}