import React, {Component} from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Places} from 'google-maps-react';

const mapStyles = {
    width: '50%',
    height: '50%'
  };

class MapContainer extends React.Component {
  constructor(props){
  super(props)
  this.state = {
    latitude: "",
    longitude: ""
  };
  this.getLocation = this.getLocation.bind(this)
  this.getCoords = this.getCoords.bind(this)
  }

  getLocation = () => {
    if (navigator.geolocation) {
      console.log(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this.getCoords);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getCoords = (position) => {
    console.log(position)
    this.setState = ({
       latitude: position.coords.latitude,
       longitude: position.coords.longitude
    })
  }

    render(){
        return(
          <div>
          <button onClick={this.getLocation}>Find My Spot</button>
          <Map className="map"  
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={this.props.getLocation}
        // probably will need to add 
        // geolocation here for inital center
          />
          </div>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
  })(MapContainer)
  