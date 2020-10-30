import React from "react";
import Polyline from "../../GoogleMaps/GooglePolyline";

interface Props {
  map: any;
  maps: any;
  array: Array<any>;
  contentString?: any;
}

export default class RoadworksPolyline extends React.Component<Props> {
  private setPolylineRoadworks() {
    const symbolRoadworks = {
      path:
        "M354.5,173.3c0,38.3,31.1,69.3,69.4,69.3c34.7,0,63.3-25.4,68.5-58.6l46.3,12.9l3.8-13.3l-35.9-10c4.2-38.7-20-75.9-58.8-86.8c-43.2-12.1-88.1,13.1-100.2,56.2l12.3,3.4C356.5,154.8,354.5,163.8,354.5,173.3z" +
        "M927.9,687.5c0,0-25.9,41.1-47.9,89.2c-33.6-183.8-123.5-212.9-123.5-212.9s-22.7,28.8-50.3,71.5l-137.3-66.9c1.8-11.2-0.6-23.3-9.4-34.2c-53.8-66-65-160.8-108.9-233.1c-1.8-2.9-3.8-5.5-5.9-7.8c-17.1-32.5-57.2-49.4-91.4-42.9c-110.6-31.4-206.2-1.2-256.8,108c-21.9,47.3,46.5,88.8,70.5,44.8l89.4,43.6c-11.8,30.5-25.3,60.4-40.6,89.7c-55.3,90.2-125.9,171.3-195.1,251c-35,40.3,23.7,99.4,58.9,58.8c56.5-65.2,114.2-131.4,164.6-202.2c5.2,3.3,10.7,6.1,16.4,8.1c3.6,2.7,7.8,4.9,12.7,6.6c36.6,12.1,69.4,32,99.6,55.4c-20.8,49.3-41.1,99.2-73.6,142.2c-32.4,42.8,40,84.2,71.9,42c39.8-52.7,61.3-115.8,87.9-175.5c7.3-16.3,8.6-37.4-6.5-50.4c-30-25.8-61.5-48.7-95.8-67.1c15-29.3,28.8-59.2,41.1-89.6l74.8,36.5c8.1,14.1,17.1,27.7,27.6,40.6c17.5,21.5,41.5,16.1,56.1,0.2l134.8,65.7c-39.7,65-82.8,151.7-82.8,221.7h241l140.5,1.6C983.5,823.4,927.9,687.5,927.9,687.5z M266.1,420.8l-86.8-42.3c12.4-22.9,28.5-44,53.8-53.6c19.9-7.6,41.2-7.1,62.2-3.3C287.2,355.3,277.5,388.4,266.1,420.8z M408.2,490c5.9-15.6,11.3-31.3,16.4-47.1c8.9,23.1,17.7,46.2,27.8,68.7L408.2,490z",
      fillColor: "#484848",
      fillOpacity: 1,
      scale: 0.04,
      strokeColor: "white",
      strokeWeight: 2
    };

    return this.props.array.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.roadworks
          .filter(roadworks => typeof roadworks.polyline !== "undefined")
          .map(locationRoadworks => (
            <div>
              <Polyline
                map={this.props.map}
                maps={this.props.maps}
                icon={symbolRoadworks}
                polylineColor={"#484848"}
                lat={locationRoadworks.fromLoc.lat}
                lon={locationRoadworks.fromLoc.lon}
                contentString={locationRoadworks.reason}
                markers={google.maps.geometry.encoding.decodePath(
                  locationRoadworks.polyline
                )}
              />
            </div>
          ))
      )
    );
  }
  render() {
    return this.setPolylineRoadworks();
  }
}
