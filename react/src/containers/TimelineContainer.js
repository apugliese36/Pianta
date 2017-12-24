import React from 'react';
import { browserHistory, Link } from 'react-router';
import SnapshotTile from '../components/SnapshotTile'

const TimelineContainer = props => {
  let snapshots = props.snapshots.map(snapshot => {
    return(
      <SnapshotTile
        journalEntry={snapshot.journal_entry}
        photo={snapshot.photo}
        date={snapshot.created_at}
      />
    )
  })

  return(
    <div className='medium-4 column journal-container'>
      <h3>{props.numberOfDays} days in your care</h3>
      <hr/>
      {snapshots}
      <div className='bottom-right'>New Entry</div>
    </div>
  );
};

export default TimelineContainer;
