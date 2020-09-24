import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./GoogleMarker";
import AnwbData from "../Data/AnwbData";

class GoogleMaps extends React.Component {
  public decodedLevels: [];

  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      verkeersinformatieJams: [],
      verkeersinformatieRadars: [],
      verkeersinformatieRoadworks: []
    };
  }

  public componentDidMount(): void {
    const anwbDataJams = new AnwbData();
    anwbDataJams
      .getAnwbData("jams")
      .then(data => this.setState({ verkeersinformatieJams: data }));

    const anwbDataRoadworks = new AnwbData();
    anwbDataRoadworks
      .getAnwbData("roadworks")
      .then(data => this.setState({ verkeersinformatieRoadworks: data }));

    const anwbDataRadars = new AnwbData();
    anwbDataRadars
      .getAnwbData("radars")
      .then(data => this.setState({ verkeersinformatieRadars: data }));
  }

  private getFromLocationJams() {
    return this.state.verkeersinformatieJams.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.jams.map((key, index) => (
          <Marker
            lat={key.fromLoc.lat}
            lng={key.fromLoc.lon}
            text={key.events.text}
            color="red"
            icon="fas fa-cars"
          />
        ))
      )
    );
  }

  private getToLocationJams() {
    return this.state.verkeersinformatieJams.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.jams.map((key, index) => (
          <Marker
            lat={key.toLoc.lat}
            lng={key.toLoc.lon}
            text={key.events.text}
            color="blue"
            icon="fas fa-cars"
          />
        ))
      )
    );
  }

  private getFromLocationRoadworks() {
    return this.state.verkeersinformatieRoadworks.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.roadworks.map((key, index) => (
          <Marker
            lat={key.fromLoc.lat}
            lng={key.fromLoc.lon}
            text={key.events.text}
            color="orange"
            icon="fas fa-tools"
          />
        ))
      )
    );
  }

  private getToLocationRoadworks() {
    return this.state.verkeersinformatieRoadworks.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.roadworks.map((key, index) => (
          <Marker
            lat={key.toLoc.lat}
            lng={key.toLoc.lon}
            text={key.events.text}
            color="orange"
            icon="fas fa-tools"
          />
        ))
      )
    );
  }

  private getFromLocationRadars() {
    return this.state.verkeersinformatieRadars.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.radars.map((key, index) => (
          <Marker
            lat={key.fromLoc.lat}
            lng={key.fromLoc.lon}
            text={key.events.text}
            color="black"
            icon="fas fa-camera"
          />
        ))
      )
    );
  }

  private getToLocationRadars() {
    return this.state.verkeersinformatieRadars.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.radars.map((key, index) => (
          <Marker
            lat={key.toLoc.lat}
            lng={key.toLoc.lon}
            text={key.events.text}
            color="black"
            icon="fas fa-camera"
          />
        ))
      )
    );
  }

  private renderPolylines(map, maps): any {
    let geodesicPolyline = new maps.Polyline({
      path: this.props.markers,
      geodesic: true,
      strokeColor: "#00a1e1",
      strokeOpacity: 1.0,
      strokeWeight: 4
    });
    geodesicPolyline.setMap(map);
  }

  render() {
    return (
      <div style={{ height: "100vh", width: "50%", float: "right" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCVaY96z82QyROvA7BvgOLIZs_rtkWeD2A" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({ map, maps }) => this.renderPolylines(map, maps)}
        >
          {this.getFromLocationJams()}
          {this.getToLocationJams()}
          {this.getFromLocationRadars()}
          {this.getToLocationRadars()}
          {this.getFromLocationRoadworks()}
          {this.getToLocationRoadworks()}
        </GoogleMapReact>
      </div>
    );
  }
  static defaultProps = {
    markers: [
      { lat: 53.42728, lng: -6.24357 },
      { lat: 43.681583, lng: -79.61146 }
    ],
    center: {
      lat: 52.254709,
      lng: 5.353826
    },
    zoom: 8
  };
}

export default GoogleMaps;
