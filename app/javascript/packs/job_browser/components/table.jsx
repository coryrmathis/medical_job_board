import React from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

function TableRow(props) {
  return (
    <tr
      onClick={() => { props.onSelect(props.rowData.id); }}
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

TableRow.propTypes = {
  onSelect: PropTypes.func.isRequired,
  row: PropTypes.number.isRequired,
  rowData: PropTypes.shape({
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
            rowData={job}
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
