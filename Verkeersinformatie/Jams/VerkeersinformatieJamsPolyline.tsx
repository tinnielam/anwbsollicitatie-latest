import React from "react";
import Marker from "../GoogleMaps/GoogleMarker";
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

export default class VerkeersinformatieJamsPolyline extends React.Component<
  Props,
  State
> {
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
  public componentDidMount(): void {
    const anwbDataJams = new AnwbData();
    anwbDataJams
      .getAnwbData("jams")
      .then(data => this.setState({ verkeersinformatieJams: data }));
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
}
