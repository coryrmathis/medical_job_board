import React from 'react'
import JobPanel from './components/job_panel'
import SearchPanel from './components/search_panel'
import Table from './components/table'

class JobBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allJobsData: null,
      searchParams: {},
      resultsPage: 1,
    };
    this.onRowSelect = this.onRowSelect.bind(this);
    this.onSpecialtyChange = this.onSpecialtyChange.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.onKeywordsChange = this.onKeywordsChange.bind(this);
    this.onVisasChange = this.onVisasChange.bind(this);
    this.search = this.search.bind(this);
    this.loadMoreResults = this.loadMoreResults.bind(this);
    this.closeJobWindow = this.closeJobWindow.bind(this);
  }

  componentDidMount() {
    $.get({
      cache: false,
      url: "/jobs/",
    }).then(function(data){
      this.setState({numRecentlyLoadedResults: data.length});
      this.state.allJobsData = data;
      this.setState(this.state);
    }.bind(this));
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

  onSpecialtyChange(newSpecialty) {
    this.state.searchParams["specialty"] = newSpecialty;
    this.setState(this.state);
    this.search();
  }

  onStateChange(newState) {
    this.state.searchParams["state"] = newState;
    this.setState(this.state);
    this.search();
  }

  onCityChange(newCity) {
    this.state.searchParams["city"] = newCity;
    this.setState(this.state);
    this.search();
  }

  onKeywordsChange(newKeywords) {
    this.state.searchParams["subspecialty_keywords"] = newKeywords;
    this.setState(this.state);
    this.search();
  }

  onVisasChange(newVisa) {
    this.state.searchParams["visas"] = newVisa;
    this.setState(this.state);
    this.search();
  }

  search() {
    this.setState({resultsPage: 1});
    $.get({
      cache: false,
      url: "/jobs/",
      data: {"job": this.state.searchParams}
    }).then(function(data){
      this.setState({numRecentlyLoadedResults: data.length});
      this.setState({allJobsData: data});
    }.bind(this));
  }

  loadMoreResults() {
    console.log(this.state.resultsPage);
    this.state.resultsPage += 1;
    this.setState(this.state);

    $.get({
      cache: false,
      url: "/jobs/",
      data: {"page": this.state.resultsPage, "job": this.state.searchParams}
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
          {this.props.savedJobsOnly ?
            <div></div> :
            <SearchPanel
                specialties={this.props.specialties}
                states={this.props.states}
                onSpecialtyChange={this.onSpecialtyChange}
                onStateChange={this.onStateChange}
                onCityChange={this.onCityChange}
                onKeywordsChange={this.onKeywordsChange}
                onVisasChange={this.onVisasChange}
            />
          }
          
          {
            this.state.numRecentlyLoadedResults === 0 ? 
            <div></div> :
            <Table allJobsData={this.state.allJobsData} onRowSelect={this.onRowSelect}/>
          }
          {
            this.state.numRecentlyLoadedResults < this.props.resultsPerPage ?
            <div className="end-of-results"><h5>End of Results</h5></div> : 
            <button className="btn load-more-btn" onClick={this.loadMoreResults}>Load More Jobs</button>
          }
        </div>
        {
          this.state.jobData ?
          <div className="panel-container">
            <div className="job-panel">
              <JobPanel jobData={this.state.jobData} closeJobWindow={this.closeJobWindow} userID={this.props.userID} handleFavoriteClick={function(){}}/>
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

export default JobBrowser;