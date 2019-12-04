import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

export class MapContainer extends Component {
  static defaultProps = {
    center: {
      lat: 30.27711,
      lng: -97.74269
    },
    zoom: 15
  };

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
          title={"YOUR LOCATION"}
          text="YOUR LOC"
          label="testing"
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: "AIzaSyAp8DvfEziX5ZjgpnoD5kTLiC8XXPJtC7U" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
        >
          <Marker
            title={"YOUR LOCATION"}
            text={"YOUR LOC"}
            name="Location"
            lat={this.props.center.lat}
            lng={this.props.center.lng}
            label="testing"
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
