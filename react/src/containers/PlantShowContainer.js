import React from 'react';
import { Router, browserHistory } from 'react-router';
import TimelineContainer from './TimelineContainer'
let strftime = require('strftime')

class PlantShowContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plant: [],
      snapshots: [],
      selectedSnapshot: {}
    };
    this.snapshotClick = this.snapshotClick.bind(this);
    this.selectedSnapshot = this.selectedSnapshot.bind(this);
  }

  componentDidMount () {
    fetch(`/api/v1/plants/${this.props.params.id}`, {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        plant: body.plant,
        snapshots: body.plant.snapshots,
        selectedSnapshot: body.plant.snapshots[0]
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  snapshotClick(event) {
    event.preventDefault();
    let selectedId = +event.target.id;
    this.setState({ selectedSnapshot: this.selectedSnapshot(selectedId) })
  }

  selectedSnapshot(selectedId) {
    return this.state.snapshots.find((snapshot) =>
      (snapshot.id === selectedId)
    )
  }

  render() {
    let date, birthdate, currentDate, numberOfDays, birthdateMonthDayYear;
    date = new Date(this.state.plant.birthdate)
    birthdate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
    currentDate = new Date()
    numberOfDays = Math.ceil((currentDate - birthdate) / 8.64e7);

    birthdateMonthDayYear = strftime('%b %o, %Y', new Date(birthdate))

    // let selectedSnapshotWeekdayMonthDayYear;
    // selectedSnapshotWeekdayMonthDayYear = strftime('%b %o, %Y', new Date(this.selectedSnapshot.created_at))
    let centerColumn, rightColumn;
    if (this.state.selectedSnapshot) {
      if (this.state.selectedSnapshot.photo) {
        centerColumn = <img className="center-image" src={this.state.selectedSnapshot.photo} />
        rightColumn = <div>{this.state.selectedSnapshot.journal_entry}</div>
      } else {
        centerColumn = <div>{this.state.selectedSnapshot.journal_entry}</div>
      }
    }

    return(
      <div className='row'>
        <TimelineContainer
          plant={this.state.plant}
          snapshots={this.state.snapshots}
          snapshotClick={this.snapshotClick}
          numberOfDays={numberOfDays}
          birthdate={birthdate}
        />

        <div className='medium-4 column'>
          <h3 className='align-center'>{this.state.plant.name}</h3>
          <div>{this.state.plant.common_name}</div>
          <div>{`Began on ${birthdateMonthDayYear}`}</div>
          <br/>
          {centerColumn}
        </div>

        <div className='medium-4 column'>
          <h3>Details</h3>
          <i className="fa fa-leaf"></i><span>{this.state.plant.common_name}</span>
          <div><i className="fa fa-sun-o"></i><strong>Sunlight: </strong>{this.state.plant.sunlight_needs}</div>
          <div><i className="fa fa-tint"></i><strong>Watering: </strong>{this.state.plant.watering_needs}</div>
          <br/>
          {rightColumn}
        </div>
      </div>
    );
  }
};

export default PlantShowContainer;
