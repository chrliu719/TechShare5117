import {React, useEffect, useState} from 'react'
import interact from 'interactjs';

export default function Dropzone({id, add, remove}) {
  useEffect(() => {
    interact('#dropzone' + id).dropzone({
        // only accept elements matching this CSS selector
        // accept: '#yes-drop',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.75,
        // listen for drop related events:
        
        ondropactivate: function (event) {
            // add active dropzone feedback
            event.target.classList.add('drop-active')
            console.log("?")
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
            remove(event.relatedTarget.getAttribute('src'))
        },
        ondrop: function (event) {
            event.relatedTarget.textContent = 'Dropped'
            add(event.relatedTarget.getAttribute('src'))
        },
        ondropdeactivate: function (event) {
            // remove active dropzone feedback
            event.target.classList.remove('drop-active')
            event.target.classList.remove('drop-target')
        }
    });
  }, []);

  return (
    <div className={"col outer title"} id={"dropzone" + id}>Column {id}</div>
  )
}