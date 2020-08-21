import React from 'react';
import DatePicker from "react-datepicker";
import './Transactions.css'
import "react-datepicker/dist/react-datepicker.css";

export class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.date = new Date();

    this.state = {
      transactionFrom: new Date(),
      transactionTo: this.date.setDate(this.date.getDate() + 7),
      data: []
    };
  }

  handleChange = (date, type) => this.setState({ [type]: date })

  onSearch = () => {
    const transactionPostDateFrom = this.state.transactionFrom.toISOString();
    const transactionPostDateTo = new Date(this.state.transactionTo).toISOString();
    const apiUrl = 'https://api.github.com/users/hacktivist123/repos';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({ data }, () => console.log(this.state, 'state')));
  }

  onReset = () => this.setState({ data: [] })

  getHeader = () => (
    <div className="headers">
      <span className="column-spacing">ID</span>
      <span className="column-spacing">NAME</span>
      <span className="column-spacing">UPDATED AT</span>
    </div>
  )

  render() {
    return (
      <>
        <>
          <h1>Get Transactions</h1>
          <div className="filter-transaction">
            <div className="column-spacing">
              <div className="date-title">Transaction Post From:</div>
              <DatePicker
                selected={this.state.transactionFrom}
                onChange={(e) => this.handleChange(e, 'transactionFrom')}
                className="date-picker"
              />
            </div>
            <div className="column-spacing">
              <div className="date-title">Transaction To From:</div>
              <DatePicker
                selected={this.state.transactionTo}
                onChange={(date) => this.handleChange(date, 'transactionTo')}
                className="date-picker"
              />
            </div>
            <button onClick={this.onSearch}>Search</button>
            <button onClick={this.onReset}>Reset</button>
          </div>
        </>
        <div className="transaction-table">
          {this.state.data && this.state.data.length ? (
            <>
              {this.getHeader()}
              {this.state.data.map((obj, i) => (
                <div className="transaction-row" key={i}>
                  <span className="column-spacing">{obj.id}</span>
                  <span className="column-spacing">{obj.name}</span>
                  <span className="column-spacing">{obj.updated_at}</span>
                </div>
              ))}
            </>
          ) : null}
        </div>
      </>
    )
  }
}