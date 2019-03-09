import React from 'react';
import * as css from './MarketCss'
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

let Market = (props) => {
    // let { email, fname, lname, funds, history, watch, stocks } = props.state.user;
    // if (email) { return <Redirect to='/login' /> }

    // email = 'aaaa@aa.aa';
    // fname = 'Aaaaaa';
    // lname = 'Aaaaaa';
    // funds = 10000;
    // stocks = [
    //     {
    //         price: 200,
    //         quantity: 200,
    //         name: 'Tesla',
    //         ticker: 'TSLA'
    //     },
    //     {
    //         price: 200,
    //         quantity: 200,
    //         name: 'Tesla',
    //         ticker: 'TSLA'
    //     }
    // ];

    return (
        <div style={css.box}>
            <h1>Market</h1>
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
        updateUser: (user) => dispatch({ type: 'UPDATE_USER', payload: user })
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Market));