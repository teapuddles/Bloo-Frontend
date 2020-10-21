import React from 'react';
import Keys from './Keys.js'
import 'react-piano/dist/styles.css';
import PianoHelper from '../PianoComponents/PianoHelper.js'


export default class KeyComponent extends React.Component {
  // console.log(props)


  render(){
    console.log(this.props)
    return(
      <div>
        <h3>
        1. Say Bloo: 
        <br/>
        In your speaking voice, say and hold the word Bloo. Then find what pitch on the piano is closest. It doesn't matter if you're a little bit off, because the base notes will be very close together. 
        </h3>
        <PianoHelper username={localStorage.username}/>
        <h3>
          2. Click a Pitch: 
          <br/>
          Now, take the pitch that was closest to what you found in Step 1 and click it.
          <br/>
          <br/>
          3. Choose Your Song:
        <br/>
        Choose a Song that you'd like and it will be added to the Song List on your profile page.
        </h3>

      <ul className="pitchdiv">
        {
          this.props.pitches.allkeys.length ? this.props.pitches.allkeys.map(pitch => {
            return <Keys key={pitch.id} pitch={pitch} addSongToList={this.props.addSongToList}/>
          })
          : null
        }
      </ul>
      </div>
    )
  }
}
