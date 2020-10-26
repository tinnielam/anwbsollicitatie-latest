import React from "react";
import Polyline from "./GooglePolyline";
import AnwbData from "../Data/AnwbData";

interface State {
  verkeersinformatieJams: Array<any>;
}

interface Props {
  map: any;
  maps: any;
}

export default class JamsPolyline extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      verkeersinformatieJams: []
    };
  }

  public componentDidMount(): void {
    const anwbDataJams = new AnwbData();
    anwbDataJams
      .getAnwbData("jams")
      .then(data => this.setState({ verkeersinformatieJams: data }));
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
            <Polyline
              map={this.props.map}
              maps={this.props.maps}
              icon={symbolJams}
              polylineColor={"orange"}
              markers={google.maps.geometry.encoding.decodePath(
                locationJams.polyline
              )}
            />
          ))
      )
    );
  }
  render() {
    return this.setPolylineJams();
  }
}
