import React from 'react';
import './Marker.scss';

const Marker = (props: any) => {
    const { color, name, id, icon } = props;
    return (
      <div>
        <div
          className="pin bounce"
          style={{ backgroundColor: color, cursor: 'pointer' }}
          title={name}          
        />
        <i id="fontIcon" className={icon} ></i>
        <div className="pulse"/>
      </div>
    );
  };

  export default Marker;