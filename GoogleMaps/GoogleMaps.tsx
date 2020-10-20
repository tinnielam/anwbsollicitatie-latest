import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./GoogleMarker";
import Polyline from "./GooglePolyline";
import AnwbData from "../Data/AnwbData";

interface State {
  error: boolean;
  verkeersinformatieJams: Array<any>;
  verkeersinformatieRadars: Array<any>;
  verkeersinformatieRoadworks: Array<any>;
  map: object;
  maps: object;
}

interface Props {
  center: { lat: number; lng: number };
  zoom: number;
  markers: [{ lat: number; lng: number }];
}

export default class GoogleMaps extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      verkeersinformatieJams: [],
      verkeersinformatieRadars: [],
      verkeersinformatieRoadworks: [],
      map: null,
      maps: null
    };
  }

  static defaultProps = {
    center: {
      lat: 52.254709,
      lng: 5.353826
    },
    zoom: 8
  };

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
            color="red"
            icon="fas fa-cars"
            name="text"
          />
        ))
      )
    );
  }

  private getToLocationJams() {
    return this.state.verkeersinformatieJams.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.jams
          .filter(jams => typeof jams.toLoc !== "undefined")
          .map(locationJams => (
            <Marker
              lat={locationJams.toLoc.lat}
              lng={locationJams.toLoc.lon}
              color="blue"
              icon="fas fa-cars"
              name="text"
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
            color="orange"
            icon="fas fa-tools"
            name="text"
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
            color="orange"
            icon="fas fa-tools"
            name="text"
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
            color="black"
            icon="fas fa-camera"
            name="text"
          />
        ))
      )
    );
  }

  private onMapLoaded(map, maps) {
    this.setState({
      map: map,
      maps: maps
    });
  }

  private verkeersinformatiePolylineRoadworks() {
    return this.state.verkeersinformatieRoadworks.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.roadworks
          .filter(roadworks => typeof roadworks.polyline !== "undefined")
          .map(locationRoadworks => (
            <Polyline
              map={this.state.map}
              maps={this.state.maps}
              markers={google.maps.geometry.encoding.decodePath(
                locationRoadworks.polyline
              )}
            />
          ))
      )
    );
  }

  private verkeersinformatiePolylineJams() {
    return this.state.verkeersinformatieJams.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.jams
          .filter(jams => typeof jams.polyline !== "undefined")
          .map(locationJams => (
            <Polyline
              map={this.state.map}
              maps={this.state.maps}
              markers={google.maps.geometry.encoding.decodePath(
                locationJams.polyline
              )}
            />
          ))
      )
    );
  }

  render() {
    return (
      <div style={{ height: "100vh", width: "50%", float: "right" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyCVaY96z82QyROvA7BvgOLIZs_rtkWeD2A",
            libraries: ["geometry"]
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => this.onMapLoaded(map, maps)}
        >
          {this.verkeersinformatiePolylineJams()}
          {this.verkeersinformatiePolylineRoadworks()}
          {this.getFromLocationJams()}
          {this.getToLocationJams()}
          {this.getToLocationRadars()}
          {this.getFromLocationRoadworks()}
          {this.getToLocationRoadworks()}
        </GoogleMapReact>
      </div>
    );
  }
}
