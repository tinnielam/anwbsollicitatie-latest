import React from "react";
import Polyline from "../../GoogleMaps/GooglePolyline";

interface Props {
  map: any;
  maps: any;
  verkeersinformatieJams: Array<any>;
}

export default class JamsPolyline extends React.Component<Props> {
  private setPolylineJams() {
    const symbolJams = {
      path:
        "M223.211,127.002c-0.717,0-1.451,0.102-2.185,0.304l-8.301,2.286l-8.618-20.995c-2.441-5.948-9.659-10.787-16.089-10.787h-27.84V81.719c0-5.972-1.846-15.328-4.114-20.855l-1.391-3.388h1.054c4.819,0,8.74-3.921,8.74-8.74v-4.894c0-4.128-2.847-7.125-6.769-7.125c-0.717,0-1.451,0.103-2.185,0.304l-8.3,2.286l-8.619-20.995c-2.441-5.948-9.659-10.787-16.089-10.787H41.846c-6.429,0-13.646,4.839-16.089,10.787l-8.607,20.967l-8.195-2.257c-0.733-0.202-1.469-0.305-2.185-0.305C2.847,36.717,0,39.713,0,43.842v4.894c0,4.819,3.921,8.74,8.74,8.74h0.939l-1.391,3.388c-2.269,5.525-4.114,14.88-4.114,20.855v41.71c0,4.819,3.921,8.74,8.74,8.74h11.417c4.819,0,8.74-3.921,8.74-8.74v-10.416h56.384l-6.794,16.55l-8.196-2.258c-0.733-0.202-1.468-0.304-2.185-0.304c-3.922,0-6.769,2.997-6.769,7.125v4.894c0,4.819,3.921,8.74,8.74,8.74h0.939l-1.392,3.389c-2.268,5.525-4.114,14.88-4.114,20.855v41.71c0,4.819,3.921,8.74,8.74,8.74h11.416c4.819,0,8.74-3.921,8.74-8.74v-10.416h98.212v10.416c0,4.819,3.921,8.74,8.74,8.74h11.415c4.819,0,8.74-3.921,8.74-8.74v-41.71c0-5.975-1.846-15.33-4.114-20.855l-1.391-3.389h1.055c4.819,0,8.74-3.921,8.74-8.74v-4.894C229.98,129.998,227.133,127.002,223.211,127.002z M143.357,81.011v11.886c0,1.923-1.573,3.496-3.496,3.496h-24.767c-1.923,0-3.496-1.573-3.496-3.496V81.011c0-1.923,1.573-3.496,3.496-3.496h24.767C141.784,77.515,143.357,79.088,143.357,81.011zM52.521,92.897c0,1.923-1.573,3.496-3.496,3.496H24.259c-1.923,0-3.496-1.573-3.496-3.496V81.011c0-1.923,1.573-3.496,3.496-3.496h24.767c1.923,0,3.496,1.573,3.496,3.496V92.897z M27.755,59.197c-3.846,0-5.797-2.911-4.337-6.469l13.036-31.757c1.461-3.558,5.802-6.469,9.647-6.469h72.149c3.846,0,8.188,2.911,9.647,6.469l13.038,31.757c1.46,3.558-0.491,6.469-4.337,6.469H27.755z M88.929,143.013l13.037-31.757c1.46-3.558,5.802-6.469,9.647-6.469h72.149c3.846,0,8.188,2.911,9.648,6.469l13.036,31.757c1.461,3.558-0.491,6.469-4.337,6.469H93.266C89.42,149.482,87.469,146.571,88.929,143.013z M118.033,183.182c0,1.923-1.573,3.496-3.496,3.496H89.77c-1.923,0-3.496-1.573-3.496-3.496v-11.886c0-1.923,1.573-3.496,3.496-3.496h24.768c1.923,0,3.496,1.573,3.496,3.496V183.182z M208.867,183.182c0,1.923-1.573,3.496-3.496,3.496h-24.766c-1.923,0-3.496-1.573-3.496-3.496v-11.886c0-1.923,1.573-3.496,3.496-3.496h24.766c1.923,0,3.496,1.573,3.496,3.496V183.182z",
      fillColor: "#e90c0c",
      fillOpacity: 1,
      scale: 0.15,
      strokeColor: "black",
      strokeweight: 3,
      zIndex: 1000
    };

    return this.props.verkeersinformatieJams.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.jams
          .filter(jams => typeof jams.polyline !== "undefined")
          .map(locationJams => (
            <Polyline
              map={this.props.map}
              maps={this.props.maps}
              icon={symbolJams}
              id={locationJams.id}
              polylineColor={
                locationJams.delay >= 300 && locationJams.delay < 600
                  ? "#FFA500"
                  : locationJams.delay >= 600
                  ? "#8B0000"
                  : "#6EA31E"
              }
              lat={locationJams.fromLoc.lat}
              lon={locationJams.fromLoc.lon}
              contentString={`<div id="${locationJams.id}">
      <div style="font-size: 16px;">
        <b> ${locationJams.road} </b> <i class="fas fa-cars"></i> ${
                segments.start
              } 
        <i class="fas fa-arrow-right"></i> ${segments.end}
          </div>
          <div style="font-size: 16px;">
        <span style="color: grey;">
  ${
    typeof locationJams.delay !== "undefined"
      ? locationJams.delay / 60 + " min"
      : ""
  } ${
                typeof locationJams.distance !== "undefined"
                  ? locationJams.distance / 1000 + " KM"
                  : ""
              }
                </span>
      </div>
      <div style="font-size: 14px;">
        <span style="color: grey;">
        ${locationJams.from} <i class="fas fa-arrow-right"></i> ${
                locationJams.to
              }
        </span>
      </div>
      <div style="font-size: 14px; color: green;">
        ${typeof locationJams.reason !== "undefined" ? locationJams.reason : ""}
      </div>
    </div>`}
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
