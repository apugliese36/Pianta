import React from 'react';
import { browserHistory, Link } from 'react-router';

const PlantTileComponent = props =>{
  return(
      <div className='small-12 medium-6 large-4 text-center column'>
        <Link to={`/plants/${props.id}`}>
          <h3>{props.name}</h3>
          <img
            className='indexPlant'
            src={`${props.photo}`}
          />
        </Link>
      </div>
  );
};

export default PlantTileComponent;
