import React from 'react';
import { browserHistory, Link } from 'react-router';
let strftime = require('strftime')

const SnapshotTile = props =>{
  let date, dateMs, dateMonthDay;
  date = new Date(props.date)
  dateMs = Date.parse(date)
  dateMonthDay = strftime('%b %o', new Date(dateMs))
  return(
    <div onClick={props.snapshotClick} id={props.id}>
      <div id={props.id}>{dateMonthDay}</div>
      <div id={props.id}>{props.journalEntry}</div>
      <img id={props.id} src={props.photo} width='134' height='134'/>
    </div>
  );
};

export default SnapshotTile;
