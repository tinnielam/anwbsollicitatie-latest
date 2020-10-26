import React from "react";
import Marker from "./GoogleMarker";

interface Props {
  array: Array<any>;
}

export default class RoadworksMarker extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  private setRoadworksMarkers() {
    return this.props.array.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.roadworks
          .filter(
            roadworks =>
              typeof roadworks.fromLoc !== "undefined" && !roadworks.polyline
          )
          .map(locationRoadworks => (
            <Marker
              lat={locationRoadworks.fromLoc.lat}
              lng={locationRoadworks.fromLoc.lon}
              color="#484848"
              className="pin roadworks bounce"
              name="text"
            />
          ))
      )
    );
  }

  render() {
    return this.setRoadworksMarkers();
  }
}
