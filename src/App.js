import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
const app = new Clarifai.App({
 apiKey: '20c75e570394466aa003dd611cf73608'
});
const particles = {
                particles: {
                  line_linked: {
                    shadow: {
                      enable: true,
                      color: "#3CA9D1",
                      blur: 5
                    }
                  }
                }
              }

class App extends Component {
  constructor(){
    super();
    this.state ={
      input: '',
    }
  }
  onInputChange =(event) => {
    console.log(event.target.value);
  }

  onButtonSubmit =() => {
    console.log('click');
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      console.log(response)
    },
    function(err) {
      console.log('no fucking face')
    }
  );
  }

  render() {
    return (
      <div className="App">
        <Particles
          className ='particles'
          params={particles}/>
         <Navigation />
         <Logo />
         <Rank/>
        <ImageLinkForm onInputChange ={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        {/*<FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
