import React from "react";
import Markers from "../../GoogleMaps/GoogleMarkers";

interface Props {
  map: any;
  maps: any;
  array: Array<any>;
}

export default class JamsMarkers extends React.Component<Props> {
  private setJamsMarkers() {
    return this.props.array.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.jams
          .filter(jams => typeof jams.fromLoc !== "undefined" && !jams.polyline)
          .map(locationJams => (
            <Markers
              map={this.props.map}
              maps={this.props.maps}
              lat={locationJams.fromLoc.lat}
              lon={locationJams.fromLoc.lon}
              contentString={locationJams.reason}
              icon={""}
            />
          ))
      )
    );
  }
  render() {
    return this.setJamsMarkers();
  }
}
