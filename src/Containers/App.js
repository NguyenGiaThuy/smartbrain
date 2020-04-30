import React from 'react';
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

function App() {
  return (
    <div className='App'>
      <Particles className='particles'
        params={particleOptions}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/*<FaceRecognition />*/}
    </div>
  );
}

export default App;
