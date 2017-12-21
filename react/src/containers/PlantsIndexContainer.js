import React, { Component } from 'react';
import PlantTile from '../components/PlantTile';
import { Route, IndexRoute, Router, browserHistory, Link, Redirect } from 'react-router';
import Modal from 'react-modal';
import ImageUpload from '../components/ImageUpload';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class PlantsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      modalIsOpen: false,
      continueClicked: false,
      plantName: '',
      nickname: '',
      birthdate: '',
      sunlightNeeds: 'Sunny (Direct Sun)',
      wateringNeeds: 'Daily',
      file: '',
      imagePreviewUrl: ''

    };
    this.handleClick = this.handleClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    let value = event.target.value;
    let name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  openModal() {
    this.setState( {modalIsOpen: true} );
  }

  afterOpenModal() {
  }

  closeModal() {
    this.setState( {modalIsOpen: false, continueClicked: false} );
  }

  handleClick(event) {
    this.setState({
      currentGarden: Number(event.target.id)
    });
  }

  handleContinue(event) {
    event.preventDefault();
    this.setState({
      continueClicked: true
    })
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
      plants: body.plants
    });
  })
  .catch(error => console.error(`Error in fetch: ${error.message}`));
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

    let form;
    if (this.state.continueClicked) {
      form = <ImageUpload />
    } else {
      form = <form>
              <label>
                Plant Name
                <input value={this.state.plantName} onChange={this.handleInputChange} name='plantName' type='text' placeholder='What type of plant is this?' />
              </label>
              <label>
                Plant Nickname
                <input value={this.state.nickname}onChange={this.handleInputChange} name='nickname' type='text' placeholder='What do you call this plant?' />
              </label>
              <label>
                When Did You Start Caring For This Plant?
                <input value={this.state.birthdate}onChange={this.handleInputChange} name='birthdate' type='date' />
              </label>
              <label>
                Sunlight Needs
                <select value={this.state.sunlightNeeds}onChange={this.handleInputChange} name='sunlightNeeds'>
                  <option value='Sunny (Direct Sun)'>Sunny (Direct Sun)</option>
                  <option value='Bright (Indirect Sun)'>Bright (Indirect Sun)</option>
                  <option value='Partially Shaded (Low Light)'>Partially Shaded (Low Light)</option>
                  <option value='Shady'>Shady</option>
                  <option value='Artificial Light'>Artificial Light</option>
                </select>
              </label>
              <label>
                Watering Needs
                <select value={this.state.wateringNeeds}onChange={this.handleInputChange} name='wateringNeeds'>
                  <option value='Daily'>Daily</option>
                  <option value='Weekly'>Weekly</option>
                  <option value='Biweekly'>Biweekly</option>
                  <option value='Monthly'>Monthly</option>
                  <option value='Bimonthly'>Bimonthly</option>
                </select>
              </label>
              <button onClick={this.handleContinue}>Continue</button>
            </form>
    }

    return (
      <div>
        <h1 id='title'>Your Plants</h1>
        <div className='rows'>
          {plants}
          <button
            id='add'
            onClick={this.openModal}
            className='small-12 medium-6 large-4 text-center columns'
          >
            Add Plant
          </button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Add New Plant"
          >
            <span>
              <h2 ref={subtitle => this.subtitle = subtitle}>Add New Plant</h2>
            </span>
            <span>
              <button onClick={this.closeModal}>close</button>
            </span>
            {form}
          </Modal>
        </div>
      </div>
    );
  }
}

export default PlantsIndexContainer;
