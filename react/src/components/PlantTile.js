import React from 'react';
import { browserHistory, Link } from 'react-router';

const PlantTileComponent = props =>{
  return(
      <div className='small-12 medium-4 large-3 column text-center'>
        <div className='hvr-grow container'>
          <Link to={`/plants/${props.id}`}>
            <img className='indexPlant' src={`${props.photo}`}/>
            <div className="bottom-left">{props.name}</div>
          </Link>
        </div>
      </div>
  );
};

export default PlantTileComponent;


{/* <h3>{props.name}</h3>
<img
  className='indexPlant'
  src={`${props.photo}`}
/> */}

{/* <div className="container">
  <img className='indexPlant' src={`${props.photo}`}/>
  <div className="bottom-left">{props.name}</div>
</div> */}
