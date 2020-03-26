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
        <PianoHelper username={localStorage.username}/>
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
