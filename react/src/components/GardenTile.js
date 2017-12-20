import React from 'react';
import { browserHistory, Link } from 'react-router';

const SuperheroTileComponent = props =>{
  return(
    <div className="rows">
      <div id="post-module" className="small-12 medium-4 columns">
        <Link to={`/garden/${props.id}`}>
          <h1>{props.name}</h1>
          <img
            id="photo" src={`${props.photo}`}
            height='200'
            width='300'
          />
        </Link>
      </div>
    </div>
  );
};

export default SuperheroTileComponent;
