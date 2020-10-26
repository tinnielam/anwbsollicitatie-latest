import React from "react";
import Marker from "./GoogleMarker";
import AnwbData from "../Data/AnwbData";

export default class RadarsMarker extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      verkeersinformatieRadars: []
    };
  }

  public componentDidMount(): void {
    const anwbDataRadars = new AnwbData();
    anwbDataRadars
      .getAnwbData("radars")
      .then(data => this.setState({ verkeersinformatieRadars: data }));
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
    return this.setRadarsMarkers();
  }
}
