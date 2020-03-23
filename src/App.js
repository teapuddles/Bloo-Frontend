import React from 'react';
import LoginForm from './components/LoginForm.js';
import RegisterForm from './components/RegisterForm.js'
import NavBar from './components/NavBar.js';
import ProfileContainer from './components/ProfileContainer.js'
import './App.css';
import {Switch, Route} from 'react-router-dom';
import 'react-piano/dist/styles.css';
import PianoHelper from './PianoComponents/PianoHelper.js'
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
  token: ""
}

componentDidMount() {
  if (localStorage.getItem("token")) {

    fetch(`http://localhost:3000/persist`, {
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
      .then(r => r.json())
      .then(this.handleResp)
  }
  fetch(`http://localhost:3000/keys`)
  .then(r => r.json())
  .then(pitches => this.setState({
    key: {
      allkeys: [...this.state.key.allkeys, ...pitches]
    }
  }))
}


handleResponse = (response) => {
  if (response.user) {
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
  console.log(newSong)
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

render(){
  // console.log(this.state.key)
  return (
    <div className="App">
      <NavBar/>
      <Switch>
      <Route path="/login" render={() => <LoginForm handleCurrentUser={this.handleCurrentUser} />} />
      <Route path="/register" render={() => <RegisterForm handleCurrentUser={this.handleCurrentUser} />} />
      <Route path="/profile" render={() => <ProfileContainer username={localStorage.username} deleteSong={this.deleteSong} songList={this.state.user.songList}/>} />
      <Route path="/piano" render={() => <PianoHelper username={localStorage.username} pitches={this.state.key}/> }/>
      <Route path="/findpitch" render={() => <KeyComponent username={localStorage.username} pitches={this.state.key} addSongToList={this.addSongToList}/>} />
      </Switch>
    </div>
  );
}
}

export default withRouter(App)
