import React, { Component } from 'react';
import GardenTile from '../components/GardenTile';
import { Route, IndexRoute, Router, browserHistory, Link, Redirect } from 'react-router';

class GardenIndexContainer extends Component {
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
  fetch('/api/v1/gardens')
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
      gardens: body.gardens
    });
  })
  .catch(error => console.error(`Error in fetch: ${error.message}`));
}

  render () {
    let gardens = this.state.gardens.map(garden => {
      return (
        <GardenTile
          key={garden.id}
          id={garden.id}
          name={garden.name}
          photo={garden.photo}
        />
      );
    });

    return (
      <div>
        <h1 id="title">Your Gardens</h1>
          {gardens}
          <Link id="add" to={`/gardens/new`}>Add a Garden</Link>
          <hr/>
      </div>
    );
  }
}

export default GardenIndexContainer;
