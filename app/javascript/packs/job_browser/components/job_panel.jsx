import React from 'react';
import PropTypes from 'prop-types';

class JobPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedJob: this.props.jobData.savedJob,
      savePopup: false,
    };
    this.popupText = this.popupText.bind(this);
    this.favoriteClass = this.favoriteClass.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.jobData.savedJob !== this.state.savedJob) {
      this.setState({ savedJob: nextProps.jobData.savedJob });
    }
  }

  favoriteClass() {
    return this.state.savedJob ? 'fa fa-star' : 'fa fa-star-o';
  }

  popupText() {
    return this.state.savedJob ? 'Saved' : 'Removed';
  }

  handleFavoriteClick() {
    // For Devise
    // This allows authenticates so ajax call can update current user
    const token = $('meta[name="csrf-token"]').attr('content');
    // Change state prior to ajax to update view asap
    // Change will be undone if ajax fail
    this.setState(prevState => ({ savedJob: !prevState.savedJob }));

    $.ajax({
      url: `/api/v1/applicants/${this.props.userID}/saved_jobs`,
      type: 'PUT',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-CSRF-Token', token);
      },
      data: { job_id: this.props.jobData.raw.id },
    }).then(
      // Success
      () => {
        console.log('successfully saved savedJob status');

        // Bubble this up to main browser for any higher level action?
        // this.props.handleFavoriteClick();

        // Animate lil popup notification
        this.setState({ savePopup: true });
        window.setTimeout(() => {
          this.setState({ savePopup: false });
        }, 1300);
      },
      // Failure
      () => {
        // Undo the view changes made at beginning of click handle
        this.setState(prevState => ({ savedJob: !prevState.savedJob }));
      },
    );
  }

  render() {
    if (this.props.jobData) {
      return (
        <div className="panel-contents">
          <div className="panel-header">
            <div className="panel-button-bar">
              <div className="left">
                { this.props.accountType !== 'applicant'
                  ? null
                  : (
                    <div className="favorite">
                      <i
                        role="button"
                        tabIndex={0}
                        className={this.favoriteClass()}
                        onMouseEnter={(e) => {
                          e.target.className = 'fa fa-star-half-o';
                        }}
                        onMouseLeave={(e) => {
                          e.target.className = this.favoriteClass();
                        }}
                        onClick={this.handleFavoriteClick}
                        onKeyDown={this.handleFavoriteClick}
                      />
                    </div>
                  )
                }
                { this.state.savePopup
                  ? <div className="save-alert">{this.popupText()}</div>
                  : <div className="save-alert hidden">{this.popupText()}</div>
                }
              </div>
              <div className="right">
                <a className="btn btn-info" target="_blank" rel="noopener noreferrer" href={`/jobs/${this.props.jobData.raw.id}`}>
                  <i className="fa fa-external-link" />
                </a>
                <button
                  type="button"
                  className="btn btn-danger fa fa-times"
                  onClick={() => {
                    this.props.closeJobWindow();
                  }}
                />
              </div>
            </div>
            <div className="header-contents">
              <div className="job-title">
                <h3>{this.props.jobData.raw.specialty}</h3>
              </div>
              <p>
                {`${this.props.jobData.raw.city}, ${this.props.jobData.raw.state}`}
              </p>
              <a className="btn btn-success btn-lg apply-btn" href={`/jobs/${this.props.jobData.raw.id}/apply`}> Apply </a>
            </div>
          </div>
          <div className="description-container">
            <p dangerouslySetInnerHTML={{ __html: this.props.jobData.markup }} />
          </div>
        </div>
      );
    }

    return (
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

JobPanel.propTypes = {
  jobData: PropTypes.shape({
    savedJob: PropTypes.bool,
    markup: PropTypes.string,
    raw: PropTypes.shape({
      aid: PropTypes.number,
      city: PropTypes.string,
      contact_email: PropTypes.string,
      contact_name: PropTypes.string,
      created_at: PropTypes.string,
      distance_to_metro: PropTypes.string,
      id: PropTypes.number,
      job_description: PropTypes.string,
      specialty: PropTypes.string,
      state: PropTypes.string,
      subspecialty_keywords: PropTypes.string,
      updated_at: PropTypes.string,
      user_id: PropTypes.number,
      visas: PropTypes.string,
    }),
  }).isRequired,
  closeJobWindow: PropTypes.func.isRequired,
  userID: PropTypes.number,
  accountType: PropTypes.string,
};

JobPanel.defaultProps = {
  userID: null,
  accountType: null,
};

export default JobPanel;
