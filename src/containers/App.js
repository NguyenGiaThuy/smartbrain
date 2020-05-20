import React, { Component } from 'react';
import './App.css';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo.js';
import ImageLinkForm from '../components/ImageLinkForm.js';
import Rank from '../components/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from '../components/FaceRecognition.js';
import Registration from '../components/SignIn';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const particleOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const app = new Clarifai.App({
  apiKey: '4ee9902dcb2645e0a3a0b87de420b50f'
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'sign-in',
      signedIn: false
    }
  }

  calculateFaceLocation = (response) => {
    console.log(response);
    console.log(response.outputs);
    const clarifaiFaces = response.outputs[0].data.regions.map(region => region.region_info.bounding_box);
    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input-image');
    const width = Number(image.clientWidth);
    const height = Number(image.clientHeight);

    const boxes = clarifaiFaces.map(clarifaiFace => {
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    });

    return boxes;
  }

  onInputChanged = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmitted = () => {
    this.setState({ boxes: [] });
    this.setState({ imageUrl: this.state.input });

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        const faceBoxes = this.calculateFaceLocation(response);
        this.setState({ boxes: faceBoxes });
      });
  }

  onKeyPressed = (event) => {
    if (event.key === "Enter")
      this.onButtonSubmitted();
  }

  onRouteChanged = (route) => {
    if (route === 'sign-up' || route === 'sign-in')
      this.setState({ signedIn: false });
    else
      this.setState({ signedIn: true });

    this.setState({ route: route });
  }

  render() {
    const {
      imageUrl,
      boxes,
      route,
      signedIn
    } = this.state;
    return (
      <div className='App'>
        <Particles 
          className='particles' 
          params={ particleOptions } />
        <Navigation 
          onRouteChanged={ this.onRouteChanged } 
          signedIn={ signedIn } />
        { route === 'sign-in'
          ?
            <SignIn onRouteChanged={ this.onRouteChanged } />
          : ( route === 'sign-up'
            ?
              <SignUp onRouteChanged={ this.onRouteChanged } />
            : <div>
                <Logo />
                <Rank />
                <ImageLinkForm 
                  onInputChanged={ this.onInputChanged } 
                  onButtonSubmitted={ this.onButtonSubmitted }
                  onKeyPressed={ this.onKeyPressed } />
                <FaceRecognition 
                  imageUrl={ imageUrl } 
                  boxes={ boxes } />
              </div>
            )
        }
      </div>
    );
  }
}

export default App;
