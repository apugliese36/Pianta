import React from 'react';
import { Router, browserHistory } from 'react-router';
import TimelineContainer from './TimelineContainer'
let strftime = require('strftime')
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
      imagePreviewUrl: null
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
      imagePreviewUrl: ''
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
      selectedSnapshotWeekdayMonthDayYear = strftime('%A, %b %o, %Y', snapshotDate)
      snapshotDayNumber = Math.ceil((snapshotDate - birthdate) / 8.64e7)
      if (this.state.selectedSnapshot.photo) {
        centerColumn = <img className="center-image" src={this.state.selectedSnapshot.photo} />
        rightColumn = <div>
                        <div>{`Day ${snapshotDayNumber}`}</div>
                        <div>{selectedSnapshotWeekdayMonthDayYear}</div>
                        <div>{this.state.selectedSnapshot.journal_entry}</div>
                        <hr/>
                      </div>
      } else {
        centerColumn =
                      <div>
                        <div>{`Day ${snapshotDayNumber}`}</div>
                        <div>{selectedSnapshotWeekdayMonthDayYear}</div>
                        <div>{this.state.selectedSnapshot.journal_entry}</div>
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
            />
    } else {
      form = <form>
              <label>
                Journal Entry
                <textarea value={this.state.journalEntry} onChange={this.handleInputChange} name='journalEntry' type='text'/>
              </label>
              <button onClick={this.handleContinue}>Continue</button>
            </form>
    }

    return(
      <div className='row'>
        <TimelineContainer
          plant={this.state.plant}
          snapshots={this.state.snapshots}
          snapshotClick={this.snapshotClick}
          numberOfDays={numberOfDays}
          birthdate={birthdate}
          openModal={this.openModal}
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

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add New Journal Entry"
        >
          <span>
            <h2 ref={subtitle => this.subtitle = subtitle}>Add Journal Entry</h2>
          </span>
          <span>
            <button onClick={this.closeModal}>close</button>
          </span>
          {form}
        </Modal>
      </div>
    );
  }
};

export default PlantShowContainer;
