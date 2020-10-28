import React from "react";
import Polyline from "../../GoogleMaps/GooglePolyline";

class RoadworksMarkers {
  private setRoadworksMarkers() {
    return this.state.verkeersinformatieRoadworks.map(verkeersinformatie =>
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
}
