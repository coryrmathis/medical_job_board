import ReactDOM from 'react-dom';
import React from 'react';
import JobBrowser from './job_browser/job_browser';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('jobs-data');
  const specialties = JSON.parse(node.getAttribute('data-specialties'));
  const states = JSON.parse(node.getAttribute('data-states'));
  const userID = JSON.parse(node.getAttribute('data-user-id'));
  const accountType = JSON.parse(node.getAttribute('data-user-account-type'));
  ReactDOM.render(
    <JobBrowser specialties={specialties} states={states} resultsPerPage={25}userID={userID} accountType={accountType} savedJobsOnly={false}/>,
    node.appendChild(document.createElement('div')),
  );
});
