import React from 'react';

export default class Profile extends React.Component {


  render() {
    console.log(this.props.username)
    return (
      <div className="container">
        <h1>Hello, {this.props.username}!</h1>
      </div>
    )
  }
}

