import React from 'react';
import * as css from './StocksCss'
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

let Stocks = (props) => {
    let { email, fname, lname, funds, history, watch, stocks } = props.state.user;
    if (!email) { return <Redirect to='/login' /> }
    return (
        <div style={css.box}>
            <h1>STOCKS</h1>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        state
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => dispatch({ type: 'ADD_USER', payload: user })
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Stocks));