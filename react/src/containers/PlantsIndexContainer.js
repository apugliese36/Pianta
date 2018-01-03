import React, { Component } from 'react';
import PlantTile from '../components/PlantTile';
import { Route, IndexRoute, Router, browserHistory, Link, Redirect } from 'react-router';
import PlantForm from './PlantForm'

class PlantsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      currentUser: {},
      modalIsOopen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getPlants = this.getPlants.bind(this);
  }

  openModal() {
    this.setState( {modalIsOpen: true} );
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  getPlants() {
    fetch('/api/v1/plants', {
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
        plants: body.plants,
        currentUser: body.current_user
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount () {
    this.getPlants();
  }

  render () {
    let plants = this.state.plants.map(plant => {
      return (
        <PlantTile
          key={plant.id}
          id={plant.id}
          name={plant.name}
          photo={plant.photo}
        />
      );
    });

    return (
      <div>
        <div className='greeting'>{`Welcome, ${this.state.currentUser.first_name}`}</div>
        <div className='your-plants'>Your Plants</div>
        <div className='row'>
          {plants}
          <div className='small-12 medium-4 large-3 column add' onClick={this.openModal}>
            <div className='add-container'>
                <div className='add-plant'></div>
                <div className='center'>Add Plant</div>
            </div>
          </div>
        </div>
        <PlantForm
          modalIsOpen={this.state.modalIsOpen}
          closeModal={this.closeModal}
          getPlants={this.getPlants}
         />
        </div>
    );
  }
}

export default PlantsIndexContainer;
