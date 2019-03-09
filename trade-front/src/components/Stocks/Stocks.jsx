import React, { Component } from 'react';
import * as css from './StocksCss'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import StockDetails from './StockDetails'

class Stocks extends Component{
    constructor(props){
        super(props);
        let initialState = {
            results: []
        }
        this.state = initialState
    }
    searchStock(e){
        e.preventDefault();
        let ref = document.getElementById('ref').value;
        let url = `https://api.iextrading.com/1.0/stock/${ref}/quote?filter=symbol,companyName,latestPrice`
        axios.get(url).then(res => {
            this.setState({
                results: [{...res.data}]
            })
        })  
    }
    sellStock(){
        // https://iextrading.com/developer/docs/#support
        // https://api.iextrading.com/1.0

    }
    render(){
        let { email, funds} = this.props.state.user;
        // if (email) { return <Redirect to='/login' /> }

        funds = 10000;
        let stocks = [
            {
                price: 200,
                quantity: 200,
                name: 'Tesla',
                ticker: 'TSLA'
            }
        ];
        return (
            <div style={css.box}>
                <h1>Buy Stocks {funds} </h1>
                <form onSubmit={(e) => this.searchStock(e)}>
                    <input type='text' id='ref'/>
                    <button type='submit'>Search</button>
                </form>
                {this.state.results.map((stock, i) => <StockDetails stock={stock} key={i}/>)}
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(
    mapStateToProps
)(Stocks);