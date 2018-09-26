import React from 'react';

class ApplicationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationModalOpen: false,
    }
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (e) => {
    if (this.node.contains(e.target)){
      return;
    } else {
      this.props.handleModalClose();
    }
  }

  render(){
    return(
      <div className="modal application-modal" >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content" ref={node => this.node = node}>
            <div className="modal-header">
              <button type="button" className="close" onClick={this.props.handleModalClose}><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">Application</h4>
            </div>
            <div className="modal-body">
              Test
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// function ApplicationModal(props) {

//   handleClick = (e) => {
//     if (this.node.contains(e.target)){
//       return;
//     } else {
//       this.props.handleModalClose;
//     }
    
//   }
//   render
//   return(
//     <div className="modal application-modal" ref={node => this.node = node}>
//       <div className="modal-dialog modal-lg" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <button type="button" className="close" onClick={this.props.handleModalClose}><span aria-hidden="true">&times;</span></button>
//             <h4 className="modal-title" id="myModalLabel">Application</h4>
//           </div>
//           <div className="modal-body">
//             Test
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default ApplicationModal;