import React from "react";
import GoogleMapReact from "google-map-react";
import AnwbData from "../Data/AnwbData";
import RadarsMarker from "./RadarsMarker";
import RoadworksMarker from "./RoadworksMarker";
import JamsMarker from "./JamsMarker";

import JamsPolyline from "./JamsPolyline";
import RoadworksPolyline from "./RoadworksPolyline";

interface State {
  verkeersinformatieJams: Array<any>;
  verkeersinformatieRoadworks: Array<any>;
  verkeersinformatieRadars: Array<any>;
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
      verkeersinformatieRoadworks: [],
      verkeersinformatieRadars: [],
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

          <RadarsMarker array={this.state.verkeersinformatieRadars} />
          <JamsMarker array={this.state.verkeersinformatieJams} />
          <RoadworksMarker array={this.state.verkeersinformatieRoadworks} />
        </GoogleMapReact>
      </div>
    );
  }
}
