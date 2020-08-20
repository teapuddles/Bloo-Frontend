import React, {Component} from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Places} from 'google-maps-react';

export class Map extends Component {
    constructor(props){
        super(props)
        center = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        }
    }
}