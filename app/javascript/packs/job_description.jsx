// // Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// // like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// // of the page.

// import React from 'react'
// import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'

// class Job extends React.Component {

//   render() {
//     return (
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
//       </div>
//     );
//   }
// }



// function Description(props) {
//   return(
//     <div>
//       <h1>Job Description</h1>
//       <p>Click a job to see a description and apply!</p>
//       <h1>{props.city}</h1>
//     </div>
//   );
// }

// document.addEventListener('DOMContentLoaded', () => {
//   var city = "No city";
//   const node = document.getElementById('job-description-container');
//   $(node).data('city', 'none');
//   console.log($(node).data('city'))
//   city = $(node).data('city');
//   // console.log(isEmpty($(node).data()));

//   $(document).ready(function(){
//     $(document).on('click', 'tr', function(){
//       var jobID = $(this).attr('data-job-id')
//       if(jobID){
//         $.get('/jobs/' + jobID, function(data){
//           $('#job-description-container').data(data);
//           console.log($('#job-description-container').data('city'));
//           city = $('#job-description-container').data('city');

//           ReactDOM.render(
//             <Description city={city}/>, 
//             document.getElementById('job-description-container')
//           );

//         });
//       }
//     });
//   });

//   // console.log(city);

//   // ReactDOM.render(
//   //   <Description city={city}/>, 
//   //   document.getElementById('job-description-container')
//   // );
// });
