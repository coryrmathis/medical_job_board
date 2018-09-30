import React from 'react';

class JobPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedJob: this.props.jobData.savedJob,
      hover: false,
      savePopup: false,
    };
    this.popupText = this.popupText.bind(this);
    this.favoriteClass = this.favoriteClass.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.jobData.savedJob !== this.state.savedJob) {
      this.setState({savedJob: nextProps.jobData.savedJob});
    }
  }

  favoriteClass(){
    return this.state.savedJob ? 'fa fa-star' : 'fa fa-star-o';
  }

  popupText(){
    return this.state.savedJob ? 'Saved' : 'Removed';
  }

  handleFavoriteClick(){
    // For Devise
    // This allows authenticates so ajax call can update current user
    var token = $('meta[name="csrf-token"]').attr('content');
    // Change state prior to ajax to update view asap
    // Change will be undone if ajax fail
    this.state.savedJob = !this.state.savedJob;
    this.setState(this.state);

    $.ajax({
      url: '/users/' + this.props.userID + '/saved_jobs',
      type: "PUT",
      beforeSend: function (xhr) {
          xhr.setRequestHeader('X-CSRF-Token', token)
      },
      data: {job_id: this.props.jobData.raw.id}
    }).then(
      // Success
      function(){
        console.log("successfully saved savedJob status");
        // bubble this up to main browser for any higher level action
        this.props.handleFavoriteClick();
        // animate lil popup notification
        this.setState({savePopup: true});
        window.setTimeout(() => {
          this.setState({savePopup: false });
        }, 1300);

      }.bind(this),

      // Failure
      function() {
        // Undo the view changes made at beginning of click handle
        this.state.savedJob = !this.state.savedJob;
        this.setState(this.state);
      }.bind(this)

    );
  }

  render(){
    if (this.props.jobData){
      return(
        <div className="panel-contents">
          <div className="panel-header">
            <div className="panel-button-bar">
              <div className="left">
                {this.props.accountType === "poster" ?
                  null :
                  <a className="favorite">
                    <i
                      className={this.favoriteClass()}
                      onMouseEnter={function(e){
                        e.target.className = "fa fa-star-half-o";
                      }}
                      onMouseLeave={function(e){
                        e.target.className = this.favoriteClass();
                      }.bind(this)}
                      onClick={this.handleFavoriteClick}
                    ></i>
                  </a>
                }
                {this.state.savePopup ? 
                  <div className="save-alert">{this.popupText()}</div> : 
                  <div className="save-alert hidden">{this.popupText()}</div>
                }
                
              </div>
              <div className="right">
                <a className='btn btn-info fa fa-external-link' target="_blank" href={`/jobs/${this.props.jobData.raw.id}`} ></a>
                <button
                  className='btn btn-danger fa fa-times'
                  onClick={function(){
                    this.props.closeJobWindow()
                  }.bind(this)} 
                ></button>
              </div>
            </div>
            <div className="header-contents">
              <div className="job-title">
                <h3>{this.props.jobData.raw.specialty}</h3>
              </div>
              <p>{this.props.jobData.raw.city}, {this.props.jobData.raw.state}</p>
              <a className="btn btn-success btn-lg apply-btn" href={"/jobs/"+this.props.jobData.raw.id+"/apply"}> Apply </a>
            </div>
          </div>
          <div className="description-container">
            <p dangerouslySetInnerHTML={{__html: this.props.jobData.markup}}></p>
          </div>
        </div>
      );
    } else {
      return(
        <div className="panel-contents">
          <div className="panel-header">
          <h3>No job selected</h3>
          </div>
          <div className="description-container">
            <p>Click a job to preview and apply.</p>
          </div>
        </div>
      );
    }
  }
}

export default JobPanel;