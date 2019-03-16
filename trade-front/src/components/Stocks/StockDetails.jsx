import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import FormAlert from './FormAlert';
import * as css from './StockDetailsCss';

class StockDetails extends Component {
    constructor(props){
        super(props);
        let initialState = {
            alerts: [
                // { msg: 'test message'}
            ],
            success: false
        }
        this.state = initialState;
    }
    buyStock() {
        let num = document.getElementById('quantity').value;
        let sym = this.props.stock.symbol
        axios.post(`/stocks/buy/${sym}/${num}`)
            .then(res => {
                this.props.updateUser(res.data)
                this.setState({
                    alerts: [
                        { msg: "Stock Purchased Successfully"}
                    ],
                    success: true
                })
            })
            .catch(err => {
                this.setState({
                    alerts:[
                        ...err.response.data
                    ],
                    success: false
                })
            })
    }
    render(){
        let { latestPrice, companyName } = this.props.stock;
        return (
            <div style={css.box}>
                <h2>{companyName}</h2>
                <div>Price per share: <span style={css.price}>{latestPrice}</span></div>
                <div>
                    <input style={css.searchField} type='number' id='quantity' placeholder="shares"/>
                    <button style={css.searchBtn} onClick={() => this.buyStock()}>BUY</button>
                </div>
                {this.state.alerts.map((alert, i) => <FormAlert success={this.state.success} msg={alert.msg} key = {i} />)}
            </div>
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
)(StockDetails);