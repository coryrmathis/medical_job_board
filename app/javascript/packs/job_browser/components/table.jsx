import React from 'react';

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

export default Table;