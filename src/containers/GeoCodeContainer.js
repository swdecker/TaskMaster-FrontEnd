import React, { Component } from "react";
import { GoogleComponent } from "react-google-location";
import MapContainer from "./MapContainer.js";

export class GeoCodeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: null,
      coordinates: { lat: 30.27711, lng: -97.74269 },
      showMap: false
    };
  }

  handleChange = e => {
    this.setState({ place: e, showMap: false });
  };

  handleClick = () => {
    this.handleCoordinates();
  };

  //   handle coordinates function here make sure to handle the case when plcae is null
  handleCoordinates = () => {
    if (this.state.place !== null) {
      this.setState(
        { coordinates: this.state.place.coordinates },
        this.handleState()
      );
    }
  };

  handleState = () => {
    this.setState({ showMap: true });
  };

  render() {
    return (
      <div>
        <GoogleComponent
          apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
          language={"en"}
          coordinates={true}
          onChange={e => {
            this.handleChange(e);
          }}
        />
        <button onClick={() => this.handleClick()}>Submit</button>
        {!this.state.showMap ? null : (
          <MapContainer setCenter={this.state.coordinates} />
        )}
      </div>
    );
  }
}

export default GeoCodeContainer;
