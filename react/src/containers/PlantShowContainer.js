import React from 'react';
import { Router, browserHistory } from 'react-router';
import TimelineContainer from './TimelineContainer'
let strftime = require('strftime')

class PlantShowContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plant: [],
      snapshots: []
    };
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
        snapshots: body.plant.snapshots
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let date, birthdate, currentDate, numberOfDays, birthdateMonthDayYear;
    if (this.state.plant.birthdate) {
      date = new Date(this.state.plant.birthdate)
      birthdate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
      currentDate = new Date()
      numberOfDays = Math.ceil((currentDate - birthdate) / 8.64e7);
    } else {
      numberOfDays = 36
    }

    birthdateMonthDayYear = strftime('%b %o, %Y', new Date(birthdate))

    return(
      <div className='row'>
        <TimelineContainer
          plant={this.state.plant}
          snapshots={this.state.snapshots}
          numberOfDays={numberOfDays}
          birthdate={birthdate}
        />
        <div className='medium-4 column'>
          <h3 className='align-center'>{this.state.plant.name}</h3>
          <div>{this.state.plant.common_name}</div>
          <div>{`Began on ${birthdateMonthDayYear}`}</div>
        </div>
        <div className='medium-4 column'>
          <h3>Details</h3>
          <i className="fa fa-leaf"></i><span>{this.state.plant.common_name}</span>
          <div><i className="fa fa-sun-o"></i><strong>Sunlight: </strong>{this.state.plant.sunlight_needs}</div>
          <div><i className="fa fa-tint"></i><strong>Watering: </strong>{this.state.plant.watering_needs}</div>
        </div>
      </div>
    );
  }
};

export default PlantShowContainer;
