import React from "react";
import AnwbData from "../../Data/AnwbData";

interface State {
  verkeersinformatie: Array<any>;
}

interface Props {}

export default class VerkeersinformatieJams extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
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

  private renderTableDataJams() {
    return this.state.verkeersinformatie.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.jams.map((key, index) => (
          <tr key={key.id}>
            <td>{key.road}</td>
            <td>
              {segments.start} <i className="fas fa-arrow-right" />{" "}
              {segments.end}
            </td>
            <td>
              {key.from} <i className="fas fa-arrow-right" /> {key.to}
            </td>
            <td>{key.reason}</td>
            <td>{key.distance / 1000 + " KM"}</td>
            <td>{key.delay / 60 + " min"}</td>
          </tr>
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
        {this.renderTableDataJams()}
      </div>
    );
  }
}
