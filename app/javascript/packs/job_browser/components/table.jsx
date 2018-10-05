import React from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

function TableRow(props) {
  return (
    <tr
      onClick={() => { props.onSelect(props.job); }}
      data-job-id={props.job.id}
    >
      <td>{props.row + 1}</td>
      <td>{props.job.specialty}</td>
      <td>{props.job.city}</td>
      <td>{props.job.state}</td>
      <td>{props.job.visas}</td>
      <td>{props.job.distance_to_metro}</td>
      <td>{props.job.subspecialty_keywords}</td>
    </tr>
  );
}

TableRow.propTypes = {
  onSelect: PropTypes.func.isRequired,
  row: PropTypes.number.isRequired,
  job: PropTypes.shape({
    id: PropTypes.number,
    specialty: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    visas: PropTypes.string,
    distance_to_metro: PropTypes.string,
    subspecialty_keywords: PropTypes.string,
  }).isRequired,
};

function Table(props) {
  if (!props.allJobsData) {
    return (
      null
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
        { props.allJobsData.map((job, i) => (
          <TableRow
            job={job}
            row={i}
            key={uniqid()}
            onSelect={props.onRowSelect}
          />
        )) }
      </tbody>
    </table>
  );
}

Table.propTypes = {
  onRowSelect: PropTypes.func.isRequired,
  allJobsData: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.string,
      distance_to_metro: PropTypes.string,
      id: PropTypes.number,
      specialty: PropTypes.string,
      state: PropTypes.string,
      subspecialty_keywords: PropTypes.string,
      visas: PropTypes.string,
    }),
  ),
};

Table.defaultProps = {
  allJobsData: null,
};

export default Table;
