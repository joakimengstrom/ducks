import React from 'react';

class Species extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      species : []
    };
  }

  componentDidMount() {
   fetch('http://localhost:8081/species')
  .then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(data => {
        console.log(data);
        this.setState({species: data});
        console.log(data[0]);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

  render () {
    return (
      <ul>
        {this.state.species.map((specie, index) => (
          <li key={index}>
          {specie.name}
          </li>
        ))} 
      </ul>
      );
  }
}

export default Species