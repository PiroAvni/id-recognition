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
import SignIn
 from './components/SignIn/SignIn';
import Register
 from './components/Register/Register';

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
      route:'signin',
      isSignedIn:false
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
   onRouteChange = route => {
    if (route === 'signout') {
       this.setState({ isSignedIn: false });
     } else if (route === 'home') {
      this.setState({ isSignedIn: true });
     }
    this.setState({ route });
  };

  render() {
   const { isSignedIn, imageUrl, route, boxes } = this.state;
    return(
      <div className="App">
      <BackgroundParticles />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        <Logo />
          { route === 'home' ? 
          <div>
            <Rank />
            <ImageLinkForm 
              onInputChange ={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
            </div>        
           : (
            route ==='signin'? 
            <SignIn onRouteChange ={this.onRouteChange}/> 
            :
            <Register onRouteChange ={this.onRouteChange}/> 
           )
           
        }
      </div>
    );
  }
}

export default App;
