import { Component } from "react";

interface Props {
  markers: Array<object>;
  map: any;
  maps: any;
  polylineColor: string;
}

export default class Polyline extends Component<Props> {
  public renderPolylines() {
    let geodesicPolyline = new this.props.maps.Polyline({
      path: this.props.markers,
      geodesic: true,
      strokeColor: this.props.polylineColor,
      strokeOpacity: 0.6,
      strokeWeight: 3
    });
    geodesicPolyline.setMap(this.props.map);
  }

  render() {
    this.renderPolylines();
    return null;
  }
}
