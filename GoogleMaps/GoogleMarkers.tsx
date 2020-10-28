import { Component } from "react";

interface Props {
  markers: Array<object>;
  map: any;
  maps: any;
  title: string;
}

export default class GoogleMarkers extends Component<Props> {
  public renderMarkers() {
    let marker = new this.props.maps.Marker({
      position: this.props.markers,
      title: this.props.title,
      animation: google.maps.Animation.DROP
    });
    marker.setMap(this.props.map);
  }

  render() {
    this.renderMarkers();
    return null;
  }
}
