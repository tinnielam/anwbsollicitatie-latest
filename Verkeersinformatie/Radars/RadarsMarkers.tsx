import React from "react";
import Markers from "../../GoogleMaps/GoogleMarkers";

interface Props {
  map: any;
  maps: any;
  array: Array<any>;
}

export default class RadarsMarkers extends React.Component<Props> {
  private setRadarsMarkers() {
    return this.props.array.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.radars.map(locationRadars => (
          <Markers
            position={locationRadars.fromLoc.lat}
            map={this.props.map}
            maps={this.props.maps}
            title="hoi"
          />
        ))
      )
    );
  }

  render() {
    return this.setRadarsMarkers();
  }
}
