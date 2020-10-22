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

  private getToLocationJams() {
    return this.state.verkeersinformatieJams.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.jams
          .filter(
            jams =>
              typeof jams.toLoc !== "undefined" &&
              typeof jams.fromLoc !== "undefined" &&
              typeof jams.polyline !== "undefined"
          )
          .map(locationJams => (
            <React.Fragment>
              <Marker
                lat={locationJams.toLoc.lat && locationJams.fromLoc.lat}
                lng={locationJams.toLoc.lon && locationJams.fromLoc.lon}
                color="blue"
                icon="fas fa-cars"
                name="text"
              />
              <Polyline
                map={this.state.map}
                maps={this.state.maps}
                polylineColor="orange"
                markers={google.maps.geometry.encoding.decodePath(
                  locationJams.polyline
                )}
              />
            </React.Fragment>
          ))
      )
    );
  }

  private getToLocationRoadworks() {
    return this.state.verkeersinformatieRoadworks.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.roadworks
          .filter(roadworks => typeof roadworks.polyline !== "undefined")
          .map(locationRoadworks => (
            <React.Fragment>
              <Marker
                lat={
                  locationRoadworks.toLoc.lat && locationRoadworks.fromLoc.lat
                }
                lng={
                  locationRoadworks.toLoc.lon && locationRoadworks.fromLoc.lon
                }
                color="orange"
                icon="fas fa-tools"
                name="text"
              />
              <Polyline
                map={this.state.map}
                maps={this.state.maps}
                polylineColor="grey"
                markers={google.maps.geometry.encoding.decodePath(
                  locationRoadworks.polyline
                )}
              />
            </React.Fragment>
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
          {this.getToLocationJams()}
          {this.getToLocationRadars()}
          {this.getToLocationRoadworks()}
        </GoogleMapReact>
      </div>
    );
  }
}
