import { Component } from "react";

interface Props {
  map: any;
  maps: any;
  lat: string;
  lon: string;
}

export default class GoogleMarkers extends Component<Props> {
  public renderMarkers() {
    let marker = new this.props.maps.Marker({
      position: { lat: this.props.lat, lng: this.props.lon }
    });
    marker.setMap(this.props.map);
  }

  render() {
    this.renderMarkers();
    return null;
  }
}
