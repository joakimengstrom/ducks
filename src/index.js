import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import SendSighting from './components/send_sightings';
import Sightings from './components/get_sightings';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "sendSightings",
        species: [] 
    };
  }

  componentWillMount() {
   fetch('https://secret-everglades-42646.herokuapp.com/species')
  .then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      response.json().then(data => {
        this.setState({species: data});
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

  handleSendSightings = () => {
    this.setState({value: "sendSightings"});
  }

  handleGetSightings = () => {
    this.setState({value: "getSightings"});
  }


  render () {
    const species = this.state.species.map((x) => {
    return x.name.charAt(0).toUpperCase() + x.name.slice(1);
    })
    const value = this.state.value;
    let view = null;
    if (value === "sendSightings") {
      if (species.length > 0) {
        view = <SendSighting species={species}/> 
      }
      else {
        view = null;
      }
    }
    else {
      view = <Sightings />
    }
    return (
      <div className="container">
          <div className="btn-group">
          <button onClick={this.handleSendSightings} className="btn btn-primary">Add Sighting </button>
          <button onClick={this.handleGetSightings} className="btn btn-primary">Get sightings </button>
          </div>
          {view}
          </div>
          );
  }
    
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
  );