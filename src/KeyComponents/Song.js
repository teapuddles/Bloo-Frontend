import React from 'react';
export default class Song extends React.Component{


  handleClick = (e) => {
    e.preventDefault()
    console.log(this.props)
    this.props.addSongToList(this.props.song)
  }
  render(){
    console.log(this.props)
    // this.props.keyIn.key_id
    return(
      <div className="song-div">
      {this.props.song.title} -
      {this.props.song.artist} - 
      <button onClick={this.handleClick}>  Add me to your list  </button>
      </div>
    )
  }
}

// want to make a comparison during my map and render out those which have a keyIn.song_id === songlist.id 