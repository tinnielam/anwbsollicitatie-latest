import React from "react";
import AnwbData from "../../Data/AnwbData";

export default class VerkeersinformatieJams extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      verkeersinformatie: []
    };
  }

  public componentDidMount(): void {
    const anwbData = new AnwbData();
    anwbData
      .getAnwbData("jams")
      .then(data => this.setState({ verkeersinformatie: data }));
  }

  private renderTableDataJams(): JSX.Element {
    return this.state.verkeersinformatie.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.jams.map((key, index) => (
          <div>
            <button className="collapsible jams">
              <i className="fas fa-chevron-down" /> {key.road}{" "}
              <i className="fas fa-cars" /> {segments.start}{" "}
              <i className="fas fa-arrow-right" /> {segments.end}{" "}
              {typeof key.distance !== "undefined"
                ? key.distance / 1000 + " KM"
                : " "}{" "}
              {typeof key.delay !== "undefined" ? key.delay / 60 + " min" : ""}
            </button>
            <div className="content">
              <div>
                {key.from} <i className="fas fa-arrow-right" /> {key.to}
              </div>
              <div>
                {" "}
                {typeof key.distance !== "undefined"
                  ? key.distance / 1000 + " KM"
                  : ""}{" "}
                {typeof key.delay !== "undefined"
                  ? key.delay / 60 + " min"
                  : ""}
              </div>
              <div> {typeof key.reason !== "undefined" ? key.reason : ""}</div>
            </div>
          </div>
        ))
      )
    );
  }

  public render(): JSX.Element {
    return (
      <div>
        <h5 id="title" className="jamsHeader">
          Actuele Files
        </h5>
        <div id="verkeersinformatie">{this.renderTableDataJams()}</div>
      </div>
    );
  }
}
