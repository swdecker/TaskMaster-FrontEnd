import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: this.props.setCenter,
      zoom: 15
    };
  }

  render() {
    return (
      <div
        style={{
          height: "80vh",
          width: "50%",
          position: "relative"
        }}
      >
        <h3>MAP CONTAINER</h3>
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
          defaultCenter={this.props.setCenter}
          defaultZoom={this.state.zoom}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
        >
          <Marker
            lat={this.props.setCenter.lat}
            lng={this.props.setCenter.lng}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
const Marker = props => {
  return (
    <>
      <div className="pin"></div>
      <div className="pulse"></div>
    </>
  );
};
export default MapContainer;
