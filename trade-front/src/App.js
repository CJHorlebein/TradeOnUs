import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom'

// Routes
import Header from './components/Header'
import Stocks from './components/Stocks'
import Account from './components/Account'
import Game from './components/Game'
import Footer from './components/Footer'
import Home from './components/Home'

class App extends Component {
  componentDidMount(){
    axios.get('/api/').then(response =>{
      console.log(response);
    })
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/stocks" component={Stocks} />
          <Route path="/account" component={Account} />
          <Route path="/game" component={Game} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
