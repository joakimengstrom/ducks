import React from 'react';


class SendSighting extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      species: this.props.species[0],
      description: '',
      quantity: '',
      dateTime: '',
      submitSuccess: false
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      submitSuccess: false
    });
    console.log(value);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var dateTime = this.state.dateTime;
    if (dateTime.length === 19) {
      dateTime += 'Z';
    }
    else {
      dateTime += ':00Z';
    }
    var name = this.state.species.toLowerCase();
    var number = Number(this.state.quantity);
    fetch('https://secret-everglades-42646.herokuapp.com/sightings', {
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
  alert(responseText);
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
  }

  render() {
    var message = null;
    if(this.state.submitSuccess){
      message = "Your sighting was succesfully saved!";
    }
     
    return (
      <div>
      <div class="b">
      <h2>Add sighting</h2>
      <form onSubmit={this.handleSubmit}>
      <div  class="form-group">
      <label>
      Species:
      <select value={this.state.species} onChange={this.handleChange} name="species" required class="form-control">
        {this.props.species.map((x, index) => <option key={index}  class="species-text">{x}</option>)}
      </select>
    </label>
    </div>
      <div class="form-group">
      <label>
      Description:
      <textarea 
      required
      name="description"
      value={this.state.description}
      onChange={this.handleChange}
      class="form-control" />
    </label>
    </div>
    <div class="form-group">
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
      class="form-control" />
    </label>
    </div>
    <div class="form-group">
    <label>
      Time of sighting:
      <input
        required 
        name="dateTime"
        type="datetime-local"
        step="1"
      value={this.state.dateTime}
      onChange={this.handleChange}
      class="form-control" />
    </label>
    </div>
    <button type="submit" class="btn btn-primary">
    Send 
    </button>
    </form>
    </div>
    <div class="message">{message}</div>
    </div>
    );
  }
}

export default SendSighting;