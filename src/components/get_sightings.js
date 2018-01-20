import React from 'react';
import SightingsItem from './get_sightings_item';


class Sightings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sightings : [],
      order : 'newer_first'
    };
  }

  componentDidMount() {
   fetch('https://secret-everglades-42646.herokuapp.com/sightings')
  .then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      response.json().then(data => {
        this.setState({sightings: data});
        // Initializes list as newest first
        this.handleNewerFirst();
        this.formatSightings();
        });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

formatSightings = () => {
  const sightings = this.state.sightings;
  sightings.map((sighting) => {
          // Changing the format for dateTime from ISO
          sighting.dateTime = sighting.dateTime.replace("Z", " ").replace("T", " ");
          // Capitalizing the first letter for species
          sighting.species = sighting.species.charAt(0).toUpperCase() + sighting.species.slice(1);
          console.log(sighting.dateTime);
          this.setState({sightings});
          return this.setState({sightings});
  });
}


handleNewerFirst = () => {
  const sightings = this.state.sightings;
  this.setState({order : 'newer_first'});
  // Sorting sightings by date with the newest first
  sightings.sort(function(a,b){
    var d = new Date(a.dateTime);
    var c = new Date(b.dateTime);
    return c-d;
  });
  this.setState({sightings});
} 

handleOlderFirst = () => {
  const sightings = this.state.sightings;
  this.setState({order : 'older_first'});
  // Sorting sightings by date with the oldest first
  sightings.sort(function(a,b){
    var c = new Date(a.dateTime);
    var d = new Date(b.dateTime);
    return c-d;
  });
  this.setState({sightings});

}

  render () {
    var button = null;
    const sightings = this.state.sightings.map((sighting) => {
      return <SightingsItem sighting={sighting} key={sighting.id} /> 
    })
    if (this.state.order === 'older_first') {
          
            button = <NewerButton onClick={this.handleNewerFirst} />
        }
    else {
            button = <OlderButton onClick={this.handleOlderFirst} />
        }

          
    return (
      <div>
      <ul class="list-group list">
        <li class="order-btn"> {button}</li>
        {sightings} 
      </ul>
      </div>
      );
  }
}

function NewerButton(props) {
  return (
    <button onClick={props.onClick} class="btn btn-primary">
    Newest first
    </button>
    )
}

function OlderButton(props) {
  return (
    <button onClick={props.onClick} class="btn btn-primary">
    Oldest first
    </button>
    )
}

export default Sightings