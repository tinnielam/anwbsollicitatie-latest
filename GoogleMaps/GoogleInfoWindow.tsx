import React, { Component } from "react";

interface Props {
  place: any;
}

export default class GoogleInfoWindow extends Component<Props> {
  infoWindowStyle = {
    position: "relative",
    bottom: 150,
    left: "-45px",
    width: 220,
    backgroundColor: "white",
    boxShadow: "0 2px 7px 1px rgba(0, 0, 0, 0.3)",
    padding: 10,
    fontSize: 12,
    zIndex: 100
  };

  render() {
    return (
      <div style={this.infoWindowStyle}>
        <div style={{ fontSize: 12 }}>{this.props.place}</div>
      </div>
    );
  }
}
