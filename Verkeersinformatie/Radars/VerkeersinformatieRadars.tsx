import React from "react";
import AnwbData from "../../Data/AnwbData";

interface State {
  verkeersinformatie: Array<any>;
}

interface Props {}

export default class VerkeersinformatieRadars extends React.Component<
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
      .getAnwbData("radars")
      .then(data => this.setState({ verkeersinformatie: data }));
  }

  private renderTableDataRadars(): Array<string> {
    return this.state.verkeersinformatie.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.radars.map((key, index) => (
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
          </tr>
        ))
      )
    );
  }

  private renderTableHeaderRadars() {
    return (
      <tr>
        <th>Rijksweg</th>
        <th>Traject</th>
        <th>Route</th>
        <th>Reden</th>
      </tr>
    );
  }

  render(): JSX.Element {
    return (
      <div>
        <h5 id="title" className="radarsHeader">
          Actuele Flitsers
        </h5>
        <table id="verkeersinformatie">
          <tbody>
            {this.renderTableHeaderRadars()}
            {this.renderTableDataRadars()}
          </tbody>
        </table>
      </div>
    );
  }
}
