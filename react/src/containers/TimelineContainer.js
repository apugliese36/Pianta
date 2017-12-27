import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Link } from 'react-router';
import SnapshotTile from '../components/SnapshotTile'
import { Scrollbars } from 'react-custom-scrollbars'

const TimelineContainer = props => {
  let snapshots = props.snapshots.map(snapshot => {
    return(
      <SnapshotTile
        key={snapshot.id}
        id={snapshot.id}
        journalEntry={snapshot.journal_entry}
        photo={snapshot.photo}
        date={snapshot.created_at}
        snapshotClick={props.snapshotClick}
      />
    )
  })

  return(
    <div className='medium-4 column journal-container'>
      <h3>{props.numberOfDays} days in your care</h3>
      <hr/>
      <Scrollbars id='scrollbar'>
        {snapshots}
      </Scrollbars>
      <div className='bottom-right' onClick={props.openModal}>New Entry</div>
    </div>
  );
};

export default TimelineContainer;
