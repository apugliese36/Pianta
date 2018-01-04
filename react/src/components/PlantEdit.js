// import React, { Component } from 'react';
// import PlantTile from '../components/PlantTile';
// import { Route, IndexRoute, Router, browserHistory, Link, Redirect } from 'react-router';
// import Modal from 'react-modal';
// import ImageUpload from '../components/ImageUpload';
//
// const customStyles = {
//   content : {
//     top                   : '50%',
//     left                  : '50%',
//     right                 : 'auto',
//     bottom                : 'auto',
//     marginRight           : '-50%',
//     transform             : 'translate(-50%, -50%)'
//   }
// };
//
// class PlantEdit extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       continueClicked: false,
//       plantName: '',
//       nickname: '',
//       birthdate: '',
//       sunlightNeeds: '',
//       wateringNeeds: '',
//       file: '',
//       imagePreviewUrl: '',
//       userId: ''
//     };
//     this.clearForm = this.clearForm.bind(this);
//     this.handleContinue = this.handleContinue.bind(this);
//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.handleImageChange = this.handleImageChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//
//   handleSubmit(e) {
//     e.preventDefault();
//     let formPayload = {
//       name: this.state.nickname,
//       common_name: this.state.plantName,
//       sunlight_needs: this.state.sunlightNeeds,
//       watering_needs: this.state.wateringNeeds,
//       photo: this.state.imagePreviewUrl,
//       birthdate: this.state.birthdate,
//       user_id: this.state.userId
//     }
//     this.editPlant(formPayload)
//   }
//
//   editPlant(formPayload) {
//     fetch('/api/v1/plants', {
//       credentials: 'same-origin',
//       method: 'PATCH',
//       body: JSON.stringify(formPayload),
//       headers: { 'Content-Type': 'application/json' }
//     })
//     .then(response => {
//       if (response.ok) {
//         return response;
//       } else {
//         let errorMessage = `${response.status} (${response.statusText})`,
//         error = new Error(errorMessage);
//         throw(error);
//       }
//     })
//     .then(response => response.json())
//     .then(body => {
//       this.clearForm()
//       this.props.getPlants();
//     })
//     .catch(error => console.error(`Error in fetch: ${error.message}`));
//   }
//
//   handleImageChange(e) {
//     e.preventDefault();
//
//     let reader = new FileReader();
//     let file = e.target.files[0];
//
//     reader.onloadend = () => {
//       this.setState({
//         file: file,
//         imagePreviewUrl: reader.result
//       });
//     }
//     reader.readAsDataURL(file)
//   }
//
//   handleInputChange(event) {
//     let value = event.target.value;
//     let name = event.target.name;
//
//     this.setState({
//       [name]: value
//     });
//   }
//
//   clearForm() {
//     this.props.closeModal();
//   }
//
//   handleContinue(event) {
//     event.preventDefault();
//     this.setState({
//       continueClicked: true
//     })
//   }
//
//   componentDidMount () {
//     fetch(`/api/v1/plants/${this.props.params.id}`, {
//       credentials: 'same-origin'
//     })
//     .then(response => {
//       if (response.ok) {
//         return response;
//       } else {
//         this.setState({ error: true })
//         let errorMessage = `${response.status} (${response.statusText})`,
//         error = new Error(errorMessage);
//         throw(error);
//       }
//     })
//     .then(response => response.json())
//     .then(body => {
//       this.setState({
//         plantName: body.plant.common_name,
//         nickname: body.plant.name,
//         birthdate: body.plant.birthdate,
//         sunlightNeeds: body.plant.sunlight_need,
//         wateringNeeds: body.plant.watering_needs,
//         imagePreviewUrl: body.plant.photo,
//         userId: body.plant.user_id
//       });
//     })
//     .catch(error => console.error(`Error in fetch: ${error.message}`));
//   }
//
//   render () {
//     let form;
//     if (this.state.continueClicked) {
//       form =<ImageUpload
//               handleSubmit={this.handleSubmit}
//               handleImageChange={this.handleImageChange}
//               imagePreviewUrl={this.state.imagePreviewUrl}
//               closeModal={this.closeModal}
//             />
//     } else {
//       form = <form>
//               <label>
//                 <div className='label-text'>Plant Name</div>
//                 <input value={this.state.plantName} onChange={this.handleInputChange} name='plantName' type='text' placeholder='What type of plant is this?' />
//               </label>
//               <label>
//                 <div className='label-text'>Plant Nickname</div>
//                 <input value={this.state.nickname} onChange={this.handleInputChange} name='nickname' type='text' placeholder='What do you call this plant?' />
//               </label>
//               <label>
//                 <div className='label-text'>When Did You Start Caring For This Plant?</div>
//                 <input value={this.state.birthdate} onChange={this.handleInputChange} name='birthdate' type='date' />
//               </label>
//               <label>
//                 <div className='label-text'>Sunlight Needs</div>
//                 <select value={this.state.sunlightNeeds}onChange={this.handleInputChange} name='sunlightNeeds'>
//                   <option value='Sunny (Direct Sun)'>Sunny (Direct Sun)</option>
//                   <option value='Bright (Indirect Sun)'>Bright (Indirect Sun)</option>
//                   <option value='Partially Shaded (Low Light)'>Partially Shaded (Low Light)</option>
//                   <option value='Shady'>Shady</option>
//                   <option value='Artificial Light'>Artificial Light</option>
//                 </select>
//               </label>
//               <label>
//                 <div className='label-text'>Watering Needs</div>
//                 <select value={this.state.wateringNeeds}onChange={this.handleInputChange} name='wateringNeeds'>
//                   <option value='Daily'>Daily</option>
//                   <option value='Weekly'>Weekly</option>
//                   <option value='Biweekly'>Biweekly</option>
//                   <option value='Monthly'>Monthly</option>
//                   <option value='Bimonthly'>Bimonthly</option>
//                 </select>
//               </label>
//               <span className='button-right'>
//                 <span><button className='white-button' onClick={this.clearForm}>CANCEL</button></span>
//                 <span><button className='pianta-button' onClick={this.handleContinue}>CONTINUE</button></span>
//               </span>
//             </form>
//     }
//
//     return (
//       <div>
//           <Modal
//             isOpen={this.props.modalIsOpen}
//             onRequestClose={this.clearForm}
//             style={customStyles}
//             contentLabel='Update Plant'
//           >
//             <div className='modal-header' ref={subtitle => this.subtitle = subtitle}>
//               <i className='fa fa-plus-square fa-fw' aria-hidden='true'></i>Update Plant
//               <span className='close'>
//                 <button onClick={this.clearForm}>
//                   <i className='fa fa-times' aria-hidden='true'></i>
//                 </button>
//               </span>
//               <hr/>
//             </div>
//             {form}
//           </Modal>
//         </div>
//     );
//   }
// }
//
//
// export default PlantEdit;
