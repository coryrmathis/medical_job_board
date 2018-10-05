import React from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import JobPanel from './components/job_panel';
import SearchPanel from './components/search_panel';
import Table from './components/table';

class JobBrowser extends React.Component {
  static getJobMarkup(jobID) {
    return $.get({
      cache: false,
      url: `/api/v1/jobs/${jobID}/markup`,
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      allJobsData: null,
      searchParams: {
        specialty: null,
        state: null,
        city: null,
        subspecialty_keywords: null,
        visas: null,
      },
      resultsPage: 1,
    };
    this.onRowSelect = this.onRowSelect.bind(this);
    this.getSavedStatus = this.getSavedStatus.bind(this);
    this.onSearchParamChange = this.onSearchParamChange.bind(this);
    this.search = this.search.bind(this);
    this.loadMoreResults = this.loadMoreResults.bind(this);
    this.closeJobWindow = this.closeJobWindow.bind(this);
  }

  componentDidMount() {
    $.get({
      cache: false,
      url: this.props.savedJobsOnly
        ? `/api/v1/applicants/${this.props.userID}/saved_jobs`
        : '/api/v1/jobs/',
    }).then((data) => {
      this.setState({
        numRecentlyLoadedResults: data.length,
        allJobsData: data,
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Ajax request on 'load more'
    if (prevState.resultsPage !== this.state.resultsPage) {
      $.get({
        cache: false,
        url: this.props.savedJobsOnly
          ? `/api/v1/applicants/${this.props.userID}/saved_jobs`
          : '/api/v1/jobs/',
        data: { page: this.state.resultsPage, job: this.state.searchParams },
      }).then((data) => {
        this.setState(
          newPrevState => (
            {
              numRecentlyLoadedResults: data.length,
              allJobsData: update(newPrevState.allJobsData, { $push: data }),
            }
          ),
        );
      });
    }
  }

  onRowSelect(job) {
    $.when(this.getSavedStatus(job.id), JobBrowser.getJobMarkup(job.id)).done(
      (r1, r2) => {
        const newJobData = {
          raw: job,
          savedJob: r1,
          markup: r2[0],
        };
        this.setState({ jobData: newJobData });
      },
    );
  }

  onSearchParamChange(paramName, newParamValue) {
    this.setState(
      prevState => ({
        searchParams: update(prevState.searchParams, {
          [paramName]: {
            $set: newParamValue,
          },
        }),
      }),
      () => { this.search(); },
    );
  }

  getSavedStatus(jobID) {
    return $.get({
      cache: false,
      url: `/api/v1/applicants/${this.props.userID}/saved_jobs/ids`,
    }).then((data) => {
      if (data.includes(jobID)) {
        return true;
      }
      return false;
    });
  }

  search() {
    this.setState({ resultsPage: 1 });
    $.get({
      cache: false,
      url: '/api/v1/jobs/',
      data: { job: this.state.searchParams },
    }).then((data) => {
      this.setState({ numRecentlyLoadedResults: data.length });
      this.setState({ allJobsData: data });
    });
  }

  loadMoreResults() {
    this.setState(
      prevState => ({ resultsPage: prevState.resultsPage + 1 }),
    );
  }

  closeJobWindow() {
    this.setState({ jobData: null });
  }

  render() {
    return (
      <div className="row">
        <div className="table-container">
          { this.props.savedJobsOnly
            ? null
            : (
              <SearchPanel
                specialties={this.props.specialties}
                states={this.props.states}
                onSearchParamChange={this.onSearchParamChange}
              />
            )
          }
          { this.state.numRecentlyLoadedResults === 0
            ? null
            : <Table allJobsData={this.state.allJobsData} onRowSelect={this.onRowSelect} />
          }
          { this.state.numRecentlyLoadedResults < this.props.resultsPerPage
            ? <div className="end-of-results"><h5>End of Results</h5></div>
            : (
              <button
                type="button"
                className="btn load-more-btn"
                onClick={this.loadMoreResults}
              >
                Load More Jobs
              </button>
            )
          }
        </div>
        { this.state.jobData
          ? (
            <div className="panel-container">
              <div className="job-panel">
                <JobPanel
                  jobData={this.state.jobData}
                  closeJobWindow={this.closeJobWindow}
                  userID={this.props.userID}
                  accountType={this.props.accountType}
                />
              </div>
            </div>
          )
          : (
            <div className="panel-container closed">
              <div className="job-panel closed" />
            </div>
          )
        }
      </div>
    );
  }
}

JobBrowser.propTypes = {
  specialties: PropTypes.arrayOf(PropTypes.string).isRequired,
  states: PropTypes.objectOf(PropTypes.string).isRequired,
  resultsPerPage: PropTypes.number.isRequired,
  userID: PropTypes.number,
  accountType: PropTypes.string,
  savedJobsOnly: PropTypes.bool,
};

JobBrowser.defaultProps = {
  userID: null,
  accountType: null,
  savedJobsOnly: false,
};

export default JobBrowser;
