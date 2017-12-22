import React from 'react';
import { Router, browserHistory } from 'react-router';
import TimelineContainer from './TimelineContainer'

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
    let date, birthdate, currentDate, numberOfDays;
    if (this.state.plant.birthdate) {
      date = new Date(this.state.plant.birthdate)
      birthdate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
      currentDate = new Date()
      numberOfDays = Math.ceil((currentDate - birthdate) / 8.64e7);
    } else {
      numberOfDays = 36
    }
    
    return(
      <div>
        <TimelineContainer
          plant={this.state.plant}
          snapshots={this.state.snapshots}
          numberOfDays={numberOfDays}
          birthdate={birthdate}
        />
      </div>
    );
  }
};

export default PlantShowContainer;
