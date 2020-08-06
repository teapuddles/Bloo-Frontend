import React, {Component} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';


export class MapComponent extends Component {
    render(){
        return(
          <Map
          google={this.props.google}
          zoom={7}
        // probably will need to add 
        // geolocation here for inital center
          />
        )
    }
}
export default GoogleApiWrapper({
    apiKey: (AIzaSyCW3gPOgEsTPSgkenTVi7_ZPq9eHrkcR_E)
  })(MapComponent)
  