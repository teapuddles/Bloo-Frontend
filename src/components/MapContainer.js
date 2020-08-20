import React, {Component} from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Places} from 'google-maps-react';

const mapStyles = {
    width: '50%',
    height: '50%'
  };

export class MapContainer extends Component {
    render(){
        return(
          <Map className="map"  
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={this.props.setLocation}
        // probably will need to add 
        // geolocation here for inital center
          />
        )
    }
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
  })(MapContainer)
  