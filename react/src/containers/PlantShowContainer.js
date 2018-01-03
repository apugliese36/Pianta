import React from 'react';
import { Router, browserHistory } from 'react-router';
import TimelineContainer from './TimelineContainer'
let strftime = require('strftime')
import Modal from 'react-modal';
import ImageUpload from '../components/ImageUpload';
import DetailsBox from './DetailsBox';

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

class PlantShowContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plant: [],
      snapshots: [],
      selectedSnapshot: {},
      modalIsOpen: false,
      continueClicked: false,
      journalEntry: '',
      file: '',
      imagePreviewUrl: null,
      error: false
    };
    this.snapshotClick = this.snapshotClick.bind(this);
    this.selectedSnapshot = this.selectedSnapshot.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    fetch(`/api/v1/plants/${this.props.params.id}`, {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        this.setState({ error: true })
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        plant: body.plant,
        snapshots: body.plant.snapshots.reverse(),
        selectedSnapshot: body.plant.snapshots[0]
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleSubmit(e) {
    e.preventDefault();
    let formPayload = {
      journal_entry: this.state.journalEntry,
      photo: this.state.imagePreviewUrl,
      plant_id: +this.props.params.id
    }
    this.newSnapshot(formPayload);
  }

  newSnapshot(formPayload) {
    fetch('/api/v1/snapshots', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(formPayload),
      headers: { 'Content-Type': 'application/json' }
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
      this.closeModal()
      this.setState({
        snapshots: body
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
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
    this.setState({
      modalIsOpen: false,
      continueClicked: false,
      journalEntry: '',
      file: '',
      imagePreviewUrl: null
    });
  }

  handleContinue(event) {
    event.preventDefault();
    this.setState({
      continueClicked: true
    })
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

    let centerColumn, rightColumn, selectedSnapshotWeekdayMonthDayYear, snapshotDate, snapshotDayNumber;
    if (this.state.selectedSnapshot) {
      snapshotDate = new Date(this.state.selectedSnapshot.created_at)
      selectedSnapshotWeekdayMonthDayYear = strftime('%A, %B %o, %Y', snapshotDate)
      snapshotDayNumber = Math.ceil((snapshotDate - birthdate) / 8.64e7)
      if (this.state.selectedSnapshot.photo) {
        centerColumn = <img className='center-image' src={this.state.selectedSnapshot.photo} />
        rightColumn = <div>
                        <div className='day-num'>{`DAY ${snapshotDayNumber}`}</div>
                        <div className='journal-date'>{selectedSnapshotWeekdayMonthDayYear}</div>
                        <div className='journal-entry'>{this.state.selectedSnapshot.journal_entry}</div>
                        <hr/>
                      </div>
      } else {
        centerColumn =
                      <div>
                        <div className='day-num'>{`DAY ${snapshotDayNumber}`}</div>
                        <div className='journal-date'>{selectedSnapshotWeekdayMonthDayYear}</div>
                        <div className='journal-entry'>{this.state.selectedSnapshot.journal_entry}</div>
                        <hr/>
                      </div>
      }
    }

    let form;
    if (this.state.continueClicked) {
      form =<ImageUpload
              handleSubmit={this.handleSubmit}
              handleImageChange={this.handleImageChange}
              imagePreviewUrl={this.state.imagePreviewUrl}
              closeModal={this.closeModal}
            />
    } else {
      form = <form>
              <label>
                <div className='label-text'>Journal Entry</div>
                <textarea value={this.state.journalEntry} onChange={this.handleInputChange} name='journalEntry' type='text'/>
              </label>
              <span className='button-right'>
                <span><button className='white-button' onClick={this.closeModal}>CANCEL</button></span>
                <span><button className='pianta-button' onClick={this.handleContinue}>CONTINUE</button></span>
              </span>
            </form>
    }

    let plantNotFound;
    if (this.state.error) {
      plantNotFound = <h1>Plant does not exist</h1>
    }

    return(
      <div className='row'>
        {plantNotFound}
        <TimelineContainer
          plant={this.state.plant}
          snapshots={this.state.snapshots}
          snapshotClick={this.snapshotClick}
          numberOfDays={numberOfDays}
          birthdate={birthdate}
          openModal={this.openModal}
          selectedSnapshot={this.state.selectedSnapshot}
        />

        <div className='medium-4 column beigegray'>
          <div className='align-center plant-nickname'>{this.state.plant.name}</div>
          <div className='plant-commonname'>{this.state.plant.common_name}</div>
          <div className='began-on'>{`Began on ${birthdateMonthDayYear}`}</div>
          <br/>
          {centerColumn}
        </div>

        <div className='medium-4 column beigegray'>
          <DetailsBox
            plant={this.state.plant}
            commonName={this.state.plant.common_name}
            sunlightNeeds={this.state.plant.sunlight_needs}
            wateringNeeds={this.state.plant.watering_needs}
          />
          <br/>
          {rightColumn}
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel='Add New Journal Entry'
        >
          <div className='modal-header' ref={subtitle => this.subtitle = subtitle}>
            <i className='fa fa-plus-square fa-fw' aria-hidden='true'></i>Add Journal Entry
            <span className='close'>
              <button onClick={this.closeModal}>
                <i className='fa fa-times' aria-hidden='true'></i>
              </button>
            </span>
            <hr/>
          </div>
          {form}
        </Modal>
      </div>
    );
  }
};

export default PlantShowContainer;
