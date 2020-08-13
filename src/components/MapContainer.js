import React, {Component} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const mapStyles = {
    width: '50%',
    height: '50%'
  };

export class MapContainer extends Component {
    render(){
        return(
          <Map classname="map"  
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={this.setLocation}
        // probably will need to add 
        // geolocation here for inital center
          />
        )
    }
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
  })(MapContainer)
  