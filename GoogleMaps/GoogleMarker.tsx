import React, { Component } from "react";
import "./Marker.scss";
import InfoWindow from "./GoogleInfoWindow";

interface Props {
  lat: string;
  lng: string;
  color: string;
  name: string;
  className: string;
  place: any;
}

export default class Marker extends Component<Props> {
  render() {
    return (
      <div>
        <div
          className={this.props.className}
          style={{ color: this.props.color, cursor: "pointer" }}
          title={this.props.name}
        />
        <div className="pulse" />
        {<InfoWindow place={this.props.place} />}
      </div>
    );
  }
}
