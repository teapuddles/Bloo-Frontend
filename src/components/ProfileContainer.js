import React from 'react';
import SongList from './SongList'

export default class Profile extends React.Component {


  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Hello, {this.props.username}!</h1>
        <h2> Your Song List: </h2>
        {this.props.songList.map(song => {
          return <SongList key={song.id} song={song} deleteSong={this.props.deleteSong}/>
        })}
      </div>
    )
  }
}

