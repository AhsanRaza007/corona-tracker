import React, {Component} from 'react';

// import Cards from './components/Cards/Cards';
// import Charts from './components/Charts/Charts';
// import CountryPicker from './components/CountryPicker/CountryPicker';

import {Cards, Chart, CountryPicker} from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import coronaImg from './images/image.png'

class App extends Component {

  state = {
    data: {},
    country: ''
  }

  handleCountryChange = async (country) => {
    if(country === 'global'){
      country=undefined;
    }
    const fetchedData = await fetchData(country);
    this.setState({data: fetchedData, country: country});

  }

  async componentDidMount() {
      const fetchedData = await fetchData();
      this.setState({data : fetchedData});
  }
  render(){

    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img src={coronaImg} className={styles.image} alt="covid-19"/>
        <Cards data={data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country}/>
      </div>
    );
  }
}
export default App;
