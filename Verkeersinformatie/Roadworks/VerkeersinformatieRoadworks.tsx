import React from "react";
import AnwbData from "../../Data/AnwbData";

export default class VerkeersinformatieRoadworks extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      verkeersinformatie: []
    };
  }

  public componentDidMount(): void {
    const anwbData = new AnwbData();
    anwbData
      .getAnwbData("roadworks")
      .then(data => this.setState({ verkeersinformatie: data }));
  }

  private renderRoadworksData(): JSX.Element {
    return this.state.verkeersinformatie.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.roadworks.map((key, index) => (
          <div>
            <button className="collapsible roadworks">
              <i className="fas fa-chevron-down" /> {key.road}{" "}
              <i className="fas fa-tools" /> {segments.start}{" "}
              <i className="fas fa-arrow-right" /> {segments.end}
            </button>
            <div className="content">
              <p>
                {key.from} <i className="fas fa-arrow-right" /> {key.to}
                {key.reason}
              </p>
            </div>
          </div>
        ))
      )
    );
  }

  public render(): JSX.Element {
    return (
      <div>
        <h5 id="title" className="roadworksHeader">
          Actuele Wegwerkzaamheden
        </h5>
        <div id="verkeersinformatie">{this.renderRoadworksData()}</div>
      </div>
    );
  }
}
