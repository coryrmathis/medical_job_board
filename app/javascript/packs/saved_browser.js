import ReactDOM from 'react-dom'
import React from 'react'
import SavedBrowser from './job_browser/saved_browser';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('jobs-data');
  const specialties = JSON.parse(node.getAttribute('data-specialties'));
  const states = JSON.parse(node.getAttribute('data-states'));
  const userID = JSON.parse(node.getAttribute('data-user-id'));
  ReactDOM.render(
    <SavedBrowser specialties={specialties} states={states} resultsPerPage={25}userID={userID} savedJobsOnly={true}/>,
    node.appendChild(document.createElement('div')),
  );
});
