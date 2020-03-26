import React from 'react';
import Song from './Song.js'


export default class Keys extends React.Component{

state = {
  user: {
    songList: []
  },
  showSong: false,
  keyInfo: []
}

  handleClick = () => {
    fetch(`http://localhost:3000/keys/${this.props.pitch.id}`)
    .then(r => r.json())
    .then(keyInfoResp => this.setState({
      keyInfo: keyInfoResp,
      showSong: !this.state.showSong
    }))
  
  }

  handleKeyInfo = (keyInfo) => {
    console.log(keyInfo)
    return keyInfo.songs.map(song => {
      return <Song key={song.id} song={song} username={localStorage.username} addSongToList={this.props.addSongToList}/>
    })
  }

  render(){
    return(
      <div>
        {this.state.showSong ? this.handleKeyInfo(this.state.keyInfo) : null} 
        <div class="card-containr">
         <div className="card" onClick={this.handleClick}>
          {this.props.pitch.pitch}
         </div>
         </div>
      </div>
    )
  }
}
