import React, {Component} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
  };

export class MapContainer extends Component {
    render(){
        return(
          <Map
          google={this.props.google}
          zoom={7}
          style={mapStyles}
        //initialCenter={{}}
        // probably will need to add 
        // geolocation here for inital center
          />
        )
    }
}
export default GoogleApiWrapper({
    apiKey: (AIzaSyCW3gPOgEsTPSgkenTVi7_ZPq9eHrkcR_E)
  })(MapContainer)
  