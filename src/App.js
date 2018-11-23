import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
    // import Clarifai from 'clarifai'
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
// import ImageCard from './components/ImageCard/ImageCard.js'
import CardList from './components/CardList/CardList.js'
      // const app = new Clarifai.App({
      //  apiKey: 'f8150b2572ba4d31923141f490b3cf36'
      // });

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
const intialState = {
      input: '',
      imageUrl:'',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user:     {
        id: '',
        name: '',
        email: '',
        entires: 0,
        joined: '',
        imageList: []
      }
    }
class App extends Component {
  constructor(){
    super();
    this.state = intialState;
  }

  loadUser = (data)=>{
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entires: data.entires,
        joined: data.joined,
        imageList: []
      }
    })
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }


  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange =(event) => {
    this.setState({input: event.target.value})
    // console.log(this.state.input);
  }

  onRouteChange = (route) => {
    if (route === 'signin'){
      this.setState(intialState)
    }
    else if (route === 'home'){
      this.setState({isSignedIn:true})
    }
    else if (route === 'profile'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route});
  }

  onImageUpdate = ()=> {
        fetch('https://immense-savannah-23316.herokuapp.com/profile',{
        method: 'post',
        headers: { 'Content-Type': "application/json"},
        body: JSON.stringify({
          email: this.state.user.email
        })
      })
      .then(res=> res.json())
      // .then(res => console.log(res))
      .then(image => {
      this.setState(
        Object.assign(this.state.user,{imageList:image})
    )
      // console.log(this.set.state.user.imageList)
    })
      .catch(err => console.log(err))
  }

  onButtonSubmit =() => {
        this.setState( {imageUrl: this.state.input});

    fetch('https://immense-savannah-23316.herokuapp.com/image',{
        method: 'put',
        headers: { 'Content-Type': "application/json"},
        body: JSON.stringify({
          id: this.state.user.id
        })
      })
    .then(res => res.json())
    .then(count => {
      this.setState(
        Object.assign(this.state.user,{entires:count})
    )
    })
    .catch(count => console.log(count));


    fetch('https://immense-savannah-23316.herokuapp.com/imageurl',{
        method: 'post',
        headers: { 'Content-Type': "application/json"},
        body: JSON.stringify({
          input: this.state.input
        })
      }).then(response => response.json())
    .then(response=>{
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .then(response => {
      if(response){
          fetch('https://immense-savannah-23316.herokuapp.com/image',
          {
            method: 'put',
            headers: { 'Content-Type': "application/json"},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
        .then(res => res.json())
        .then(count => {
          this.setState(
            Object.assign(this.state.user,{entires:count})
        )
        })
        .catch(count => console.log(count));
        this.setState( {imageUrl: this.state.input});
      }
    })
    .catch(err => console.log(err))

    console.log(this.state.input,'hereeeeee')
    if(this.state.input || this.state.email){
        fetch('https://immense-savannah-23316.herokuapp.com/imageUpdate',{
        method: 'post',
        headers: { 'Content-Type': "application/json"},
        body: JSON.stringify({
          email: this.state.user.email,
          link: this.state.input
    })
    }).then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }
  }

  render() {
    return (
      <div className="App">
        <Particles
          className ='particles'
          params={particles}/>
        <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {this.state.isSignedIn} onImageUpdate = {this.onImageUpdate} />
          {(this.state.route ==='signin')
         ?<SignIn loadUser = {this.loadUser} onRouteChange={this.onRouteChange}/>
         :(
            (this.state.route ==='home')
            ?<div>
             <Logo/>
             <Rank name = {this.state.user.name} entires = {this.state.user.entires}/>
            <ImageLinkForm onInputChange ={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box = {this.state.box} imageUrl = {this.state.imageUrl}/>
          </div>
          :(
              (this.state.route ==='profile')
              ?<div> 
                  <h1>Your image</h1>
                  <CardList imageList = {this.state.user.imageList}/>
              </div>
              :<Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>)
        )
      }
      </div>
    );
  }
}

export default App;
