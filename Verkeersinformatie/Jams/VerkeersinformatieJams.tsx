import React from "react";
import AnwbData from "../../Data/AnwbData";

interface Props {}

interface State {
  verkeersinformatie: Array<object>;
  totalJams: number;
}

export default class VerkeersinformatieJams extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      verkeersinformatie: [],
      totalJams: null
    };
  }

  public componentDidMount(): void {
    const anwbData = new AnwbData();
    anwbData
      .getAnwbData("jams")
      .then(data =>
        this.setState({ verkeersinformatie: data, totalJams: data.length })
      );
  }

  private renderTableDataJams() {
    return this.state.verkeersinformatie.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.jams.map((key, index) => (
          <div>
            <button className="collapsible jams" id={key.id}>
              <i className="fas fa-chevron-down" /> <b>{key.road}</b>{" "}
              <i className="fas fa-cars" /> {segments.start}{" "}
              <i className="fas fa-arrow-right" /> {segments.end}{" "}
              {typeof key.distance !== "undefined"
                ? key.distance / 1000 + " KM"
                : " "}{" "}
              {typeof key.delay !== "undefined" ? key.delay / 60 + " min" : ""}
            </button>
            <div className="content" id={key.id + "child"}>
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
          {this.state.totalJams <= 1
            ? this.state.totalJams + "File"
            : this.state.totalJams == 0
            ? "Er zijn momenteel geen Files"
            : this.state.totalJams + " Files"}
        </h5>
        <div id="verkeersinformatie">{this.renderTableDataJams()}</div>
      </div>
    );
  }
}
