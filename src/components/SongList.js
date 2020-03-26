import React from 'react';

export default class SongList extends React.Component{
  
  state = {
    viewLyrics: false
  }

  showLyrics = () => {
    console.log(this.props.song)
    return(
      <div>
        <br/>
      {this.props.song.lyrics}
      </div>
    )
  }

  handleClick = () => {
    this.setState({
      viewLyrics: !this.state.viewLyrics
    })
  }

  onDeleteSong = () => {
    console.log(this.props.song, "hi")
    this.props.deleteSong(this.props.song)
  }
  
  render(){
    console.log(this.props)
    return(
      <div>
        {this.props.song.artist} -
        {this.props.song.title}
        {this.state.viewLyrics ? this.showLyrics(this.props.song) : null}
        <button onClick={this.handleClick}>Lyrics</button>
        <button onClick={this.onDeleteSong}>Remove Song</button>
      </div>
    )
  }
}