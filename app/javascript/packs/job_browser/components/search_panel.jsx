import React from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      specialty: '',
      state: '',
    };
  }

  render() {
    return (
      <div className="search-panel">
        <div className="title-bar">
          <h3>Search Criteria</h3>
        </div>
        <div className="search-input-container">
          <div className="input-group">
            <select
              name="job[specialty]"
              className="form-control"
              onChange={(event) => {
                this.setState({ specialty: event.target.value });
                this.props.onSearchParamChange('specialty', event.target.value);
              }}
              value={this.state.specialty}
            >
              <option value="">Specialty</option>
              {this.props.specialties.map((specialty) => {
                if (specialty === 'Advanced Practice - ALL') {
                  return (
                    <option key={uniqid()} value="%Advanced Practice%">
                      {specialty}
                    </option>
                  );
                }
                return (
                  <option key={uniqid()} value={specialty}>
                    {specialty}
                  </option>
                );
              })}
            </select>
            <select
              id="state-dropdown"
              name="job[state]"
              className="form-control"
              onChange={(event) => {
                this.setState({ state: event.target.value });
                this.props.onSearchParamChange('state', event.target.value);
              }}
              value={this.state.state}
            >
              <option value="">State</option>
              {Object.keys(this.props.states).map(abbreviation => (
                <option key={uniqid()} value={abbreviation}>
                  {this.props.states[abbreviation]}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="job[city]"
              placeholder="City"
              className="form-control"
              onChange={(event) => {
                this.props.onSearchParamChange('city', event.target.value);
              }}
            />
            <input
              type="text"
              name="job[subspecialty_keywords]"
              placeholder="Subspecialties/Keywords"
              className="form-control"
              onChange={(event) => {
                this.props.onSearchParamChange('subspecialty_keywords', event.target.value);
              }}
            />
          </div>
          <div
            className="input-group visas-radio"
            onChange={(event) => {
              this.props.onSearchParamChange('visas', event.target.value);
            }}
          >
            <h5>Permitted Visas:</h5>
            <div className="radio-inline">
              <input type="radio" name="job[visas]" value="" defaultChecked />
              None
            </div>
            <div className="radio-inline">
              <input type="radio" name="job[visas]" value="j1" />
              J1
            </div>
            <div className="radio-inline">
              <input type="radio" name="job[visas]" value="h1" />
              H1
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchPanel.propTypes = {
  specialties: PropTypes.arrayOf(PropTypes.string).isRequired,
  states: PropTypes.objectOf(PropTypes.string).isRequired,
  onSearchParamChange: PropTypes.func.isRequired,
};

export default SearchPanel;
