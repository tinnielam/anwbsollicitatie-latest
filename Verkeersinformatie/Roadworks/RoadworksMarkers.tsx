import React from "react";
import Markers from "../../GoogleMaps/GoogleMarkers";

interface Props {
  map: any;
  maps: any;
  array: Array<any>;
  contentString?: any;
}

export default class RoadworksMarkers extends React.Component<Props> {
  private setRoadworksMarkers() {
    return this.props.array.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.roadworks
          .filter(
            roadworks =>
              typeof roadworks.fromLoc !== "undefined" && !roadworks.polyline
          )
          .map(locationRoadworks => (
            <Markers
              map={this.props.map}
              maps={this.props.maps}
              lat={locationRoadworks.fromLoc.lat}
              lon={locationRoadworks.fromLoc.lon}
              contentString={locationRoadworks.reason}
            />
          ))
      )
    );
  }
  render() {
    return this.setRoadworksMarkers();
  }
}
