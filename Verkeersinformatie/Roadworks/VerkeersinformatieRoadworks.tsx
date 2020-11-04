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
      .then(data => this.setState({ verkeersinformatie: data }))
      .then(() => this.renderCards());
  }

  private renderCards() {
    const coll = document.getElementsByClassName("collapsible");
    for (let i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  }

  private renderRoadworksData(): JSX.Element {
    return this.state.verkeersinformatie.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.roadworks.map((key, index) => (
          <div className={key.id}>
            <button className="collapsible roadworks">
              <i className="fas fa-chevron-down" /> <b>{key.road}</b>{" "}
              <i className="fas fa-tools" /> {segments.start}{" "}
              <i className="fas fa-arrow-right" /> {segments.end}
            </button>
            <div className="content">
              <div>
                {key.from} <i className="fas fa-arrow-right" /> {key.to}
              </div>
              <div>{key.reason}</div>
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
