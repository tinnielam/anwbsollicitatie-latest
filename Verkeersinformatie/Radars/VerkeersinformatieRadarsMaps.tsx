import React from "react";
import Marker from "../../GoogleMaps/GoogleMarker";
import AnwbData from "../../Data/AnwbData";

export default class VerkeersinformatieRadarsMaps extends React.Component {
  constructor(props: any) {
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

  public setRadarsMarkers() {
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
}
