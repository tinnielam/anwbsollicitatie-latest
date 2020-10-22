import React, { Component } from "react";
import "./Marker.scss";

interface Props {
  lat: string;
  lng: string;
  color: string;
  name: string;
  className: string;
}

export default class Marker extends Component<Props> {
  render() {
    return (
      <div>
        <div
          className={this.props.className}
          style={{ color: this.props.color, cursor: "pointer" }}
          title={name}
        />
        <div className="pulse" />
      </div>
    );
  }
}
