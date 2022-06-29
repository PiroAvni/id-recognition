import React from 'react';
import Tilt from 'react-parallax-tilt'
import './Logo.css';
import facerecognition from './face-recognition.png'

const Logo = ()=> {
   return (
      <div className=' logo-container ma4 mt0 center'>
         <Tilt
            className="parallax-effect-glare-scale br2 shadow-2"
            perspective={500}
            glareEnable={true}
            glareMaxOpacity={0.45}
            scale={1.02}
            style={{ height: '135px', width: '125px', backgroundImage:'./face-recognition.png'}}>
            <div className= 'Tilt-inner '>
            <img  alt=' Face Recognition Logo' src={facerecognition} height= {100} width= {120}/> <h1 className='logo-title fw6 f6'>Face-Recognition </h1>
            </div>   
         </Tilt>

      </div>
   )
}
export default Logo