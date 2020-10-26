import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./GoogleMarker";
import Polyline from "./GooglePolyline";
import AnwbData from "../Data/AnwbData";
import Radars from "../Verkeersinformatie/Radars/VerkeersinformatieRadarsMaps";

interface State {
  verkeersinformatieJams: Array<any>;
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

  public onMapLoaded(map, maps) {
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
  }

  private setRoadworksMarkers() {
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

  private setJamsMarkers() {
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

  private setPolylineRoadworks() {
    const symbolRoadworks = {
      path:
        "M354.5,173.3c0,38.3,31.1,69.3,69.4,69.3c34.7,0,63.3-25.4,68.5-58.6l46.3,12.9l3.8-13.3l-35.9-10c4.2-38.7-20-75.9-58.8-86.8c-43.2-12.1-88.1,13.1-100.2,56.2l12.3,3.4C356.5,154.8,354.5,163.8,354.5,173.3z" +
        "M927.9,687.5c0,0-25.9,41.1-47.9,89.2c-33.6-183.8-123.5-212.9-123.5-212.9s-22.7,28.8-50.3,71.5l-137.3-66.9c1.8-11.2-0.6-23.3-9.4-34.2c-53.8-66-65-160.8-108.9-233.1c-1.8-2.9-3.8-5.5-5.9-7.8c-17.1-32.5-57.2-49.4-91.4-42.9c-110.6-31.4-206.2-1.2-256.8,108c-21.9,47.3,46.5,88.8,70.5,44.8l89.4,43.6c-11.8,30.5-25.3,60.4-40.6,89.7c-55.3,90.2-125.9,171.3-195.1,251c-35,40.3,23.7,99.4,58.9,58.8c56.5-65.2,114.2-131.4,164.6-202.2c5.2,3.3,10.7,6.1,16.4,8.1c3.6,2.7,7.8,4.9,12.7,6.6c36.6,12.1,69.4,32,99.6,55.4c-20.8,49.3-41.1,99.2-73.6,142.2c-32.4,42.8,40,84.2,71.9,42c39.8-52.7,61.3-115.8,87.9-175.5c7.3-16.3,8.6-37.4-6.5-50.4c-30-25.8-61.5-48.7-95.8-67.1c15-29.3,28.8-59.2,41.1-89.6l74.8,36.5c8.1,14.1,17.1,27.7,27.6,40.6c17.5,21.5,41.5,16.1,56.1,0.2l134.8,65.7c-39.7,65-82.8,151.7-82.8,221.7h241l140.5,1.6C983.5,823.4,927.9,687.5,927.9,687.5z M266.1,420.8l-86.8-42.3c12.4-22.9,28.5-44,53.8-53.6c19.9-7.6,41.2-7.1,62.2-3.3C287.2,355.3,277.5,388.4,266.1,420.8z M408.2,490c5.9-15.6,11.3-31.3,16.4-47.1c8.9,23.1,17.7,46.2,27.8,68.7L408.2,490z",
      fillColor: "#484848",
      fillOpacity: 1,
      scale: 0.04,
      strokeColor: "white",
      strokeWeight: 2
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

  private setPolylineJams() {
    const symbolJams = {
      path:
        "M988.5,683l-8.9-26c-4.9-14.4-20.6-26-35-26h-30.3c-18.9-53.8-38.6-101.5-45.1-116.2c-11.9-27-49.9-32.8-70.9-38.7c0,0-35-10.7-151.6-10.7c-116.6,0-151.6,10.7-151.6,10.7c-24.5,8.3-58.6,13.6-72.1,39.9c-5.4,10.5-25.4,59.6-44.6,115h-30c-14.4,0-30,11.6-35,26l-8.9,26c-4.9,14.4,2.7,31.1,17.1,31.1h30c-8,23.4-13.4,34.2-13.4,34.2c-2.2,3.8-3.8,21.4-3.8,26.2v194.8c0,14.4,11.6,26,26,26h72.3c14.4,0,26-11.6,26-26v-36.5h375.8v36.5c0,14.4,11.6,26,26,26H933c14.4,0,26-11.6,26-26V774.4c0-4.7-1.6-22.4-3.8-26.2c0,0-5.5-10.8-13.6-34.2h29.7C985.8,714.1,993.4,697.3,988.5,683z M493.2,839.1h-34.6c-30.9,0-61.8-4.5-61.8-26v-26c0-25.1,13.3-26,27.7-26c14,0,41.8,13,60.1,21.9c20,9.8,42.3,17.9,42.3,34.2C527,832.2,519.3,839.1,493.2,839.1z M421,658.7c18.3-72.5,38.1-99.7,42.5-111.1c3.5-8.3,6.9-33.9,183.3-33.9s180.5,29.3,181,29.6c5.4,15.5,27,48.6,44.3,115.4c0,0-74.5,24.2-225.2,24.2S421,658.7,421,658.7z M896.7,813.1c0,21.5-30.9,26-61.8,26h-34.6c-26,0-33.7-6.9-33.7-21.9c0-16.3,22.3-24.4,42.3-34.2c18.3-9,46.1-21.9,60.1-21.9c14.4,0,27.7,0.9,27.7,26V813.1L896.7,813.1z" +
        "M611.3,346.4L611.3,346.4c-16-45.3-32.4-86.1-41.1-106.8C579,260.4,595.4,301.1,611.3,346.4z" +
        "M348.5,589.1h0.5c15.4-42.4,30.8-80.3,36.9-92.3c19.3-37.5,58-49,83.6-56.6c4.3-1.3,8.4-2.5,12.3-3.8c8-2.5,48.1-13,165-13c1,0,1.7,0,2.6,0c-0.3-0.9-0.5-1.5-0.9-2.4h29.7c14.4,0,22-16.7,17.1-31.1l-8.9-26c-4.9-14.4-20.6-26-35-26h-30.3c-18.9-53.8-38.6-101.5-45.1-116.2c-11.9-27-49.9-32.8-70.9-38.7c0,0-35-10.7-151.6-10.7c-116.6,0-151.6,10.7-151.6,10.7c-24.5,8.3-58.5,13.6-72.1,39.9c-5.4,10.5-25.4,59.6-44.6,115H55.4c-14.4,0-30,11.6-35,26l-8.9,26C6.6,404.2,14.2,421,28.6,421h30c-8,23.4-13.4,34.2-13.4,34.2c-2.2,3.8-3.8,21.4-3.8,26.2v194.8c0,14.4,11.6,26,26,26h72.3c14.4,0,26-11.6,26-26v-36.5h110.1C287.8,610.3,317.4,589.1,348.5,589.1z M170.5,254.6c3.5-8.3,6.9-33.9,183.3-33.9c176.3,0,180.5,29.3,181,29.6c5.4,15.5,27,48.6,44.3,115.4c0,0-74.5,24.2-225.2,24.2C203,389.9,128,365.6,128,365.6C146.2,293.2,166.1,266,170.5,254.6z M200.2,546.1h-34.5c-30.9,0-61.8-4.5-61.8-26v-26c0-25.1,13.3-26,27.7-26c14,0,41.8,13,60.1,21.9c20,9.8,42.3,17.9,42.3,34.2C233.9,539.1,226.2,546.1,200.2,546.1z" +
        "M463.5,87.1c3.5-8.3,6.9-33.9,183.3-33.9c176.3,0,180.5,29.3,181,29.6c5.4,15.5,27,48.6,44.3,115.4c0,0-74.5,24.2-225.2,24.2c-8.9,0-16.7-0.3-25.1-0.5c7.1,17.1,17.5,43.1,28.9,74.1h0.9c32.4,0,63.8,22.9,74.5,54.3l8.9,26c5.7,16.5,4.7,34.2-2,49.6c51.4,3.2,72.8,8.7,77.6,10.1l7.8,2c26.5,6.7,70.7,17.9,89.2,59.9c2.7,6.2,8.2,19.4,15.2,36.8H933c14.4,0,26-11.6,26-26V313.9c0-4.7-1.6-22.4-3.8-26.2c0,0-5.5-10.8-13.6-34.2h29.7c14.4,0,22-16.7,17.1-31.1l-9-26c-4.9-14.4-20.6-26-35-26h-30.3c-18.9-53.8-38.6-101.5-45.1-116.2c-11.9-27-49.9-32.8-70.9-38.7c0,0-35-10.7-151.6-10.7c-116.6,0-151.6,10.7-151.6,10.7c-24.5,8.3-58.6,13.6-72.1,39.9c-4,7.9-16.3,37.6-30.4,75.4c19.2,0.4,35,1.2,49.2,2.1C452.3,107.2,460.9,94.1,463.5,87.1z M896.7,326.5v26c0,21.5-30.9,26-61.8,26h-34.6c-26,0-33.7-6.9-33.7-21.9c0-16.2,22.4-24.4,42.3-34.2c18.3-9,46.1-21.9,60.1-21.9C883.3,300.5,896.7,301.4,896.7,326.5z",
      fillColor: "orange",
      fillOpacity: 1,
      scale: 0.03,
      strokeColor: "#43464B",
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

  private bla() {
    let bla = new Radars({});
    bla.setRadarsMarkers();
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
          {this.bla()}
          {this.setPolylineJams()}
          {this.setPolylineRoadworks()}
          {this.setJamsMarkers()}
          {this.setRoadworksMarkers()}
        </GoogleMapReact>
      </div>
    );
  }
}
