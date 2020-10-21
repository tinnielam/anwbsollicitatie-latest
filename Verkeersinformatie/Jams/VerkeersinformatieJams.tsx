import React from "react";
import AnwbData from "../../Data/AnwbData";

interface State {
  verkeersinformatie: Array<any>;
}

export default class VerkeersinformatieJams extends React.Component<State> {
  constructor(props) {
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
          <tr key={key.id}>
            <td>{key.road}</td>
            <td>
              {segments.start + " =>"} {segments.end}
            </td>
            <td>
              {key.from + " =>"} {key.to}
            </td>
            <td>{key.reason}</td>
            <td>{key.distance / 1000 + " KM"}</td>
            <td>{key.delay / 60 + " min"}</td>
          </tr>
        ))
      )
    );
  }

  private renderTableHeaderJams(): JSX.Element {
    return (
      <tr>
        <th>Rijksweg</th>
        <th>Traject</th>
        <th>Route</th>
        <th>Reden</th>
        <th>KM</th>
        <th>Tijd</th>
      </tr>
    );
  }

  public render(): JSX.Element {
    return (
      <div>
        <h5 id="title">Actuele Files</h5>
        <table id="verkeersinformatie">
          <tbody>
            {this.renderTableHeaderJams()}
            {this.renderTableDataJams()}
          </tbody>
        </table>
      </div>
    );
  }
}
