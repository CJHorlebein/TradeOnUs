import React, { Component } from 'react';
import axios from 'axios';
import FormAlert from './FormAlert'

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
        // https://iextrading.com/developer/docs/#support
        
        let num = document.getElementById('quantity').value;
        let sym = this.props.stock.symbol
        console.log('axios called')
        axios.post(`/api/buy/${sym}/${num}`)
            .then(res => {
                console.log("hey")
                this.setState({
                    alerts: [
                        { ...res.data, success: true }
                    ]
                })
            })
            .catch(err => {
                console.log('err')
                this.setState({
                    alerts:[
                        {...err.response.data, success:false}
                    ]
                })
            })
    }
    render(){
        console.log(this.props.stock);
        console.log(this.props);
        console.log(this.state);
        let { symbol, latestPrice, companyName } = this.props.stock
        return (
            <div>
                {symbol}
                {latestPrice}
                {companyName}
                <input type='number' id='quantity'/>
                <button onClick={() => this.buyStock()}>BUY</button>
                {this.state.alerts.map((alert, i) => <FormAlert success= { alert.success } msg = { alert.msg } key = { i } />)}
            </div>
        )
    }
}


export default StockDetails;