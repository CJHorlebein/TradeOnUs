import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  componentDidMount(){
    axios.get('/api/').then(response =>{
      console.log(response);
    })
  }
  render() {
    return (
      <div>
        Hey 

      </div>
    );
  }
}

export default App;
