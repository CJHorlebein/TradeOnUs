import React from 'react';
import * as css from './AccountCss';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';


let Account = (props) => {
    let { email, fname, lname, funds, history, watch, stocks } = props.state.user;

    email = 'aaaaaa'
    fname = 'aaaaaa'
    lname = 'aaaaaa'
    funds = 'aaaaaa'
    history = []
    watch = []


    if (!email) { return <Redirect to='/login' /> }
    return (
        <div style={css.box}>
            <div style={css.header}>Account Info</div>
            <hr />
            <div>
                <div>email: {email}</div>
                <div>fname: {fname}</div>
                <div>lname: {lname}</div>
                <div>funds: {funds}</div>
                <div>history: {history}</div>
                <div>watchlist: {watch}</div>
                <div>stocks: {stocks}</div>
            </div>
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
)(withRouter(Account));