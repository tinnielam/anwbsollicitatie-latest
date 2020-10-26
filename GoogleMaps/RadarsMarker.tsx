import React from "react";
import Marker from "./GoogleMarker";

interface Props {
  array: Array<any>;
}

export default class RadarsMarker extends React.Component<Props> {
  private setRadarsMarkers() {
    return this.props.array.map(verkeersinformatie =>
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
