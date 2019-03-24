import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import axios from 'axios';
import Rendering from './factRendering.js';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facts: [],
      conversionValue: 0,
      hasError: false
    }
    this.fetchFacts = this.fetchFacts.bind(this);
    this.updateState = this.updateState.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }
  fetchFacts() {
    this.setState({
      hasError: false
    })
    axios.get(`https://restcountries.eu/rest/v2/name/${this.state.countryName}`)
      .then(json => json.data.map(country => ({
        "id": json.data.indexOf(country) + 1,
        "name": country.name,
        "capital": country.capital,
        "population": country.population,
        "currency": country.currencies.map((currency) => currency.name).join(', '),
        "currencyCode": country.currencies[0].code,
        "currencyToCovert": "",
        "convertedCurrency": "",
        "flag": country.flag
      }))).then(data =>
        this.setState({
          facts: data
        })).catch(err => {
          this.setState({
            facts: [],
            hasError: true
          })
        })
  }
  updateState(e) {
    this.setState({
      countryName: e.target.value
    });
  }
  clearInput() {
    this.setState({
      countryName: "",
      facts: [],
      hasError: false
    });
    ReactDOM.findDOMNode(this.refs.countryNameTxt).focus();
  }
  updateCurrencyText(index, e) {
    const copyFacts = Object.assign([], this.state.facts);
    copyFacts[index].currencyToCovert = e.target.value;
    this.setState({
      facts: copyFacts
    });
  }
  calculateCurrency(index, e) {
    const copyFacts = Object.assign([], this.state.facts);
    const URL = `http://data.fixer.io/api/latest?access_key=ed69fe181a9e1b5fb905ca9d3b57c8b2&symbols=${copyFacts[index].currencyCode},SEK`
    axios.get(URL).then((result) => result.data.rates)
      .then((rates) => {
        const convertedRate = (rates[copyFacts[index].currencyCode] / rates['SEK'] * copyFacts[index].currencyToCovert).toFixed(5);
        copyFacts[index].convertedCurrency = `${convertedRate} ${copyFacts[index].currencyCode}`;
        this.setState({
          facts: copyFacts
        });
      });
  }
  render() {
    return (
      <div >
        <br />
        <input className="search" type="text" value={this.state.countryName} placeholder="search country" onChange={this.updateState} ref="countryNameTxt" />
        <IconButton onClick={this.fetchFacts}>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small" color="primary" style={{ margin: 20 }} onClick={this.clearInput}>Clear</Button>
        <hr />
        <Error hasError={this.state.hasError}></Error>
        {
          this.state.facts.map((fact, id) => {
            return (<Rendering population={fact.population}
              capital={fact.capital}
              currency={fact.currency}
              currencyCode={fact.currencyCode}
              flag={fact.flag}
              currencyToCovert={fact.currencyToCovert}
              convertedCurrency={fact.convertedCurrency}
              key={fact.id}
              updateCurrency={this.updateCurrencyText.bind(this, id)}
              convertCurrency={this.calculateCurrency.bind(this, id)}>{fact.name}</Rendering>)
          })
        }
      </div>
    );
  }
}

function Error(props) {
  if (props.hasError)
    return <spam>Oops! Country doesn't exixts</spam>
  else
    return null
}

export default App;


