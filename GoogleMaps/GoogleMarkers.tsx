import { Component } from "react";

interface Props {
  map: any;
  maps: any;
  lat: string;
  lon: string;
  contentString: string;
  icon: any;
}

export default class GoogleMarkers extends Component<Props> {
  public renderMarkers() {
    let marker = new this.props.maps.Marker({
      position: { lat: this.props.lat, lng: this.props.lon },
      map: this.props.map,
      icon: this.props.icon,
      animation: google.maps.Animation.DROP
    });

    const infowindow = new google.maps.InfoWindow({
      content: this.props.contentString
    });

    marker.addListener("click", () => {
      infowindow.open(this.props.map, marker);
      marker.setAnimation(google.maps.Animation.BOUNCE);
    });

    marker.addListener("mouseover", function(event) {
      marker.setOptions({
        opacity: 0.3
      });
    });

    marker.addListener("mouseout", function(event) {
      marker.setOptions({
        opacity: 1
      });
    });

    this.props.maps.event.addListener(this.props.map, "click", function(event) {
      marker.setAnimation(null);
      infowindow.close();
    });
  }

  render() {
    this.renderMarkers();
    return null;
  }
}
