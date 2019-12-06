import React, { Component } from "react";
import { GoogleComponent } from "react-google-location";
import MapContainer from "./MapContainer.js";
import { Button } from "reactstrap";
import "./style.css";

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
        <div
          style={{
            width: "100%",
            margin: "70px auto",
            maxWidth: "700px"
          }}
        >
          <GoogleComponent
            apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
            language={"en"}
            coordinates={true}
            onChange={e => {
              this.handleChange(e);
            }}
          />
          <Button
            style={{ margin: "18px 0 0 0" }}
            type="submit"
            color="primary"
            onClick={() => this.handleClick()}
          >
            Map your Task!
          </Button>
        </div>

        {!this.state.showMap ? null : (
          <MapContainer setCenter={this.state.coordinates} />
        )}
      </div>
    );
  }
}

export default GeoCodeContainer;
