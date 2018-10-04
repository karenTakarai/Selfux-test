import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      items: [],
      total: 0,
    }
    this.searchfor="";
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.searchfor = this.searchfor + event.target.value;
    this.setState({value: this.searchfor});
  }

  handleSubmit(event) {
    let url = 'https://api.github.com/search/repositories?q=';
      if(this.state.value!=undefined){
        axios.get(url+this.state.value)
        .then(res =>
          this.setState({items: res.data.items, total: res.data.total_count})
        ).catch(err =>
            alert(err)
        );
        event.preventDefault();
    }else{
      alert="escribe algo para comenzar a buscar";
    }
  }


  render() {
    let itemsDOM = this.state.items.map(x =>
      <li key={x.id}>
        {x.full_name}
      </li>
    );
    return (
      <div className="App">
        <div className='form'>
          <input
            value={this.state.input}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleSubmit}>
            Search
          </button>
        </div>
        <div className='results'>
          <h5>Total: {this.state.total}</h5>
          <ul>
            {itemsDOM}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
