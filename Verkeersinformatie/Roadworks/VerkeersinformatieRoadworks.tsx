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

  private renderTableDataRoadworks(): JSX.Element {
    return this.state.verkeersinformatie.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.roadworks.map((key, index) => (
          <tr key={key.id}>
            <td>{key.road}</td>
            <td>
              {key.from + " =>"} {key.to}
            </td>
            <td>{key.reason}</td>
          </tr>
        ))
      )
    );
  }

  private renderTableHeaderRoadworks(): JSX.Element {
    return (
      <tr>
        <th>Rijksweg</th>
        <th>Route</th>
        <th>Reden</th>
      </tr>
    );
  }

  public render(): JSX.Element {
    return (
      <div>
        <h5 id="title">Actuele Wegwerkzaamheden</h5>
        <table id="verkeersinformatie">
          <tbody>
            {this.renderTableHeaderRoadworks()}
            {this.renderTableDataRoadworks()}
          </tbody>
        </table>
      </div>
    );
  }
}
