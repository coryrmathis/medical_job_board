import React from 'react'
import ReactDOM from 'react-dom'

function TableRow(props) {
  return(
    <tr
      onClick={function(){props.onSelect(props.rowData.id)}.bind(this)}
      data-job-id={props.rowData.id}
    >
      <td>{props.row + 1}</td>
      <td>{props.rowData.specialty}</td>
      <td>{props.rowData.city}</td>
      <td>{props.rowData.state}</td>
      <td>{props.rowData.visas}</td>
      <td>{props.rowData.distance_to_metro}</td>
      <td>{props.rowData.subspecialty_keywords}</td>
    </tr>
  );
}

function Table(props) {
  if (!props.allJobsData) {
    return (
      <div>
      </div>
    );
  }
  return (
    <table className="table table-responsive">
      <thead>
        <tr>
          <td>&#35;</td>
          <td>Specialty</td>
          <td>City</td>
          <td>State</td>
          <td>Visas</td>
          <td>Distance To Metro</td>
          <td>Additional Info</td>
        </tr>
      </thead>
      <tbody>
        {props.allJobsData.map(function (job, i) {
          return (
            <TableRow rowData={job} row={i} key={i} onSelect={props.onRowSelect}/>
          );
        })}
      </tbody>
    </table>
  );
}

class JobPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: false,
      hover: false
    };
    this.handleFavoriteClass = this.handleFavoriteClass.bind(this)
  }

  handleFavoriteClass(){
    return this.state.favorited ? 'fa fa-star' : 'fa fa-star-o';
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
                    className={this.handleFavoriteClass()}
                    onMouseEnter={function(e){
                      e.target.className = "fa fa-star-half-o";
                    }}
                    onMouseLeave={function(e){
                      e.target.className = this.handleFavoriteClass();
                    }.bind(this)}
                    onClick={function(){
                      this.state.favorited = !this.state.favorited;
                      this.setState(this.state);
                    }.bind(this)}
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

function SearchPanel(props){
  return(
    <div className="search-panel">
      <div className="title-bar">
        <h3>Search Criteria</h3>
      </div>
      <div className="search-input-container">
        <div className="input-group">
          <select name="job[specialty]" className="form-control" onChange={function(event){props.onSpecialtyChange(event.target.value)}}>
            <option value="">Specialty</option>
            {props.specialties.map(function(specialty, i){
              if(specialty === "Advanced Practice - ALL"){
                return(
                  <option key={i} value="%Advanced Practice%">
                    {specialty}
                  </option>
                );
              } else {
                return(
                  <option key={i} value={specialty}>
                    {specialty}
                  </option>
                );
              }
            })}
          </select>
          <select id="state-dropdown" name="job[state]" className="form-control" onChange={function(event){props.onStateChange(event.target.value)}}>
            <option value="">State</option>
            {Object.keys(props.states).map(function(abbreviation, i){
              return(
                <option key={i} value={abbreviation}>{props.states[abbreviation]}</option>
              );
            })}
          </select>
        </div>
        <div className="input-group">
          <input type="text" name="job[city]" placeholder="City" className="form-control" onChange={function(event){props.onCityChange(event.target.value)}} />

          <input type="text" name="job[subspecialty_keywords]" placeholder="Subspecialties/Keywords" className="form-control" onChange={function(event){props.onKeywordsChange(event.target.value)}} />
        </div>
        <div className="input-group visas-radio" onChange={function(event){props.onVisasChange(event.target.value)}}>
          <h5>Permitted Visas:</h5>
          <div className="radio-inline">
            <input type="radio" name="job[visas]" value="" defaultChecked />None
          </div>
          <div className="radio-inline">
            <input type="radio" name="job[visas]" value="j1" />J1
          </div>
          <div className="radio-inline">
            <input type="radio" name="job[visas]" value="h1" />H1
          </div>
        </div>
      </div>
    </div>
  );
}

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allJobsData: null,
      searchParams: {},
      resultsPage: 1
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
    $.get(
      "/jobs/",
      function(data){
        this.setState({numRecentlyLoadedResults: data.length});
        this.state.allJobsData = data;
        this.setState(this.state);
      }.bind(this)
    );
  }

  onRowSelect(id) {
    $.get(
      "/jobs/" + id,
      function(data) {
        this.state.jobData = data;
        this.setState(this.state);
      }.bind(this)
    );
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
    $.get(
      "/jobs/",
      {"job": this.state.searchParams},
      function(data){
        this.setState({numRecentlyLoadedResults: data.length});
        this.setState({allJobsData: data});
      }.bind(this)
    );
  }

  loadMoreResults() {
    console.log(this.state.resultsPage);
    this.state.resultsPage += 1;
    this.setState(this.state);
    $.get(
      "/jobs/",
      {"page": this.state.resultsPage, "job": this.state.searchParams},
      function(data){
        this.setState({numRecentlyLoadedResults: data.length});
        this.state.allJobsData = this.state.allJobsData.concat(data);
        this.setState(this.state);
      }.bind(this)
    );
  }

  closeJobWindow() {
    this.setState({jobData: null});
  }

  render() {
    return (
      <div className="row">
        <div className="table-container">
          <SearchPanel
            specialties={this.props.specialties}
            states={this.props.states}
            onSpecialtyChange={this.onSpecialtyChange}
            onStateChange={this.onStateChange}
            onCityChange={this.onCityChange}
            onKeywordsChange={this.onKeywordsChange}
            onVisasChange={this.onVisasChange}
          />
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
              <JobPanel jobData={this.state.jobData} closeJobWindow={this.closeJobWindow}/>
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

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('jobs-data');
  if(node){
    const specialties = JSON.parse(node.getAttribute('data-specialties'));
    const states = JSON.parse(node.getAttribute('data-states'));
    ReactDOM.render(
      <Application specialties={specialties} states={states} resultsPerPage={25}/>,
      node.appendChild(document.createElement('div')),
    );
  }
});


  document.addEventListener('scroll', function(event)
  {
      var element = event.target;
      if (element.scrollHeight - element.scrollTop === element.clientHeight)
      {
          console.log('scrolled');
      }
  });