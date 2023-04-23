import {React, useEffect, useState} from 'react'
import interact from 'interactjs';

export default function Dropzone({id, add, remove, images}) {
  const [title, setTitle] = useState("Column " + id)
  useEffect(() => {
    interact('#dropzone' + id)
      .dropzone({
        /// Require a 75% element overlap for a drop to be possible
        
        //overlap: 0.75,

        /// Event Handlers
        /// Called when a droppable element enters the drop zone
        
        // ondragenter: function (event) {
        //     var dropzoneElement = event.target
        //     // highlight the object can be dropped in this column
        //     dropzoneElement.classList.add('drop-target')
        // },

        /// Called when a droppable element leaves the drop zone
        
        // ondragleave: function (event) {
        //     // unhighlight the column
        //     event.target.classList.remove('drop-target')

        //     // remove the dragged element from the column's set of images if in the set
        //     remove(event.relatedTarget.getAttribute('src'))
        // },

        /// Called when a droppable element is dropped in the zone

        // ondrop: function (event) {
        //     /// unhighlight the column
        //     event.target.classList.remove('drop-target')

        //     /// add the dropped element to the column's set of images
        //     add(event.relatedTarget.getAttribute('src'))
        // },
    });
  }, []);
  
  return (
    <div className={"col outer title"} id={"dropzone" + id}>
      <input className={"col_input"} type="text" value={title} placeholder={"Column " + id} onChange={(e) => setTitle(e.target.value)}/><br></br><br></br>
      {images.map((image, idx) => {
                    const yOffset = idx * 145
                    return (<img class="dragImg" src={image} style={{transform:"translate(0px," + yOffset + "px)"}} data-y={yOffset}/>)
      })}
    </div>
  )
}