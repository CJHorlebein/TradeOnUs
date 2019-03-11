import React, { Component } from 'react';
import axios from 'axios';
import * as css from './MarketCss'
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

class Market extends Component{
    constructor(props){
        super(props)
        let initialState = {
            alerts: [], // { msg: 'test message'}
            success: false
        }
        this.state = initialState;
    }
    addMoney(){
        axios.post('/api/money/10000')
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
                })
            })
    }
    render(){
        let { email, fname, lname, funds, history, watch, stocks } = this.props.state.user;
        if (!email) { return <Redirect to='/login' /> }
        return (
            <div style={css.box}>
                <h1>Market</h1>
                <button onClick={() => this.addMoney()}>MONEY</button>
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
)(withRouter(Market));