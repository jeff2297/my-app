// import logo from './logo.svg';
import React from "react";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-regular-svg-icons';

function drop() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function back() {
  document.getElementById('show1').classList.toggle("show1");
}

class App extends React.Component {
  // Constructor 
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
    this.show = this.show.bind(this);
    this.search = this.search.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.darkMode = this.darkMode.bind(this);
    this.state = {
     // isActive: false,
      DataisLoaded: false,
      value: '',
      image: '',
      name: '',
      nativename: '',
      population: null,
      region: '',
      subregion: '',
      capital: '',
      topleveldomain: '',
      currencies: [],
      languages: [],
      items: [],
      borders: [],     
    };
  }
  // ComponentDidMount is used to
  // execute the code 
  componentDidMount() {
    fetch(
      "https://restcountries.com/v2/all")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          DataisLoaded: true

        });
        // console.log(json.length)
      })
  }

  select(e) {
    this.setState({
      image: e.target.dataset.image,
      name: e.target.dataset.name,
      nativename: e.target.dataset.nativename,
      population: e.target.dataset.population,
      region: e.target.dataset.region,
      subregion: e.target.dataset.subregion,
      capital: e.target.dataset.capital,
      topleveldomain: e.target.dataset.topleveldomain,
      currencies: e.target.dataset.currencies,
      languages: e.target.dataset.languages,
      borders: e.target.dataset.borders,
      isActive: true
    });
    //must add show1 if not cannot select another element
    //after back
    document.getElementById('show1').classList.toggle("show1");
  }

  show(e) {
    let item = document.getElementsByClassName('flex-container');
    //item[0] => select whole container
    //item[0].children[0] => select first children (ol)
    //item[0].children[0]).children[3] => select region

    for (let i = 0; i < item[0].children.length; i++) {
      //remove display = none class here
      //to choose another group for filter
      item[0].children[i].classList.remove('flexItemDetails');
      let target = item[0].children[i].children[3].innerText;
      target = target.slice(8);

      if (e.target.innerText !== target) {
        item[0].children[i].classList.add('flexItemDetails')
      }

    }

  }

  search(e) {
    this.setState({value: e.target.value});
    
  }

  handleSubmit(e) {
    alert('A country was search: ' + this.state.value);
    e.preventDefault();

    let item = document.getElementsByClassName('flex-container');
    //remove MagnifyingGlass
   
   
    console.log(this.state.value)
    for (let i = 0; i < item[0].children.length; i++) {
      item[0].children[i].classList.remove('flexItemDetails')
      //item[0].children[i].classList.remove('flexItemDetails');
      let target1 = item[0].children[i].children[1].innerText;
      
      if (this.state.value !== target1) {
        item[0].children[i].classList.add('flexItemDetails')
      }
    }
  }

  darkMode() {
      document.getElementsByClassName('header')[0].classList.toggle('dark');
      document.getElementsByClassName('darkMode-icon')[0].classList.toggle('dark-moon');
      document.getElementsByClassName('search')[0].classList.toggle('dark');
      document.getElementsByClassName('icon')[0].classList.toggle('dark-icon');
      document.getElementsByClassName('filter')[0].children[0].classList.toggle('dark');
      document.getElementsByClassName('filter')[0].children[1].classList.toggle('dark');
      document.getElementsByClassName('dropdown-content')[0].classList.toggle('dark');
      document.getElementsByClassName('flex-container')[0].classList.toggle('dark');
      document.getElementsByClassName('App')[0].classList.toggle('dark');
   
  }

  render() {
    const { DataisLoaded, items, value, image, name, 
      nativename, population, region, subregion,
      capital, topleveldomain, currencies, languages, borders } = this.state;

    if (!DataisLoaded) return <div>
      <h1> Please wait some time.... </h1>
    </div>;
    return (
      <div className="App">
        <header className="header">
          <p>Where in the world?</p>
          <FontAwesomeIcon className="darkMode-icon" icon={faMoon} onClick={this.darkMode} />
          <p onClick={this.darkMode} id="dark-mode">Dark Mode</p>
        </header>

        <div className="input">
          <form  onSubmit={this.handleSubmit}>
          <input className="search" type="text" placeholder="Search for a country.." value={value} onChange={this.search}  />
          <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
          </form>
        </div>

        <div className="filter">
          <button onClick={drop} className="dropbtn">Filter by region</button>
          <FontAwesomeIcon className="filter-icon" icon={faAngleDown} />
          <div id="myDropdown" className="dropdown-content">

            <a onClick={this.show} href="#Africa">Africa</a>
            <a onClick={this.show} href="#Americas">Americas</a>
            <a onClick={this.show} href="#Asia">Asia</a>
            <a onClick={this.show} href="#Europe">Europe</a>
            <a onClick={this.show} href="#Oceania">Oceania</a>
          </div>
        </div>

        <div className="flex-container">
          {

            items.map((item) => (

              //don't put key="{i}" inside ol
              //instead use i from item.map
              <ol key={item.numericCode} data-name={item.name} data-population={item.population}
                data-region={item.region} data-subregion={item.subregion} data-capital={item.capital}
                data-nativename={item.nativeName} data-topleveldomain={item.topLevelDomain}
                data-currencies={item.currencies ? item.currencies[0].name : ' '} data-languages={item.languages ? item.languages[0].name : ''}
                data-borders={item.borders} data-image={item.flags.png}
                onClick={this.select} >
                <img src={item.flags.png} alt="flag" />
                <h2>{item.name}</h2>
                <li><b>Population: </b>{item.population}</li>
                <li><b>Region: </b>{item.region}</li>
                <li><b>Capital: </b>{item.capital}</li>
              </ol>

            ))

          }
        </div>

        <div className="flexItemDetails" id="show1">

          <button id="select-button" onClick={back}>
            <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
            Back
          </button>
          <img src={image} alt="selected" />
          <h2>{name}</h2>
          

          <ol>
            <li><b>Native Name: </b>{nativename}</li>
            <li><b>Population: </b>{population}</li>
            <li><b>Region: </b>{region}</li>
            <li><b>Sub Region: </b>{subregion}</li>
            <li><b>Capital: </b>{capital}</li>
            <li><b>Top Level Domain: </b>{topleveldomain}</li>
            <li><b>Currencies: </b>{currencies}</li>
            <li><b>Languages: </b>{languages}</li>
            <li><b>Border countries: </b>{borders}</li>
          </ol>

        </div>
      </div>
    );
  }

}

export default App;

