import React from "react";
import AnwbData from "../../Data/AnwbData";

interface Props {}

interface State {
  verkeersinformatie: Array<any>;
  totalRoadworks: number;
}

export default class VerkeersinformatieRoadworks extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      verkeersinformatie: [],
      totalRoadworks: null
    };
  }

  public componentDidMount(): void {
    const anwbData = new AnwbData();
    anwbData
      .getAnwbData("roadworks")
      .then(data =>
        this.setState({ verkeersinformatie: data, totalRoadworks: data.length })
      )
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

  private renderRoadworksData() {
    return this.state.verkeersinformatie.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.roadworks.map((key, index) => (
          <div>
            <button className="collapsible roadworks" id={key.id}>
              <i className="fas fa-chevron-down" /> <b>{key.road}</b>{" "}
              <i className="fas fa-tools" /> {segments.start}{" "}
              <i className="fas fa-arrow-right" /> {segments.end}
            </button>
            <div className="content" id={key.id + "child"}>
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
          {this.state.totalRoadworks <= 1
            ? this.state.totalRoadworks + " Wegwerk"
            : this.state.totalRoadworks == 0
            ? "Er zijn momenteel geen Wegwerkzaamheden"
            : this.state.totalRoadworks + " Wegwerkzaamheden"}
        </h5>
        <div id="verkeersinformatie">{this.renderRoadworksData()}</div>
      </div>
    );
  }
}
