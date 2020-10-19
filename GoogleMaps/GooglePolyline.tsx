import { Component } from "react";

interface Props {
  markers: string;
  map: any;
  maps: any;
}

export default class Polyline extends Component<Props> {
  static defaultProps: Props = {
    markers: "",
    maps: "",
    map: ""
  };

  renderPolylines() {
    let geodesicPolyline = new this.props.maps.Polyline({
      path: this.props.markers,
      geodesic: true,
      strokeColor: "#00a1e1",
      strokeOpacity: 1.0,
      strokeWeight: 4
    });
    geodesicPolyline.setMap(this.props.map);
  }

  render() {
    this.renderPolylines();
    return null;
  }
}
