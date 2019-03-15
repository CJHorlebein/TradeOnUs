import React, { Component } from 'react';
import axios from 'axios';
import * as css from './MarketCss'
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import MarketContainer from './MarketContainer'

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
        let { email } = this.props.state.user;
        if (email) { return <Redirect to='/login' /> }
        return (
            <div style={css.box}>
                <div style={css.header}>Play the Market</div>
                <div style={css.buttons}>
                    <button style={css.button} onClick={() => this.addMoney()}>MONEY</button>
                    <button style={css.button} onClick={() => this.props.resetGame()}>RESET</button>
                </div>
                <MarketContainer />
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
        updateUser: (user) => dispatch({ type: 'UPDATE_USER', payload: user }),
        resetGame: () => dispatch({ type: 'RESET_GAME'})
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Market));