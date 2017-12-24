import React from 'react';
import { browserHistory, Link } from 'react-router';

const PlantTileComponent = props =>{
  return(
      <div className='small-12 medium-6 large-4 column'>
        <div className="container">
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
