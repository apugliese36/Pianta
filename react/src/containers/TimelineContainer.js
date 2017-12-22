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
    <div>
      <h3>{props.numberOfDays} days in your care</h3>
      {snapshots}
    </div>
  );
};

export default TimelineContainer;
