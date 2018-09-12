import React from 'react'

class JobPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: this.props.jobData.favorite,
      hover: false
    };
    this.FavoriteClass = this.FavoriteClass.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.jobData.favorite !== this.state.favorite) {
      this.setState({favorite: nextProps.jobData.favorite});
    }
  }

  FavoriteClass(){
    return this.state.favorite ? 'fa fa-star' : 'fa fa-star-o';
  }

  handleFavoriteClick(){
    // For Devise
    var token = $('meta[name="csrf-token"]').attr('content');
    // Change state prior to ajax to update view asap
    // Change will be undone if ajax fail
    this.state.favorite = !this.state.favorite;
    this.setState(this.state);

    $.ajax({
      url: '/users/' + this.props.userID,
      type: "PUT",
      beforeSend: function (xhr) {
          xhr.setRequestHeader('X-CSRF-Token', token)
      },
      data: {job_id: this.props.jobData.raw.id}
    }).then(
      function(){
        // success
      },
      function() {
        //fail, undo the view changes made at beginning of click handle
        this.state.favorite = !this.state.favorite;
        this.setState(this.state);
      }
    );
  }

  render(){
    if (this.props.jobData){
      return(
        <div className="panel-contents">
          <div className="panel-header">
            <div className="panel-button-bar">
              <div className="left">
                <a className="favorite">
                  <i
                    className={this.FavoriteClass()}
                    onMouseEnter={function(e){
                      e.target.className = "fa fa-star-half-o";
                    }}
                    onMouseLeave={function(e){
                      e.target.className = this.FavoriteClass();
                    }.bind(this)}
                    onClick={this.handleFavoriteClick}
                  ></i>
                </a>
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
              <button className="btn btn-success btn-lg apply-btn" data-toggle="modal" data-target="#applicationModal">Apply</button>
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