import React, { Component } from 'react';
import PlantTile from '../components/PlantTile';
import { Route, IndexRoute, Router, browserHistory, Link, Redirect } from 'react-router';
import PlantForm from '../components/PlantForm'

class PlantsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      currentUser: {},
      modalIsOpen: false
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
        <div className='plants-container'>
          {plants}
          <span onClick={this.openModal}>
            <div className='hvr-grow container'>
                <div className='add-plant'></div>
                <div className='center text-center'>
                  <i className='fa fa-plus'></i><br/>
                  ADD PLANT
                </div>
            </div>
          </span>
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
