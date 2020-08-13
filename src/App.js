import React from 'react';
import LoginForm from './components/LoginForm.js';
import RegisterForm from './components/RegisterForm.js'
import NavBar from './components/NavBar.js';
import ProfileContainer from './components/ProfileContainer.js'
import './App.css';
import {Switch, Route} from 'react-router-dom';
import 'react-piano/dist/styles.css';
import './semantic/dist/semantic.css';
import MapContainer from './components/MapContainer.js';
// import PianoHelper from './PianoComponents/PianoHelper.js'
import KeyComponent from './KeyComponents/KeyComponent.js'

import {withRouter} from 'react-router-dom';

class App extends React.Component{

state = {
  user: {
    songList: [],
    username: "",
    id: 0
  },
  key: {
    allkeys: []
  },
  token: "",
  location: ""
}

componentDidMount() {
  if (localStorage.getItem("token")) {

    fetch(`https://ancient-mesa-98163.herokuapp.com/persist`, {
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
      .then(r => r.json())
      .then(this.handleResp)
  }
  fetch(`https://ancient-mesa-98163.herokuapp.com/keys`)
  .then(r => r.json())
  .then(pitches => this.setState({
    key: {
      allkeys: [...this.state.key.allkeys, ...pitches]
    }
  }))
}


handleResponse = (response) => {
  if (response.user) {
      console.log(response.user)
      localStorage.username = response.user.username
      localStorage.token = response.token
      this.setState(response, () => {
          this.props.history.push("/profile")
      })
  }
}

  //set username to current user
  handleCurrentUser = (newUsername) => {
    this.setState({
        username: newUsername
    })
}

addSongToList = newSong => {
  // fetch(`http://localhost:3000/users/${this.user.id}`, {
  //   method: "POST",
  //   headers: {
  //     "content-type": "application/json"
  //   },
  //   body: JSON.stringify(newSong)
  // })
  // .then(r => r.json())
  // .then(newSong => 
this.setState({
    user: {
      songList: [...this.state.user.songList, newSong]
    }
  })
}


deleteSong = (songId) => {
  const removedSong = this.state.user.songList.findIndex(song => song === songId)
  console.log(removedSong)
  let newSongList = this.state.user.songList
  newSongList.splice(removedSong, 1)
  this.setState({
    songList: newSongList
  })
}

// maps functions
setLocation = () => {
  let map 
  let infoWindow 
  let currentPos = navigator.geolocation
  if (currentPos) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    });
  }
}


render(){
  // console.log(this.state.key)
  return (
    <div className="App">
      <NavBar/>
      <Switch>
      <Route path="/login" render={() => <LoginForm handleCurrentUser={this.handleCurrentUser} />} />
      <Route path="/register" render={() => <RegisterForm handleCurrentUser={this.handleCurrentUser} />} />
      <Route path="/profile" render={() => <ProfileContainer username={localStorage.username} deleteSong={this.deleteSong} songList={this.state.user.songList}/>} />
      {/* <Route path="/piano" render={() => <PianoHelper username={localStorage.username} pitches={this.state.key}/> }/> */}
      <Route path="/findpitch" render={() => <KeyComponent username={localStorage.username} pitches={this.state.key} addSongToList={this.addSongToList}/>} />
      <Route path="/findplace" render={() => <MapContainer start={this.setLocation}/>}/>
      </Switch>
    </div>
  );
}
}

export default withRouter(App)
