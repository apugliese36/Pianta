// import React from 'react';
// import Modal from 'react-modal';
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
// class plantModal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }
//
//
//   render() {
//
//     return(
//       <div>
//         <Modal
//           isOpen={this.props.isOpen}
//           onAfterOpen={this.props.onAfterOpen}
//           onRequestOpen={this.props.onRequestOpen}
//           onRequestClose={this.props.onRequestClose}
//           style={customStyles}
//           contentLabel='Add New Plant'
//         >
//           <h2 ref={subtitle => this.subtitle = subtitle}>Add New Plant</h2>
//           <button onClick={this.closeModal}>close</button>
//           <form>
//             <label>
//               Plant Name YAS
//             </label>
//             <label>
//               Plant Nickname YAS
//             </label>
//             <label>
//               When Did You Start Caring For This Plant? YAS
//             </label>
//             <label>
//               Sunlight Needs
//             </label>
//             <label>
//               Watering Needs
//             </label>
//             <label>
//               Hardiness
//             </label>
//           </form>
//         </Modal>
//       </div>
//     );
//   }
// };
//
// export default plantModal;
