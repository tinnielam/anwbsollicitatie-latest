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
  static defaultProps: Props = {
    lat: "",
    lng: "",
    color: "",
    name: "",
    icon: ""
  };

  render() {
    return (
      <div>
        <div
          className="pin bounce"
          style={{ backgroundColor: this.props.color, cursor: "pointer" }}
          title={name}
        />
        <i id="fontIcon" className={this.props.icon} />
        <div className="pulse" />
      </div>
    );
  }
}
