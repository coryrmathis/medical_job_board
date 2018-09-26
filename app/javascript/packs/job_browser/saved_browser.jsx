import React from 'react'
import JobPanel from './components/job_panel'
import Table from './components/table'

class SavedBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allJobsData: null,
      resultsPage: 1,
    };
    this.onRowSelect = this.onRowSelect.bind(this);
    this.loadMoreResults = this.loadMoreResults.bind(this);
    this.closeJobWindow = this.closeJobWindow.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    $.get({
      cache: false,
      url: "/users/" + this.props.userID + "/saved_jobs"
    }).then(function(data){
      this.setState({numRecentlyLoadedResults: data.length});
      this.state.allJobsData = data;
      this.setState(this.state);
    }.bind(this));
  }

  handleFavoriteClick() {
    this.state.jobData.savedJob = !this.state.jobData.savedJob;
    this.setState(this.state);
  }

  onRowSelect(id) {
    $.get({
      cache: false,
      url: "/jobs/" + id,
    }).then(function(data){
      this.state.jobData = data;
      this.setState(this.state);
    }.bind(this));
  }

  loadMoreResults() {
    console.log(this.state.resultsPage);
    this.state.resultsPage += 1;
    this.setState(this.state);

    $.get({
      cache: false,
      url: "/users/" + this.props.userID + "/saved_jobs",
      data: {"page": this.state.resultsPage}
    }).then(function(data){
      this.setState({numRecentlyLoadedResults: data.length});
      this.state.allJobsData = this.state.allJobsData.concat(data);
      this.setState(this.state);
    }.bind(this));
  }

  closeJobWindow() {
    this.setState({jobData: null});
  }

  render() {
    return (
      <div className="row">
        <div className="table-container">
          <div class="saved-jobs-title">
              <h1>Your Saved Jobs</h1>
          </div>
          {
            this.state.numRecentlyLoadedResults === 0 ? 
              null :
              <Table allJobsData={this.state.allJobsData} onRowSelect={this.onRowSelect}/>
          }
          {
            this.state.numRecentlyLoadedResults < this.props.resultsPerPage ?
              null : 
              <button className="btn load-more-btn" onClick={this.loadMoreResults}>Load More Jobs</button>
          }
        </div>
        {this.state.jobData ?
          <div className="panel-container">
            <div className="job-panel">
              <JobPanel jobData={this.state.jobData} closeJobWindow={this.closeJobWindow} userID={this.props.userID} accountType={this.props.accountType} handleFavoriteClick={this.handleFavoriteClick}/>
            </div>
          </div> :
          <div className="panel-container closed">
            <div className="job-panel closed"></div>
          </div>
        }
      </div>
    );
  }
}

export default SavedBrowser;