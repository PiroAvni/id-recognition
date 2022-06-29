import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit})=> {
    return (
       <div className ='Image-Link-Form-Container'>
            <p className ='f3'>
                {'A Face Recognition that can detect faces in your pictures. Give it a Try!'}
            </p>
            <div className='center'>
                <div className=' form center pa4 br3 shadow-5'>
                    <input className =' f4 pa2 w-70 center' type ='text' onChange={onInputChange}/>
                    <button 
                    className='W-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                    onClick = {onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
       </div>
    )
}
export default ImageLinkForm