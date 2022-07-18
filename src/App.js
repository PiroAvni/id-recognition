
import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/Signin";
import Register from "./components/Register/Register";
import BackgroundParticles from "./components/Background/Background";
import "./App.css";
import { Component } from "react";



const initialSate ={
    input: "",
    imageUrl: "",
    boxes: [],
    route: "signin",
    isSignedIn: false,
    user: {
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: "",
    
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = initialSate;
    };

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions.map(
      (region) => region.region_info.bounding_box
    );
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return clarifaiFaces.map((face) => {
      return {
        topRow: height * face.top_row,
        leftCol: width * face.left_col,
        bottomRow: height - height * face.bottom_row,
        rightCol: width - width * face.right_col,
      }
    })
  }
  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://obscure-beach-29482.herokuapp.com/imageUrl', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
        
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://obscure-beach-29482.herokuapp.com:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log(err));
    }
  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialSate);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route });
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
        <BackgroundParticles />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        <Logo />
        {route === "home" ? 
          <div>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div>
         : (
          route === "signin" 
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}
          />
        )
      }
      </div>
    );
  }
}

export default App;
