import React, { Component } from "react";
import "./Marker.scss";

interface Props {
  lat: string;
  lng: string;
  color: string;
  name: string;
  icon: string;
}

export default class Marker extends Component<Props> {
  render() {
    return (
      <div>
        <div
          className="pin bounce"
          style={{
            color: this.props.color,
            cursor: "pointer",
            content: this.props.icon
          }}
          title={name}
        />
        <div className="pulse" />
      </div>
    );
  }
}
