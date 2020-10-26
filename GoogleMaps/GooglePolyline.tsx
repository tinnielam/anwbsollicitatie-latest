import { Component } from "react";

interface Props {
  markers: Array<object>;
  map: any;
  maps: any;
  polylineColor: string;
  icon: any;
}

export default class Polyline extends Component<Props> {
  public renderPolylines() {
    let geodesicPolyline = new this.props.maps.Polyline({
      path: this.props.markers,
      geodesic: true,
      strokeColor: this.props.polylineColor,
      strokeOpacity: 0.6,
      strokeWeight: 3,
      icons: [
        {
          icon: this.props.icon,
          fixedRotation: true,
          offset: "0%"
        },
        {
          icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
          offset: "100%"
        }
      ]
    });
    geodesicPolyline.setMap(this.props.map);
  }

  render() {
    this.renderPolylines();
    return null;
  }
}
