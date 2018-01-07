import React from 'react';
import { browserHistory, Link } from 'react-router';

const PlantTileComponent = props =>{
  return(
      <span>
        <div className='hvr-grow container'>
          <Link to={`/plants/${props.id}`}>
            <div className='image-gradient'>
              <img className='plantImg' src={`${props.photo}`}/>
            </div>
            <div className="bottom-left">{props.name}</div>
          </Link>
        </div>
      </span>
  );
};

export default PlantTileComponent;
