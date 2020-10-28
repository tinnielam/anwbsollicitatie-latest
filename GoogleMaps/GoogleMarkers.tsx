import { Component } from "react";

interface Props {
  markers: Array<any>;
  map: any;
  maps: any;
  lon: string;
  lat: string;
  polylineColor: string;
  icon: any;
}

export default class GoogleMarkers extends Component<Props> {
  public setRoadworksMarkers() {
    const getInfoWindowString = place => `
    <div>
      <div style="font-size: 16px;">
        ${place.name}
      </div>
      <div style="font-size: 14px;">
        <span style="color: grey;">
        ${place.rating}
        </span>
        <span style="color: orange;">${String.fromCharCode(9733).repeat(
          Math.floor(place.rating)
        )}</span><span style="color: lightgrey;">${String.fromCharCode(
      9733
    ).repeat(5 - Math.floor(place.rating))}</span>
      </div>
      <div style="font-size: 14px; color: grey;">
        ${place.types[0]}
      </div>
      <div style="font-size: 14px; color: grey;">
        ${"$".repeat(place.price_level)}
      </div>
      <div style="font-size: 14px; color: green;">
        ${place.opening_hours.open_now ? "Open" : "Closed"}
      </div>
    </div>`;

    const markers = [];
    const infowindows = [];

    this.props.markers.forEach(place => {
      markers.push(
        new this.props.maps.Marker({
          position: {
            lat: this.props.lat,
            lng: this.props.lon
          },
          map: this.props.map
        })
      );

      infowindows.push(
        new this.props.maps.InfoWindow({
          content: getInfoWindowString(place)
        })
      );
    });

    markers.forEach((marker, i) => {
      marker.addListener("click", () => {
        infowindows[i].open(this.props.map, marker);
      });
    });
  }

  render() {
    this.setRoadworksMarkers();
    return null;
  }
}
