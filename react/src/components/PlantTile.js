import React from 'react';
import { browserHistory, Link } from 'react-router';

const SuperheroTileComponent = props =>{
  return(
    <div className="rows">
      <div className="small-12 medium-4 columns">
        <Link to={`/plants/${props.id}`}>
          <h1>{props.name}</h1>
          <img
            id="photo"
            src={`${props.photo}`}
            height='225'
            width='225'
          />
        </Link>
      </div>
    </div>
  );
};

export default SuperheroTileComponent;
