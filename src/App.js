import React from 'react';
import LoginForm from './components/LoginForm.js';
import RegisterForm from './components/RegisterForm.js'
import NavBar from './components/NavBar.js';
import ProfileContainer from './ProfileContainer.js'
import './App.css';
import {Switch, Route} from 'react-router-dom';
import 'react-piano/dist/styles.css';
import PianoHelper from './PianoComponents/PianoHelper.js'



import {withRouter} from 'react-router-dom';

class App extends React.Component{

state = {
  user: {
    songs: [],
    username: "",
    id: 0
  },
  keys: {
    pitch: []
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

render(){
  return (
    <div className="App">
      <NavBar/>
      <Switch>
      <Route path="/login" render={() => <LoginForm handleCurrentUser={this.handleCurrentUser} />} />
      <Route path="/register" render={() => <RegisterForm handleCurrentUser={this.handleCurrentUser} />} />
      <Route path="/profile" render={() => <ProfileContainer username={localStorage.username} />} />
      <Route path="/findpitch" render={() => <PianoHelper username={localStorage.username}/> }/>
      </Switch>
    </div>
  );
}
}

export default withRouter(App)
