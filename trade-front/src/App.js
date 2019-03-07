import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom'

// Routes
import Header from './components/Header'
import Stocks from './components/Stocks/Stocks'
import Account from './components/Account/Account'
import Market from './components/Market/Market'
import Login from './components/Login/Login'
import Home from './components/Home'
import Footer from './components/Footer'

class App extends Component {
  componentDidMount(){
    axios.get('/api/').then(response =>{
      // console.log(response);
    })
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/market" component={Market} />
          <Route path="/account" component={Account} />
          <Route path="/stock" component={Stocks} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
