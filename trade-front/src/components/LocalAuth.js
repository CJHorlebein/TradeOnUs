import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

let LocalAuth = (props) => {
    if (props.state.user.email === undefined) {
        return <Redirect to='/login' />
    }
    return ''
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
)(withRouter(LocalAuth));