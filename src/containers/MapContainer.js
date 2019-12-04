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
    console.log(this.props);
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
          bootstrapURLKeys={{ key: "AIzaSyAp8DvfEziX5ZjgpnoD5kTLiC8XXPJtC7U" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
        >
          <Marker lat={this.props.center.lat} lng={this.props.center.lng} />
        </GoogleMapReact>
      </div>
    );
  }
}
const Marker = props => {
  return <div className="pin"></div>;
};
export default MapContainer;
