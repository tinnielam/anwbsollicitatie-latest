import React from "react";
import Markers from "../../GoogleMaps/GooglePMarkers";

interface Props {
  map: any;
  maps: any;
  array: Array<any>;
}

export default class RadarsPolyline extends React.Component<Props> {
  private setRadarsMarkers() {
    return this.props.array.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.radars.map(locationRadars => (
          <Markers
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
