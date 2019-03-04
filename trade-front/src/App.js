import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom'

// Routes
import Header from './components/Header'
import Stocks from './components/Stocks'
import Account from './components/Account'
import Funds from './components/Funds'
import Login from './components/Login'
import Home from './components/Home'
import Footer from './components/Footer'

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
          <Route path="/funds" component={Funds} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
