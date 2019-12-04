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
          bootstrapURLKeys={{ key: "AIzaSyAp8DvfEziX5ZjgpnoD5kTLiC8XXPJtC7U" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
        ></GoogleMapReact>
      </div>
    );
  }
}

export default MapContainer;

// import React, { Component } from "react";
// import GoogleMapReact from "google-map-react";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// class MapContainer extends Component {
//   static defaultProps = {
//     center: {
//       lat: 30.27711,
//       lng: -97.74269
//     },
//     zoom: 11
//   };

//   render() {
//     return (
//       // Important! Always set the container height explicitly
//       <div style={{ height: "80vh", width: "50%" }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: "AIzaSyAp8DvfEziX5ZjgpnoD5kTLiC8XXPJtC7U" }}
//           defaultCenter={this.props.center}
//           defaultZoom={this.props.zoom}
//         >
//           <AnyReactComponent lat={30.27711} lng={-97.74269} text="My Marker" />
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }

// export default MapContainer;
