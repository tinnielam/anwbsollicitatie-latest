import { Component } from "react";

interface Props {
  map: any;
  maps: any;
  lat: string;
  lon: string;
  contentString: string;
  icon: string;
}

export default class GoogleMarkers extends Component<Props> {
  public renderMarkers() {
    let marker = new this.props.maps.Marker({
      position: { lat: this.props.lat, lng: this.props.lon },
      map: this.props.map,
      icon: this.props.icon
    });

    const infowindow = new google.maps.InfoWindow({
      content: this.props.contentString
    });

    marker.addListener("click", () => {
      infowindow.open(this.props.map, marker);
    });

    this.props.maps.event.addListener(this.props.map, "click", function(event) {
      infowindow.close();
    });
  }

  render() {
    this.renderMarkers();
    return null;
  }
}
