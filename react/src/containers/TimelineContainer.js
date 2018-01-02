import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Link } from 'react-router';
import SnapshotTile from '../components/SnapshotTile'
import { Scrollbars } from 'react-custom-scrollbars'

const TimelineContainer = props => {
  let snapshots = props.snapshots.map(snapshot => {
    let style, imgStyle;
    if (props.selectedSnapshot) {
      if (props.selectedSnapshot.id === snapshot.id) {
        style = 'selected'
      } else {
        style = 'unselected'
        imgStyle = 'transparent'
      }
    }
    
    return(
      <SnapshotTile
        key={snapshot.id}
        id={snapshot.id}
        journalEntry={snapshot.journal_entry}
        photo={snapshot.photo}
        date={snapshot.created_at}
        snapshotClick={props.snapshotClick}
        style={style}
        imgStyle={imgStyle}
      />
    )
  })

  return(
    <div className='medium-4 column journal-container'>
      <h3 className='days-header'><strong>{props.numberOfDays} days</strong> in your care</h3>
      <hr/>
      <Scrollbars id='scrollbar'>
        {snapshots}
      </Scrollbars>
      <div className='bottom-right pianta-button float-button' onClick={props.openModal}>NEW ENTRY</div>
    </div>
  );
};

export default TimelineContainer;
