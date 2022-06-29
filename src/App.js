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
      boxes:[],
    }
  }
  calculateFaceLocation =(data)=>{
   const clarifaiFaces = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);
   const image = document.getElementById('inputimage');
   const width = Number(image.width);
   const height = Number(image.height);
   
   return clarifaiFaces.map(face => {
    return {
      topRow: height * face.top_row,
      leftCol: width * face.left_col,
      bottomRow: height -(height * face.bottom_row),
      rightCol: width -(width * face.right_col)
    }
   });
  }
  displayFaceBox =(boxes) =>{
    this.setState({boxes: boxes})
  }
  onInputChange = (event)=>{
    this.setState({input: event.target.value})

  }
  
    onButtonSubmit = () => {
      this.setState({ imageUrl: this.state.input })
      app.models
        .predict(
          Clarifai.FACE_DETECT_MODEL,
          this.state.input)
        .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log(err));
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
        <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
