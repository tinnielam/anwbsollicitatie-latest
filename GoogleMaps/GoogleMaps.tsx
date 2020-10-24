import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./GoogleMarker";
import Polyline from "./GooglePolyline";
import AnwbData from "../Data/AnwbData";

interface State {
  verkeersinformatieJams: Array<any>;
  verkeersinformatieRadars: Array<any>;
  verkeersinformatieRoadworks: Array<any>;
  map: object;
  mapsLoaded:boolean
  maps: object;
}

interface Props {
  center: { lat: number; lng: number };
  zoom: number;
}

export default class GoogleMaps extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      verkeersinformatieJams: [],
      verkeersinformatieRadars: [],
      verkeersinformatieRoadworks: [],
      mapsLoaded: false,
      map: null,
      maps: null
    };
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

  private onMapLoaded(map, maps) {
    this.setState({
      ...this.state,
      mapsLoaded: true,
      map: map,
      maps: maps
    });
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

  private getToLocationRoadworks() {
    return this.state.verkeersinformatieRoadworks.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.roadworks
          .filter(
            roadworks =>
              typeof roadworks.fromLoc !== "undefined" && !roadworks.polyline
          )
          .map(locationRoadworks => (
            <Marker
              lat={locationRoadworks.fromLoc.lat}
              lng={locationRoadworks.fromLoc.lon}
              color="#484848"
              className="pin roadworks bounce"
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
          .filter(jams => typeof jams.fromLoc !== "undefined" && !jams.polyline)
          .map(locationJams => (
            <Marker
              lat={locationJams.fromLoc.lat}
              lng={locationJams.fromLoc.lon}
              color="#DC143C"
              className="pin jams bounce"
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
            lat={key.fromLoc.lat}
            lng={key.fromLoc.lon}
            color="#4863A0"
            className="pin radars bounce"
            name="text"
          />
        ))
      )
    );
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
              icon="symbolRoadworks"
              polylineColor="#484848"
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
              icon="symbolJams"
              polylineColor="orange"
              markers={google.maps.geometry.encoding.decodePath(
                locationJams.polyline
              )}
            />
          ))
      )
    );
  }

  afterMapLoadChanges() {
    return (
      <div style={{ display: "none" }}>
        <Polyline
          map={this.state.map}
          maps={this.state.maps}
          icon="symbolJams"
          polylineColor="orange"
          markers={this.props.markers}
        />
      </div>
    );
  }

  render() {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
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
          {this.state.mapsLoaded ? this.afterMapLoadChanges() : ""}
          {this.getToLocationJams()}
          {this.getToLocationRadars()}
          {this.getToLocationRoadworks()}
        </GoogleMapReact>
      </div>
    );
  }
}
