import React from "react";
import Markers from "../../GoogleMaps/GoogleMarkers";

interface Props {
  map: any;
  maps: any;
  array: Array<any>;
  contentString?: any;
}

export default class RadarsMarkers extends React.Component<Props> {
  private setRadarsMarkers() {
    return this.props.array.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.radars.map(locationRadars => (
          <Markers
            map={this.props.map}
            maps={this.props.maps}
            lat={locationRadars.fromLoc.lat}
            lon={locationRadars.fromLoc.lon}
            contentString={locationRadars.reason}
          />
        ))
      )
    );
  }
  render() {
    return this.setRadarsMarkers();
  }
}
