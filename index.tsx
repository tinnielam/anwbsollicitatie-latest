import React, { Component } from "react";
import { render } from "react-dom";
import "./Verkeersinformatie/Styles/Verkeersinformatie.scss";
import "./Verkeersinformatie/Styles/styles.scss";
import Jams from "./Verkeersinformatie/Jams/VerkeersinformatieJams";
import Roadworks from "./Verkeersinformatie/Radars/VerkeersinformatieRadars";
import Radars from "./Verkeersinformatie/Roadworks/VerkeersinformatieRoadworks";
import Map from "./GoogleMaps/GoogleMaps";

render(<Map />, document.getElementById("map"));
render(<Jams />, document.getElementById("Jams"));
render(<Roadworks />, document.getElementById("Roadworks"));
render(<Radars />, document.getElementById("Radars"));
