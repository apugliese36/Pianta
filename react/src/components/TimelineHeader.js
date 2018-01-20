import React from 'react';

const TimelineHeader = props => {

  return(
    <div>
      <h3 className='days-header'><strong>{props.numberOfDays} days</strong> in your care</h3>
    </div>
  );
};

export default TimelineHeader;
