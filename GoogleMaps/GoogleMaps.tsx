import React from "react";
import GoogleMapReact from "google-map-react";
import AnwbData from "../Data/AnwbData";
import Marker from "./GoogleMarker";
import Markers from "./GoogleMarkers";
import JamsPolyline from "../Verkeersinformatie/Jams/JamsPolyline";
import RoadworksPolyline from "../Verkeersinformatie/Roadworks/RoadworksPolyline";

interface State {
  verkeersinformatieJams: Array<any>;
  verkeersinformatieRoadworks: Array<any>;
  verkeersinformatieRadars: Array<any>;
  verkeersinformatieTotalTraffic: Array<any>;
  map: object;
  maps: object;
  state: any;
}

interface Props {
  center: { lat: number; lng: number };
  zoom: number;
}

export default class GoogleMaps extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      state: null,
      verkeersinformatieJams: [],
      verkeersinformatieRoadworks: [],
      verkeersinformatieRadars: [],
      verkeersinformatieTotalTraffic: [],
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

  public onMapLoaded(map, maps) {
    this.setState({
      map: map,
      maps: maps
    });
  }

  public componentDidMount(): void {
    const anwbDataRoadworks = new AnwbData();
    anwbDataRoadworks
      .getAnwbData("roadworks")
      .then(data => this.setState({ verkeersinformatieRoadworks: data }));

    const anwbDataJams = new AnwbData();
    anwbDataJams
      .getAnwbData("jams")
      .then(data => this.setState({ verkeersinformatieJams: data }));

    const anwbDataRadars = new AnwbData();
    anwbDataRadars
      .getAnwbData("radars")
      .then(data => this.setState({ verkeersinformatieRadars: data }));

    const getAnwbDataTotalTraffic = new AnwbData();
    getAnwbDataTotalTraffic
      .getAnwbDataTotalTraffic()
      .then(data => this.setState({ verkeersinformatieTotalTraffic: data }));
  }

  private setRoadworksMarkers() {
    return this.state.verkeersinformatieRoadworks.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.roadworks
          .filter(
            roadworks =>
              typeof roadworks.fromLoc !== "undefined" && !roadworks.polyline
          )
          .map(locationRoadworks => (
            <Markers
              map={this.state.map}
              maps={this.state.maps}
              lat={locationRoadworks.fromLoc.lat}
              lon={locationRoadworks.fromLoc.lon}
              contentString={locationRoadworks.reason}
            />
          ))
      )
    );
  }

  private setJamsMarkers() {
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

  private setRadarsMarkers() {
    return this.state.verkeersinformatieRadars.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.radars.map(locationRadars => (
          <Marker
            lat={locationRadars.fromLoc.lat}
            lng={locationRadars.fromLoc.lon}
            color="#4863A0"
            className="pin radars bounce"
            name="text"
          />
        ))
      )
    );
  }

  render() {
    return (
      <div style={{ height: "94vh", width: "100%" }}>
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
          {this.setRoadworksMarkers()}
          <div style={{ display: "none" }}>
            <JamsPolyline
              array={this.state.verkeersinformatieJams}
              map={this.state.map}
              maps={this.state.maps}
            />
            <RoadworksPolyline
              array={this.state.verkeersinformatieRoadworks}
              map={this.state.map}
              maps={this.state.maps}
            />
          </div>
        </GoogleMapReact>
      </div>
    );
  }
}
