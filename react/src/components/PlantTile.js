import React from 'react';
import { browserHistory, Link } from 'react-router';

const SuperheroTileComponent = props =>{
  return(
    <div>
      <div className='small-12 medium-6 large-4 text-center columns height-align'>
        <Link to={`/plants/${props.id}`}>
          <h3>{props.name}</h3>
          <img
            className='indexPlant'
            src={`${props.photo}`}
          />
        </Link>
      </div>
    </div>
  );
};

export default SuperheroTileComponent;
