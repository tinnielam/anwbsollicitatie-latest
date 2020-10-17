import React, { Component } from "react";
import "./Marker.scss";

// interface Props {
//   color: string;
//   name: string;
//   icon: string;
// }

// class Marker extends Component<Props> {
//   static defaultProps: Props = {
//     color: "",
//     name: "",
//     icon: ""
//   };

//   render() {
//     return (
//       <div>
//         <div
//           className="pin bounce"
//           style={{ backgroundColor: this.props.color, cursor: "pointer" }}
//           title={name}
//         />
//         <i id="fontIcon" className={this.props.icon} />
//         <div className="pulse" />
//       </div>
//     );
//   }
// }

//export default Marker;

const Marker = (props: any) => {
  const { color, name, id, icon } = props;
  return (
    <div>
      <div
        className="pin bounce"
        style={{ backgroundColor: color, cursor: "pointer" }}
        title={name}
      />
      <i id="fontIcon" className={icon} />
      <div className="pulse" />
    </div>
  );
};

export default Marker;
