import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

let btn = {
    textDecoration: 'none',
    padding: '.3em 1em',
    borderRadius: '1.2em',
    fontSize: '1.5rem',
    backgroundColor: '#FFC600',
    color: '#15232D'
}

let name = {
    marginRight: '1em',
    fontSize: '1.5rem',
    color: '#ffffff'
}

class LogBtn extends Component{
    constructor(props){
        super(props);
    }
    logoutUser(){
        axios.get('/users/logout').then(e => this.props.logout())
    }
    render(){
        console.log(this.props);
        let {fname, email } = this.props.state.user;
        if (email === undefined) return <NavLink style={btn} to="/login">Login</NavLink>
        return (
            <div>
                <span style={name}>{fname}</span>
                <NavLink style={btn} onClick={() => this.logoutUser()} to="/login">Logout</NavLink>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        logout: state.logout,
        state
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch({ type: 'LOGOUT' })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogBtn);