import React from 'react';
import Keys from './Keys.js'


export default class KeyComponent extends React.Component {
  // console.log(props)


  render(){
    console.log(this.props)
    return(
      <ul className="pitchdiv">
        {
          this.props.pitches.allkeys.length ? this.props.pitches.allkeys.map(pitch => {
            return <Keys key={pitch.id} pitch={pitch} addSongToList={this.props.addSongToList}/>
          })
          : null
        }
      </ul>
    )
}
}
