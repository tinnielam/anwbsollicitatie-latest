import React from "react";
import Marker from "./GoogleMarker";

interface Props {
  array: Array<any>;
}

export default class JamsMarker extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  private setJamsMarkers() {
    return this.props.array.map(verkeersinformatie =>
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

  render() {
    return this.setJamsMarkers();
  }
}
