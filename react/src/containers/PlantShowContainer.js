import React from 'react';
import { Router, browserHistory } from 'react-router';
import TimelineContainer from './TimelineContainer'
import Modal from 'react-modal';
import ImageUpload from '../components/ImageUpload';
import PlantEdit from '../components/PlantEdit';
import DetailsBox from './DetailsBox';
let strftime = require('strftime')

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
      editClicked: false,
      deleteClicked: false,
      journalEntry: '',
      file: '',
      imagePreviewUrl: null,
      error: false,
      plantName: '',
      nickname: '',
      birthdate: '',
      sunlightNeeds: 'Sunny (Direct Sun)',
      wateringNeeds: 'Daily',
      file: '',
      imagePreviewUrl: null,
      currentUser: {}
    };
    this.snapshotClick = this.snapshotClick.bind(this);
    this.selectedSnapshot = this.selectedSnapshot.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleSnapshotSubmit = this.handleSnapshotSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.deletePlant = this.deletePlant.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);

  }

  getPlant() {
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
        selectedSnapshot: body.plant.snapshots[0],
        plantName: body.plant.common_name,
        nickname: body.plant.name,
        birthdate: body.plant.birthdate,
        sunlightNeeds: body.plant.sunlight_needs,
        wateringNeeds: body.plant.watering_needs,
        imagePreviewUrl: body.plant.photo
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getPlant()
  }

  deletePlant(event) {
   event.preventDefault()
   fetch(`/api/v1/plants/${this.props.params.id}`, {
     method: 'DELETE',
     credentials: 'same-origin',
     headers: {'Content-Type': 'application/json'}
   })
   .then(response => {
     alert('Plant was deleted')
     browserHistory.push('/')
   })
 }

  handleSnapshotSubmit(e) {
    e.preventDefault();
    let formPayload = {
      journal_entry: this.state.journalEntry,
      photo: this.state.imagePreviewUrl,
      plant_id: +this.props.params.id
    }
    this.newSnapshot(formPayload);
  }

  handleEditSubmit(e) {
    e.preventDefault();
    let formPayload = {
      name: this.state.nickname,
      common_name: this.state.plantName,
      sunlight_needs: this.state.sunlightNeeds,
      watering_needs: this.state.wateringNeeds,
      photo: this.state.imagePreviewUrl,
      birthdate: this.state.birthdate,
      user_id: this.state.plant.user_id
    }
    this.editPlant(formPayload)
  }

  editPlant(formPayload) {
    fetch(`/api/v1/plants/${this.props.params.id}`, {
      credentials: 'same-origin',
      method: 'PATCH',
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
        plant: body.plant,
        snapshots: body.plant.snapshots.reverse(),
        selectedSnapshot: body.plant.snapshots[0],
        plantName: body.plant.common_name,
        nickname: body.plant.name,
        birthdate: body.plant.birthdate,
        sunlightNeeds: body.plant.sunlight_needs,
        wateringNeeds: body.plant.watering_needs,
        imagePreviewUrl: body.plant.photo
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
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

  closeModal(event) {
    event.preventDefault()
    this.setState({
      modalIsOpen: false,
      continueClicked: false,
      editClicked: false,
      deleteClicked: false,
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

  handleEdit(event) {
    event.preventDefault()
    this.openModal()
    this.setState( {editClicked: true} )
  }

  handleDeleteClick(event) {
    event.preventDefault()
    this.setState( {deleteClicked: true} )
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

    let form, formHeader;
    if (this.state.deleteClicked) {
      formHeader = 'Are you sure you want to delete your plant?'
      form = <div className='text-center'>
              <span><button className='white-button' onClick={this.deletePlant}>YES</button></span>
              <span><button className='white-button' onClick={this.closeModal}>NO</button></span>
            </div>
    } else if (this.state.continueClicked && this.state.editClicked) {
      formHeader = 'Update Plant Profile Picture'
      form =<ImageUpload
              handleSubmit={this.handleEditSubmit}
              handleImageChange={this.handleImageChange}
              currentImage={this.state.plant.photo}
              imagePreviewUrl={this.state.imagePreviewUrl}
              closeModal={this.closeModal}
            />
    } else if (this.state.continueClicked) {
      formHeader = 'Add Journal Image'
      form =<ImageUpload
              handleSubmit={this.handleSnapshotSubmit}
              handleImageChange={this.handleImageChange}
              imagePreviewUrl={this.state.imagePreviewUrl}
              closeModal={this.closeModal}
            />
    } else if (this.state.editClicked) {
      formHeader = 'Edit Plant'
      form = <form>
              <label>
                <div className='label-text'>Plant Name</div>
                <input value={this.state.plantName} onChange={this.handleInputChange} name='plantName' type='text' />
              </label>
              <label>
                <div className='label-text'>Plant Nickname</div>
                <input value={this.state.nickname} onChange={this.handleInputChange} name='nickname' type='text' />
              </label>
              <label>
                <div className='label-text'>When Did You Start Caring For This Plant?</div>
                <input value={this.state.birthdate} onChange={this.handleInputChange} name='birthdate' type='date' />
              </label>
              <label>
                <div className='label-text'>Sunlight Needs</div>
                <select value={this.state.sunlightNeeds} onChange={this.handleInputChange} name='sunlightNeeds'>
                  <option value='Sunny (Direct Sun)'>Sunny (Direct Sun)</option>
                  <option value='Bright (Indirect Sun)'>Bright (Indirect Sun)</option>
                  <option value='Partially Shaded (Low Light)'>Partially Shaded (Low Light)</option>
                  <option value='Shady'>Shady</option>
                  <option value='Artificial Light'>Artificial Light</option>
                </select>
              </label>
              <label>
                <div className='label-text'>Watering Needs</div>
                <select value={this.state.wateringNeeds} onChange={this.handleInputChange} name='wateringNeeds'>
                  <option value='Daily'>Daily</option>
                  <option value='Weekly'>Weekly</option>
                  <option value='Biweekly'>Biweekly</option>
                  <option value='Monthly'>Monthly</option>
                  <option value='Bimonthly'>Bimonthly</option>
                </select>
              </label>
              <span className='button-right'>
                <span><button className='white-button' onClick={this.handleDeleteClick}>DELETE PLANT</button></span>
                <span><button className='white-button' onClick={this.closeModal}>CANCEL</button></span>
                <span><button className='pianta-button' onClick={this.handleContinue}>CONTINUE</button></span>
              </span>
            </form>
    } else {
      formHeader = 'Add Journal Entry'
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
            handleEdit={this.handleEdit}
            getPlant={this.getPlant}
            plant={this.state.plant}
            plantId={this.state.plant.id}
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
            <i className='fa fa-plus-square fa-fw' aria-hidden='true'></i>{formHeader}
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
