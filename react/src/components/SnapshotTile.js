import React from 'react';
import { browserHistory, Link } from 'react-router';
let strftime = require('strftime')

const SnapshotTile = props =>{
  let date, dateMs, dateMonthDay;
  date = new Date(props.date)
  dateMs = Date.parse(date)
  dateMonthDay = strftime('%b %o', new Date(dateMs))

  let image;
  if (props.photo) {
    image = <div><img onClick={props.snapshotClick} className={`${props.imgStyle} pointer`} id={props.id} src={props.photo} width='134' height='134'/><br/></div>
  }

  return(
    <div className={`${props.style} row snapshot-row`}>
      <div id={props.id} className='small-3 column text-center'>
        <div onClick={props.snapshotClick} className='pointer snapshot-date' id={props.id}>{dateMonthDay}</div>
      </div>
      <div id={props.id} className='small-9 column'>
        <span onClick={props.snapshotClick} className='pointer' id={props.id}>{props.journalEntry}</span>
        <br/>
        {image}
        <br/>
      </div>
    </div>
  );
};

export default SnapshotTile;
