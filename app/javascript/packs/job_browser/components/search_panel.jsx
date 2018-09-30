import React from 'react'

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className="search-panel">
        <div className="title-bar">
          <h3>Search Criteria</h3>
        </div>
        <div className="search-input-container">
          <div className="input-group">
            <select name="job[specialty]" className="form-control" onChange={function(event){this.props.onSpecialtyChange(event.target.value)}.bind(this)}>
              <option value="">Specialty</option>
              {this.props.specialties.map(function(specialty, i){
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
            <select id="state-dropdown" name="job[state]" className="form-control" onChange={function(event){this.props.onStateChange(event.target.value)}.bind(this)}>
              <option value="">State</option>
              {Object.keys(this.props.states).map(function(abbreviation, i){
                return(
                  <option key={i} value={abbreviation}>{this.props.states[abbreviation]}</option>
                );
              }.bind(this))}
            </select>
          </div>
          <div className="input-group">
            <input type="text" name="job[city]" placeholder="City" className="form-control" onChange={function(event){this.props.onCityChange(event.target.value)}.bind(this)} />
            <input type="text" name="job[subspecialty_keywords]" placeholder="Subspecialties/Keywords" className="form-control" onChange={function(event){this.props.onKeywordsChange(event.target.value)}.bind(this)} />
          </div>
          <div className="input-group visas-radio" onChange={function(event){this.props.onVisasChange(event.target.value)}.bind(this)}>
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
}
  
export default SearchPanel;