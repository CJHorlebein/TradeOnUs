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
        // https://api.iextrading.com/1.0/stock/aapl/quote?filter=symbol,companyName,latestPrice
        let url = `https://api.iextrading.com/1.0/stock/${ref}/quote?filter=symbol,companyName,latestPrice`
        axios.get(url).then(res => {
            this.setState({
                results: [{...res.data}]
            })
        })  
    }
    render(){
        let { email, funds} = this.props.state.user;
        if (!email) { return <Redirect to='/login' /> }
        return (
            <div style={css.box}>
                <div style={css.header}>Buy Stocks</div>
                <div style={css.subHeader}>
                    <h2 >Current Funds: {funds}</h2>
                    {this.props.symbol ? <h2>Current Stock: {this.props.symbol}</h2> : ''}
                </div>
                <form onSubmit={(e) => this.searchStock(e)}>
                    <input style={css.searchField} type='text' id='ref'/>
                    <button style={css.searchBtn} type='submit'>Search</button>
                </form>
                {this.state.results.map((stock, i) => <StockDetails stock={stock} key={i}/>)}
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        symbol: state.game.symbol,
        state
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => dispatch({ type: 'UPDATE_USER', payload: user })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Stocks);