import React, { Component } from 'react';
import * as css from './MarketCss'
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import MarketContainer from './MarketContainer'
import ResetGame from './ResetGame'

class Market extends Component{
    constructor(props){
        super(props)
        let initialState = {
            alerts: [], // { msg: 'test message'}
            success: false
        }
        this.state = initialState;
    }
    render(){
        let { email } = this.props.state.user;
        if (!email) { return <Redirect to='/login' /> }
        return (
            <div style={css.box}>
                <div style={css.header}>Play the Market</div>
                <ResetGame />
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