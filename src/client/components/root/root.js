import React from 'react';
import Flower from '../flower/flower';
import './root.css';


export default class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      lang: 'EN',
      flowers: [],
      flowersToDisplay: [],
      siteText: {
        title: "Welcome to Little Shop Of Horrors",
        SearchForYourFlower: "Search for your flower",
        SearchHere: "Search here",
        ChangeLanguageTo: "Change language to:"
      }
    };

    this.flowersListBuilder = this.flowersListBuilder.bind(this);
    this.languageOnChange = this.languageOnChange.bind(this);
    this.flowersSearch = this.flowersSearch.bind(this);
    this.getListOfOptionsElements = this.getListOfOptionsElements.bind(this);

  }


  componentDidMount() {
    this.getFlowersDataFromServer()
  }

  getFlowersDataFromServer() {

    const wantedLanguage = {lang: this.state.lang};
    const that = this;

    const flowersXHR = new XMLHttpRequest();

    flowersXHR.open('post', 'http://localhost:3000/listOfAllFlowers');
    flowersXHR.setRequestHeader('Content-Type', 'application/json');
    flowersXHR.addEventListener("load", () => {
      const allFlowersFromServer = JSON.parse(flowersXHR.responseText).flowerlist;
      that.setState({flowers: allFlowersFromServer});
      this.flowersListBuilder();
      this.getSiteTextDataFromServer();
    });
    flowersXHR.send(JSON.stringify(wantedLanguage));

  }

  getSiteTextDataFromServer() {

    const wantedLanguage = {lang: this.state.lang};
    const that = this;
    const siteTextXHR = new XMLHttpRequest();

    siteTextXHR.open('post', 'http://localhost:3000/siteText');
    siteTextXHR.setRequestHeader('Content-Type', 'application/json');
    siteTextXHR.addEventListener("load", () => {
      const siteTextFromServer = JSON.parse(siteTextXHR.responseText);
      that.setState({siteText: siteTextFromServer});

    });
    siteTextXHR.send(JSON.stringify(wantedLanguage));
  }


  flowersListBuilder() {

    const flowersOnState = this.state.flowers;
    const filteredFlowersToDisplay = this.state.flowersToDisplay;
    const relevantList = this.state.flowersToDisplay.length > 0 ? filteredFlowersToDisplay : flowersOnState;


    return relevantList.map((flower, i) => {
      return <Flower key={i} data={flower}/>
    })

  }

  languageOnChange(e) {
    const selectedLanguage = e.target.value;
    this.setState({lang: selectedLanguage, flowersToDisplay: []}, () => this.getFlowersDataFromServer())
  }

  flowersSearch(e) {
    let data = e.target.value;

    const newFlowers = [];


    this.state.flowers.filter(function (flower) {
      if ((flower.name.includes(data) === true) || (flower.season.includes(data) === true)) {
        newFlowers.push(flower);
      }
    });
    this.setState({flowersToDisplay: newFlowers})


  }

  getListOfOptionsElements() {
    const flowersOnState = this.state.flowers;
    return flowersOnState.map((flower, i) => {
      return <option key={i} value={flower.name}>{flower.name}</option>
    })
  }

  render() {

    return (

      <div>

        <h1 className="main-container">{this.state.siteText.title}</h1>

        <div className="main-container">

          <div className="input-select-container">

            <label>{this.state.siteText.SearchForYourFlower}

              <input list="flowers"
                     onChange={this.flowersSearch}
                     placeholder={this.state.siteText.SearchHere}
                     className="input-select-design"
              />

              <datalist id="flowers">

                {this.getListOfOptionsElements()}

                <option value={'summer'}>Summer</option>
                <option value={'fall'}>Fall</option>
                <option value={'winter'}>Winter</option>
                <option value={'spring'}>Spring</option>

              </datalist>

            </label>


            <label>{this.state.siteText.ChangeLanguageTo}

              <select name="select"
                      className="input-select-design"
                      onChange={this.languageOnChange}>

                <option value="EN" defaultValue>English</option>
                <option value="DE">Dutch</option>
                <option value="FR">French</option>

              </select>

            </label>

          </div>

          <div className="flowers-container">

            {this.flowersListBuilder()}

          </div>

        </div>

      </div>
    )
  }
}