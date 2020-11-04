import { Component } from "react";

interface Props {
  map: any;
  maps: any;
  lat: string;
  lon: string;
  contentString: string;
  icon: any;
  id: string;
}

export default class GoogleMarkers extends Component<Props> {
  public renderMarkers() {
    let marker = new this.props.maps.Marker({
      position: { lat: this.props.lat, lng: this.props.lon },
      map: this.props.map,
      icon: this.props.icon,
      animation: google.maps.Animation.DROP,
      id: this.props.id
    });

    const infowindow = new google.maps.InfoWindow({
      content: this.props.contentString
    });

    marker.addListener("click", () => {
      let getVerkeersinformatieCardsDiv = document.getElementById(
        this.props.id.toString()
      );
      infowindow.open(this.props.map, marker);
      getVerkeersinformatieCardsDiv.click();
      getVerkeersinformatieCardsDiv.focus();
    });

    marker.addListener("mouseover", () => {
      marker.setOptions({
        opacity: 0.3
      });
    });

    marker.addListener("mouseout", () => {
      marker.setOptions({
        opacity: 1
      });
    });
   
    this.props.maps.event.addListener(this.props.map, "click", () => {
      marker.setAnimation(null);
      infowindow.close();
      document
        .getElementById(this.props.id.toString() + "child")
        .removeAttribute("style");
    });
  }

  render() {
    this.renderMarkers();
    return null;
  }
}
