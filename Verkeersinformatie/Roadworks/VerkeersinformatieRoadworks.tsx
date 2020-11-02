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
          <div className="cards">
            <div className=" card [ is-collapsed ] ">
              <div className="card__inner [ js-expander ]">
                <span>{key.road}</span>
                <i className="fa fa-folder-o" />
              </div>
              <div className="card__expander">
                <i className="fa fa-close [ js-collapser ]" />
                Expander
              </div>
            </div>
          </div>
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
        <h5 id="title" className="roadworksHeader">
          Actuele Wegwerkzaamheden
        </h5>
        <div id="verkeersinformatie">{this.renderTableDataRoadworks()}</div>
      </div>
    );
  }
}
