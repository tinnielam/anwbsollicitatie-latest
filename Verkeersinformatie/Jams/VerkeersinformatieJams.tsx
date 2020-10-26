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
              {segments.start + " =>"} {segments.end}
            </td>
            <td>
              {key.from + " =>"} {key.to}
            </td>
            <td>{key.reason}</td>
            <td>{key.distance / 1000 + " KM"}</td>
            <td>{key.delay / 60 + " min"}</td>
          </tr>
// <div className="recipe-card">
// 	<aside>
// 		<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/oatmeal.jpg" alt="Chai Oatmeal" />
// 		<a href="#" className="button"><span className="icon icon-play"></span></a>
// 	</aside>
// 	<article>
// 		<h2>Chai Oatmeal</h2>
// 		<h3>Breakfast</h3>
// 		<ul>
// 			<li><span className="icon icon-users"></span><span>1</span></li>
// 			<li><span className="icon icon-clock"></span><span>15 min</span></li>
// 			<li><span className="icon icon-level"></span><span>Beginner level</span></li>
// 			<li><span className="icon icon-calories"></span><span>248</span></li>
// 		</ul>
// 		<p>For an extra thick and creamy bowl, add oat bran.  It'll make for a hearty helping and also add more fiber to your meal.  If you love the taste of chai, you'll enjoy this spiced version with coriander, cinnamon, and turmeric.</p>
// 		<p className="ingredients"><span>Ingredients:&nbsp;</span>Milk, salt, coriander, cardamom, cinnamon, turmeric, honey, vanilla extract, regular oats, oat bran.</p>
// 	</article>
// </div>
        ))
      )
    );
  }


  public render(): JSX.Element {
    return (
      <div>
        <h5 id="title">Actuele Files</h5>
            {this.renderTableDataJams()}
      </div>
    );
  }
}


