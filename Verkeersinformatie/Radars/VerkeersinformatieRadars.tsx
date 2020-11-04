import React from "react";
import AnwbData from "../../Data/AnwbData";

interface Props {}

interface State {
  verkeersinformatie: Array<any>;
  totalRadars: number;
}

export default class VerkeersinformatieRadars extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      verkeersinformatie: [],
      totalRadars: null
    };
  }

  public componentDidMount(): void {
    const anwbData = new AnwbData();
    anwbData
      .getAnwbData("radars")
      .then(data =>
        this.setState({ verkeersinformatie: data, totalRadars: data.length })
      );
  }

  private renderRoadworksData() {
    return this.state.verkeersinformatie.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.radars.map((key, index) => (
          <div>
            <button className="collapsible radars" id={key.id}>
              <i className="fas fa-chevron-down" /> <b>{key.road}</b>{" "}
              <i className="fas fa-camera" /> {segments.start}{" "}
              <i className="fas fa-arrow-right" /> {segments.end}{" "}
              <b>{key.HM} HM</b>
            </button>
            <div className="content" id={key.id + "child"}>
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
          {this.state.totalRadars <= 1
            ? this.state.totalRadars + "Flitser"
            : this.state.totalRadars == 0
            ? "Er zijn momenteel geen Flitsers"
            : this.state.totalRadars + " Flitsers"}
        </h5>
        <div id="verkeersinformatie">{this.renderRoadworksData()}</div>
      </div>
    );
  }
}
