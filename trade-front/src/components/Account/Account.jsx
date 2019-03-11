import React from 'react';
import * as css from './AccountCss';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import Portfolio from './Portfolio'


let Account = (props) => {
    let { email, fname, lname, funds, stocks } = props.state.user;
    if (!email) { return <Redirect to='/login' /> }

    return (
        <div style={css.box}>
            <div style={css.header}>Account Info</div>
            <div style={css.innerBox}>
                <div style={css.subHeader}>
                    <div>{fname} {lname}</div>
                    <div>{email}</div>
                </div>
                <hr />
                <Portfolio stocks={stocks} funds={funds}/>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        state
    }
}


export default connect(
    mapStateToProps,
    null
)(withRouter(Account));