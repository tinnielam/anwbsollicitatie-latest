import React from "react";
import AnwbData from "../../Data/AnwbData";

class VerkeersinformatieRadars extends React.Component {
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
      .getAnwbData("radars")
      .then(data => this.setState({ verkeersinformatie: data }));
  }

  private renderTableDataRadars(): JSX.Element {
    return this.state.verkeersinformatie.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.radars.map((key, index) => (
          <tr key={key.id}>
            <td>{key.road}</td>
            <td>
              {segments.start + " =>"} {segments.end}
            </td>
            <td>
              {key.from + " =>"} {key.to}
            </td>
            <td>{key.reason}</td>
          </tr>
        ))
      )
    );
  }

  private renderTableHeaderRadars(): JSX.Element {
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
        <h5 id="title">Actuele Flitsers</h5>
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

export default VerkeersinformatieRadars;
