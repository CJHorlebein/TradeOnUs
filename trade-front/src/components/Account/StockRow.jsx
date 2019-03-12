import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class StockRow extends Component{
    constructor(props) {
        super(props);
        let initialState = {
            alerts: [], // { msg: 'test message'}
            success: false
        }
        this.state = initialState;
    }
    sellStock(){
        let amount = document.getElementById(this.props.symbol).value;
        let url = `/api/sell/${this.props.symbol}/${amount}`;
        axios.post(url)
            .then(res => {
                this.props.updateUser(res.data)
                this.setState({
                    alerts: [{ msg: "Stock Purchased Successfully" }],
                    success: true
                });
            })
            .catch(err => {
                this.setState({
                    alerts: [{ ...err.response.data }],
                    success: false
                });
            })
    }
    render(){
        let { symbol, stock } = this.props
        return(
            <tr>
                <td>{symbol}</td>
                <td>{stock.companyName}</td>
                <td>{stock.quantity}</td>
                <td>{stock.price}</td>
                <td>
                    <input type='number' id={symbol} defaultValue='1'/>
                    <button onClick={() => this.sellStock()}>Sell</button>
                </td>
            </tr>
        )
    }
}

let mapStateToProps = (state) => {
    return {
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
)(StockRow);