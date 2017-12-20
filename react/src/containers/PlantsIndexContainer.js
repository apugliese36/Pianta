import React, { Component } from 'react';
import PlantTile from '../components/PlantTile';
import { Route, IndexRoute, Router, browserHistory, Link, Redirect } from 'react-router';

class PlantsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gardens: [],
      currentGarden: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentGarden: Number(event.target.id)
    });
  }

  componentDidMount () {
  fetch('/api/v1/plants')
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
      gardens: body
    });
  })
  .catch(error => console.error(`Error in fetch: ${error.message}`));
}

  render () {
    let gardens = this.state.gardens.map(garden => {
      return (
        <PlantTile
          key={garden.id}
          id={garden.id}
          name={garden.name}
          photo={garden.photo}
        />
      );
    });

    return (
      <div>
        <h1 id="title">Your Plants</h1>
          {gardens}
          <Link id="add" to={`/plants/new`}>Add Plant</Link>
          <hr/>
      </div>
    );
  }
}

export default PlantsIndexContainer;
