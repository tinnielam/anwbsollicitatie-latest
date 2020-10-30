import { Component } from "react";

interface Props {
  markers: Array<object>;
  map: any;
  maps: any;
  polylineColor: string;
  icon: any;
  contentString: string;
  lat: number;
  lon: number;
}

export default class Polyline extends Component<Props> {
  public renderPolylines() {
    let geodesicPolyline = new this.props.maps.Polyline({
      path: this.props.markers,
      geodesic: true,
      strokeColor: this.props.polylineColor,
      map: this.props.map,
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

    const infowindow = new google.maps.InfoWindow({
      content: this.props.contentString,
      position: { lat: this.props.lat, lng: this.props.lon }
    });

    geodesicPolyline.addListener("click", () => {
      infowindow.open(this.props.map, geodesicPolyline);
    });

    this.props.maps.event.addListener(this.props.map, "click", function(event) {
      infowindow.close();
    });
  }

  render() {
    this.renderPolylines();
    return null;
  }
}
