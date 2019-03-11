import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import FormAlert from './FormAlert';

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
        axios.post(`/api/buy/${sym}/${num}`)
            .then(res => {
                this.props.updateUser(res.data)
                console.log(res)
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
                        {...err.response.data}
                    ],
                    success: false
                })
            })
    }
    render(){
        let { symbol, latestPrice, companyName } = this.props.stock;
        return (
            <div>
                {symbol}
                {latestPrice}
                {companyName}
                <input type='number' id='quantity' defaultValue='2'/>
                <button onClick={() => this.buyStock()}>BUY</button>
                {this.state.alerts.map((alert, i) => <FormAlert success={this.state.success} msg={alert.msg} key = {i} />)}
            </div>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => dispatch({ type: 'UPDATE_USER', payload: user })
    }
}

let mapStateToProps = (state) => {
    return {
        state
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StockDetails);