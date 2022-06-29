import React from 'react';
import Navigation
 from './components/Navigation/Navigation';
import Logo
 from './components/Logo/Logo';
import ImageLinkForm
 from './components/ImageLinkForm/ImageLinkForm';
import Rank
 from './components/Rank/Rank';
import FaceRecognition
 from './components/FaceRecognition/FaceRecognition';

import BackgroundParticles from './components/Background/Background';

import './App.css';
import { Component } from 'react';
import { render } from '@testing-library/react';
import Clarifai from 'clarifai';


const app = new Clarifai.App({
  apiKey: '15f1011b3b5e44a6891374c957bc3808',
 });
class App extends Component{
  constructor(){
    super()
    this.state = {
      input:'',
      imageUrl:'',
    }
  }

  onInputChange = (event)=>{
  this.setState({input: event.target.value})

  }
  
    onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    
    app.models
   .predict(
   Clarifai.FACE_DETECT_MODEL,
   // THE JPG
   this.state.input)
   .then((response) => {
    console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
   })
   .catch((err) => {
    console.log(err);
   });
   };    
  render() {
    return(
      <div className="App">
      <BackgroundParticles />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
        onInputChange ={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
