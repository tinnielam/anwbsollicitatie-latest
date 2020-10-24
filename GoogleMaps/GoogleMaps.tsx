import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./GoogleMarker";
import Polyline from "./GooglePolyline";
import AnwbData from "../Data/AnwbData";

interface State {
  verkeersinformatieJams: Array<any>;
  verkeersinformatieRadars: Array<any>;
  verkeersinformatieRoadworks: Array<any>;
  map: object;
  maps: object;
}

interface Props {
  displayType: string;
  center: { lat: number; lng: number };
  zoom: number;
}

export default class GoogleMaps extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      verkeersinformatieJams: [],
      verkeersinformatieRadars: [],
      verkeersinformatieRoadworks: [],
      map: null,
      maps: null
    };
  }

  static defaultProps = {
    displayType: "none",
    center: {
      lat: 52.254709,
      lng: 5.353826
    },
    zoom: 8
  };

  private onMapLoaded(map, maps) {
    this.setState({
      map: map,
      maps: maps
    });
  }

  public componentDidMount(): void {
    const anwbDataJams = new AnwbData();
    anwbDataJams
      .getAnwbData("jams")
      .then(data => this.setState({ verkeersinformatieJams: data }));

    const anwbDataRoadworks = new AnwbData();
    anwbDataRoadworks
      .getAnwbData("roadworks")
      .then(data => this.setState({ verkeersinformatieRoadworks: data }));

    const anwbDataRadars = new AnwbData();
    anwbDataRadars
      .getAnwbData("radars")
      .then(data => this.setState({ verkeersinformatieRadars: data }));
  }

  private getToLocationRoadworks() {
    return this.state.verkeersinformatieRoadworks.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.roadworks
          .filter(
            roadworks =>
              typeof roadworks.fromLoc !== "undefined" && !roadworks.polyline
          )
          .map(locationRoadworks => (
            <Marker
              lat={locationRoadworks.fromLoc.lat}
              lng={locationRoadworks.fromLoc.lon}
              color="#484848"
              className="pin roadworks bounce"
              name="text"
            />
          ))
      )
    );
  }

  private getToLocationJams() {
    return this.state.verkeersinformatieJams.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.jams
          .filter(jams => typeof jams.fromLoc !== "undefined" && !jams.polyline)
          .map(locationJams => (
            <Marker
              lat={locationJams.fromLoc.lat}
              lng={locationJams.fromLoc.lon}
              color="#DC143C"
              className="pin jams bounce"
              name="text"
            />
          ))
      )
    );
  }

  private getToLocationRadars() {
    return this.state.verkeersinformatieRadars.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.radars.map((key, index) => (
          <Marker
            lat={key.fromLoc.lat}
            lng={key.fromLoc.lon}
            color="#4863A0"
            className="pin radars bounce"
            name="text"
          />
        ))
      )
    );
  }

  private verkeersinformatiePolylineRoadworks() {
    const symbolRoadworks = {
      path:
        "M354.5,173.3c0,38.3,31.1,69.3,69.4,69.3c34.7,0,63.3-25.4,68.5-58.6l46.3,12.9l3.8-13.3l-35.9-10c4.2-38.7-20-75.9-58.8-86.8c-43.2-12.1-88.1,13.1-100.2,56.2l12.3,3.4C356.5,154.8,354.5,163.8,354.5,173.3z" +
        "M927.9,687.5c0,0-25.9,41.1-47.9,89.2c-33.6-183.8-123.5-212.9-123.5-212.9s-22.7,28.8-50.3,71.5l-137.3-66.9c1.8-11.2-0.6-23.3-9.4-34.2c-53.8-66-65-160.8-108.9-233.1c-1.8-2.9-3.8-5.5-5.9-7.8c-17.1-32.5-57.2-49.4-91.4-42.9c-110.6-31.4-206.2-1.2-256.8,108c-21.9,47.3,46.5,88.8,70.5,44.8l89.4,43.6c-11.8,30.5-25.3,60.4-40.6,89.7c-55.3,90.2-125.9,171.3-195.1,251c-35,40.3,23.7,99.4,58.9,58.8c56.5-65.2,114.2-131.4,164.6-202.2c5.2,3.3,10.7,6.1,16.4,8.1c3.6,2.7,7.8,4.9,12.7,6.6c36.6,12.1,69.4,32,99.6,55.4c-20.8,49.3-41.1,99.2-73.6,142.2c-32.4,42.8,40,84.2,71.9,42c39.8-52.7,61.3-115.8,87.9-175.5c7.3-16.3,8.6-37.4-6.5-50.4c-30-25.8-61.5-48.7-95.8-67.1c15-29.3,28.8-59.2,41.1-89.6l74.8,36.5c8.1,14.1,17.1,27.7,27.6,40.6c17.5,21.5,41.5,16.1,56.1,0.2l134.8,65.7c-39.7,65-82.8,151.7-82.8,221.7h241l140.5,1.6C983.5,823.4,927.9,687.5,927.9,687.5z M266.1,420.8l-86.8-42.3c12.4-22.9,28.5-44,53.8-53.6c19.9-7.6,41.2-7.1,62.2-3.3C287.2,355.3,277.5,388.4,266.1,420.8z M408.2,490c5.9-15.6,11.3-31.3,16.4-47.1c8.9,23.1,17.7,46.2,27.8,68.7L408.2,490z",
      fillColor: "orange",
      fillOpacity: 1,
      scale: 0.03,
      strokeColor: "black",
      strokeWeight: 1
    };

    return this.state.verkeersinformatieRoadworks.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.roadworks
          .filter(roadworks => typeof roadworks.polyline !== "undefined")
          .map(locationRoadworks => (
            <div style={{ display: "none" }}>
              <Polyline
                map={this.state.map}
                maps={this.state.maps}
                icon={symbolRoadworks}
                polylineColor={"#484848"}
                markers={google.maps.geometry.encoding.decodePath(
                  locationRoadworks.polyline
                )}
              />
            </div>
          ))
      )
    );
  }

  private verkeersinformatiePolylineJams() {
    const symbolJams = {
      path:
        "M223.211,127.002c-0.717,0-1.451,0.102-2.185,0.304l-8.301,2.286l-8.618-20.995c-2.441-5.948-9.659-10.787-16.089-10.787h-27.84V81.719c0-5.972-1.846-15.328-4.114-20.855l-1.391-3.388h1.054c4.819,0,8.74-3.921,8.74-8.74v-4.894c0-4.128-2.847-7.125-6.769-7.125c-0.717,0-1.451,0.103-2.185,0.304l-8.3,2.286l-8.619-20.995c-2.441-5.948-9.659-10.787-16.089-10.787H41.846c-6.429,0-13.646,4.839-16.089,10.787l-8.607,20.967l-8.195-2.257c-0.733-0.202-1.469-0.305-2.185-0.305C2.847,36.717,0,39.713,0,43.842v4.894c0,4.819,3.921,8.74,8.74,8.74h0.939l-1.391,3.388c-2.269,5.525-4.114,14.88-4.114,20.855v41.71c0,4.819,3.921,8.74,8.74,8.74h11.417c4.819,0,8.74-3.921,8.74-8.74v-10.416h56.384l-6.794,16.55l-8.196-2.258c-0.733-0.202-1.468-0.304-2.185-0.304c-3.922,0-6.769,2.997-6.769,7.125v4.894c0,4.819,3.921,8.74,8.74,8.74h0.939l-1.392,3.389c-2.268,5.525-4.114,14.88-4.114,20.855v41.71c0,4.819,3.921,8.74,8.74,8.74h11.416c4.819,0,8.74-3.921,8.74-8.74v-10.416h98.212v10.416c0,4.819,3.921,8.74,8.74,8.74h11.415c4.819,0,8.74-3.921,8.74-8.74v-41.71c0-5.975-1.846-15.33-4.114-20.855l-1.391-3.389h1.055c4.819,0,8.74-3.921,8.74-8.74v-4.894C229.98,129.998,227.133,127.002,223.211,127.002z M143.357,81.011v11.886c0,1.923-1.573,3.496-3.496,3.496h-24.767c-1.923,0-3.496-1.573-3.496-3.496V81.011c0-1.923,1.573-3.496,3.496-3.496h24.767C141.784,77.515,143.357,79.088,143.357,81.011zM52.521,92.897c0,1.923-1.573,3.496-3.496,3.496H24.259c-1.923,0-3.496-1.573-3.496-3.496V81.011c0-1.923,1.573-3.496,3.496-3.496h24.767c1.923,0,3.496,1.573,3.496,3.496V92.897z M27.755,59.197c-3.846,0-5.797-2.911-4.337-6.469l13.036-31.757c1.461-3.558,5.802-6.469,9.647-6.469h72.149c3.846,0,8.188,2.911,9.647,6.469l13.038,31.757c1.46,3.558-0.491,6.469-4.337,6.469H27.755z M88.929,143.013l13.037-31.757c1.46-3.558,5.802-6.469,9.647-6.469h72.149c3.846,0,8.188,2.911,9.648,6.469l13.036,31.757c1.461,3.558-0.491,6.469-4.337,6.469H93.266C89.42,149.482,87.469,146.571,88.929,143.013z M118.033,183.182c0,1.923-1.573,3.496-3.496,3.496H89.77c-1.923,0-3.496-1.573-3.496-3.496v-11.886c0-1.923,1.573-3.496,3.496-3.496h24.768c1.923,0,3.496,1.573,3.496,3.496V183.182z M208.867,183.182c0,1.923-1.573,3.496-3.496,3.496h-24.766c-1.923,0-3.496-1.573-3.496-3.496v-11.886c0-1.923,1.573-3.496,3.496-3.496h24.766c1.923,0,3.496,1.573,3.496,3.496V183.182z",
      fillColor: "orange",
      fillOpacity: 1,
      scale: 0.13,
      strokeColor: "black",
      strokeWeight: 1
    };

    return this.state.verkeersinformatieJams.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.jams
          .filter(jams => typeof jams.polyline !== "undefined")
          .map(locationJams => (
            <div style={{ display: this.props.displayType }}>
              <Polyline
                map={this.state.map}
                maps={this.state.maps}
                icon={symbolJams}
                polylineColor={"orange"}
                markers={google.maps.geometry.encoding.decodePath(
                  locationJams.polyline
                )}
              />
            </div>
          ))
      )
    );
  }

  render() {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyCVaY96z82QyROvA7BvgOLIZs_rtkWeD2A",
            libraries: ["geometry"]
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => this.onMapLoaded(map, maps)}
        >
          {this.verkeersinformatiePolylineJams()}
          {this.verkeersinformatiePolylineRoadworks()}
          {this.getToLocationJams()}
          {this.getToLocationRadars()}
          {this.getToLocationRoadworks()}
        </GoogleMapReact>
      </div>
    );
  }
}
