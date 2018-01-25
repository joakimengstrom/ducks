import React from 'react';


class SendSighting extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      species: this.props.species[0],
      description: '',
      quantity: '',
      dateTime: '',
      submitSuccess: false,
      submitInvalid: false,
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      submitSuccess: false,
      submitInvalid: false
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var dateTime = this.state.dateTime;
    var number = Number(this.state.quantity);
    console.log(isNaN(dateTime));
    // Checks validity of input
    if (isNaN(Date.parse(dateTime)) || isNaN(number) || number === 0 || !(this.props.species.includes(this.state.species))) {
      this.setState({submitInvalid: true});
    }
    // if input is valid 
    else {
      if (dateTime.length === 19) {
      dateTime += 'Z';
    }
    else {
      dateTime += ':00Z';
    }
    var name = this.state.species.toLowerCase();
    fetch('http://localhost:8081/sightings', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        species: name,
        description: this.state.description,
        dateTime: dateTime,
        count: number,
      })
    })
    .then((response) => response.text())
.then((responseText) => {
  this.setState({submitSuccess : true});
})
 .catch((error) => {
   console.error(error);
 });
    this.setState({
      species: this.props.species[0],
      description: '',
      quantity: '',
      dateTime: '',
    });
    this.props.onFormSend();
  }
  }

  render() {
    var message = null;
    if(this.state.submitSuccess){
      message = "Your sighting was succesfully saved!";
    }
    if(this.state.submitInvalid) {
      message = "Invalid input!";
    }
     
    return (
      <div>
      <div className="b">
      <h2>Add sighting</h2>
      <form onSubmit={this.handleSubmit}>
      <div  className="form-group">
      <label>
      Species:
      <select value={this.state.species} onChange={this.handleChange} name="species" className="form-control">
        {this.props.species.map((x, index) => <option key={index}  className="species-text">{x}</option>)}
      </select>
    </label>
    </div>
      <div className="form-group">
      <label>
      Description:
      <textarea 
      required
      name="description"
      value={this.state.description}
      onChange={this.handleChange}
      className="form-control" />
    </label>
    </div>
    <div className="form-group">
    <label>
      Quantity:
      <input 
        required
        min="1"
        step="1"
        name="quantity"
        type="number"
      value={this.state.quantity}
      onChange={this.handleChange}
      className="form-control" />
    </label>
    </div>
    <div className="form-group">
    <label>
      Time of sighting:
      <input
        required 
        name="dateTime"
        type="datetime-local"
        step="1"
      value={this.state.dateTime}
      onChange={this.handleChange}
      className="form-control" />
    </label>
    </div>
    <button type="submit" className="btn btn-primary">
    Send 
    </button>
    </form>
    </div>
    <div className="message">{message}</div>
    </div>
    );
  }
}

export default SendSighting;