import React, { Component } from 'react';
import './App.css';
import Navigation from '../Components/Navigation';
import Logo from '../Components/Logo';
import ImageLinkForm from '../Components/ImageLinkForm.js';
import Rank from '../Components/Rank';
import Particles from 'react-particles-js';

const particleOptions = {
  particles: {
    number: {
      value:50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: ''
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('click');
  }

  render() {
    return (
      <div className='App'>
        <Particles className='particles'
          params={ particleOptions }
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={ this.onInputChange }
          onButtonSubmit={ this.onButtonSubmit }
        />
        {/*<FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
