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
    currentLocation: {
      latitude: '',
      longitude: ''
    }
  };
  this.getLocation = this.getLocation.bind(this)
  this.getCoords = this.getCoords.bind(this)
  }


  // getLocation = () => {
  //   if (navigator.geolocation) {
  //     console.log(navigator.geolocation)
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       let coords = position.coords
  //       console.log(coords)
  //       this.setState=({
  //         currentLocation: {
  //           latitude: coords.latitude,
  //           longitude: coords.longitude
  //         }
  //       })
  //     });
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // }

  getLocation = () => {
    if (navigator.geolocation) {
      console.log(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this.getCoords);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getCoords = (position) => {
    console.log(position.coords)
    this.setState = ({
       latitude: position.coords.latitude,
       longitude: position.coords.longitude
    })
    console.log(this.state)
    return this.state
  }

    render(){
        return(
          <div>
          <button onClick={this.getLocation}>Find My Spot</button>
          <Map className="map"  
          google={this.props.google}
          props={this.props}
          zoom={12}
          style={mapStyles}
          initialCenter={this.props.currentLocation}
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
  