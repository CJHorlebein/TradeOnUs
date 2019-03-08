import React from 'react';
import * as css from './AccountCss';
import { connect } from 'react-redux'


let Account = (props) => {
    console.log(props)
    return (
        <div style={css.box}>
            <div style={css.header}>Account Info</div>
            <hr />
            <div>

            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        user: state.user
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
)(Account);