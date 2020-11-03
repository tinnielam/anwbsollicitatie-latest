import React from "react";
import AnwbData from "../../Data/AnwbData";

export default class VerkeersinformatieRadars extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      verkeersinformatie: []
    };
  }

  public componentDidMount(): void {
    const anwbData = new AnwbData();
    anwbData
      .getAnwbData("radars")
      .then(data => this.setState({ verkeersinformatie: data }));
  }

  private renderRoadworksData(): JSX.Element {
    return this.state.verkeersinformatie.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.radars.map((key, index) => (
          <div>
            <button className="collapsible radars">
              <i className="fas fa-chevron-down" /> {key.road}{" "}
              <i className="fas fa-camera" /> {segments.start}{" "}
              <i className="fas fa-arrow-right" /> {segments.end} {key.HM} HM
            </button>
            <div className="content">
              <div>
                {key.from} <i className="fas fa-arrow-right" /> {key.to}
              </div>
              <div>{key.reason} HM</div>
            </div>
          </div>
        ))
      )
    );
  }

  render(): JSX.Element {
    return (
      <div>
        <h5 id="title" className="radarsHeader">
          Actuele Flitsers
        </h5>
        <div id="verkeersinformatie">{this.renderRoadworksData()}</div>
      </div>
    );
  }
}
