import React from 'react';

export default class SongList extends React.Component{
  
  // state = {
  //   viewLyrics = false
  // }

  // showLyrics = (e) => {
  //   this.setState({
  //     viewLyrics = !this.state.viewLyrics
  //   })
  // }

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
        {/* <button onClick={this.state.viewLyrics ? this.showLyrics : null}>Lyrics</button> */}
        <button onClick={this.onDeleteSong}>Remove Song</button>
      </div>
    )
  }
}