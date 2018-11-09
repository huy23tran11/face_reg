import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
const app = new Clarifai.App({
 apiKey: '40b88e40d9c2492dbeba93f492b7e271'
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
      imageUrl:'',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputmage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(height,width)
    return {
      leftCol: clarifaiFace.left_col*width,
      topRow: clarifaiFace.top_row*height,
      rightCol: width -(clarifaiFace.right_col*width),
      bottomRow: height- (clarifaiFace.bottom_row*height)
    }
  }

  displayFaceBox = (box) => {
      this.setState( {box: box});
  }

  onInputChange =(event) => {
    this.setState({input: event.target.value})
    // console.log(this.state.input);
  }

  onRouteChange = (route) => {
    if (route === 'signin'){
      this.setState({isSignedIn:false})
    }
    else if (route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route});
  }

  onButtonSubmit =() => {
    this.setState( {imageUrl: this.state.input});
    // console.log(`url: ${this.state.imageUrl}`);
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
                       this.state.input)
    .then(response=>{
      // console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      this.displayFaceBox(this.calculateFaceLocation(response));
      console.log(this.state.box)
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <Particles
          className ='particles'
          params={particles}/>
        <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {this.state.isSignedIn} />
         {(this.state.route ==='signin')
         ?<SignIn onRouteChange={this.onRouteChange}/>
         :(
            (this.state.route ==='home')
            ?<div>
             <Logo />
             <Rank/>
            <ImageLinkForm onInputChange ={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box = {this.state.box} imageUrl = {this.state.imageUrl}/>
          </div>
          :<Register onRouteChange = {this.onRouteChange}/>
        )
      }
      </div>
    );
  }
}

export default App;
