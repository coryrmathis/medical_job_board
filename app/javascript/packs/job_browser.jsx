import React from 'react'
import ReactDOM from 'react-dom'

function Table(props) {
  return (
    <table className="table table-striped">
      <tbody>
        {props.data.map(function (order, i) {
          return (
            <TableRow rowData={order} key={i} onSelect={props.onRowSelect}/>
          );
        })}
      </tbody>
    </table>
  );
}

function TableRow(props) {
  return(
    <tr
      onClick={function(){props.onSelect(props.rowData.id)}.bind(this)}
      data-order-id={props.rowData.id}
    >
      <td>{props.rowData.first_name}</td>
      <td>{props.rowData.last_name}</td>
      <td>{props.rowData.email}</td>
      <td>{props.rowData.date_ordered}</td>
      <td>{props.rowData.products.map(function (product, i) {
        return (
          <div key={i}>
            <p>{product.title}</p>
            <p>{product.animals}</p>
          </div>
        );
      })}</td>
    </tr>
  );
}

function OrderPanel(props){
  return(
    <div>
      <h1>I got ya order right here:</h1>
      <p>{props.orderData.id}</p>
    </div>
  );
}

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {orderData: "None"};
    this.onRowSelect = this.onRowSelect.bind(this)
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  onRowSelect(id) {
    console.log("up top!", id);
    $.get(
      "orders/" + id,
      function(data) {
        this.state.orderData = data;
        this.setState(this.state);
      }.bind(this)
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <Table data={this.props.data} onRowSelect={this.onRowSelect}/>
        </div>
        <div className="col-md-6">
          <OrderPanel orderData={this.state.orderData}/>
        </div>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('orders-data');
  const data = JSON.parse(node.getAttribute('data'));
  ReactDOM.render(
    <Application data={data}/>,
    node.appendChild(document.createElement('div')),
  );
});