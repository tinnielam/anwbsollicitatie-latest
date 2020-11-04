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
  id: string;
}

export default class Polyline extends Component<Props> {
  public renderPolylines() {
    let geodesicPolyline = new this.props.maps.Polyline({
      path: this.props.markers,
      geodesic: true,
      strokeColor: this.props.polylineColor,
      map: this.props.map,
      id: this.props.id,
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
      let getVerkeersinformatieCardsDiv = document.getElementById(
        this.props.id.toString()
      );
      infowindow.open(this.props.map, geodesicPolyline);
      getVerkeersinformatieCardsDiv.click();
      getVerkeersinformatieCardsDiv.focus();
    });

    geodesicPolyline.addListener("mouseover", () => {
      geodesicPolyline.setOptions({
        strokeOpacity: 0.5
      });
    });

    geodesicPolyline.addListener("mouseout", () => {
      geodesicPolyline.setOptions({
        strokeOpacity: 1
      });
    });

    setTimeout(() => {
      document
        .getElementById(this.props.id.toString())
        .addEventListener("click", () => {
          infowindow.open(this.props.map, geodesicPolyline);
          this.props.map.setZoom(12);
        });
    }, 1000);

    this.props.maps.event.addListener(this.props.map, "click", () => {
      infowindow.close();
      document
        .getElementById(this.props.id.toString() + "child")
        .removeAttribute("style");
    });
  }

  render() {
    this.renderPolylines();
    return null;
  }
}
