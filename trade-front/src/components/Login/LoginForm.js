import React, { Component} from 'react';
import { connect } from 'react-redux';
import * as css from './LoginFormCss';
import FormAlert from './FormAlert';
import axios from 'axios';


class LoginForm extends Component{
    constructor(props){
        super(props);
        let initialState = {
            msg: ''
        }
        this.state = initialState;
    }
    loginUser(e){
        e.preventDefault();
        let user = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }
        axios.post('/users/login', user )
            .then(res => {
                this.props.addUser(res.data)
                this.setState({
                    msg: 'You are now logged in'
                })
            })
    }
    render(){
        return (
            <div style={css.box}>
                {this.state.msg !== '' ? <FormAlert success={true} msg={this.state.msg}/> : ''}
                <div style={css.header}><em>Please sign in to continue...</em></div>
                <form onSubmit={(e) => this.loginUser(e)} style={css.formField}>
                    <input style={css.field} type='text' id='email' placeholder='Email' />
                    <input style={css.field} type='Password' id='password' placeholder='password' />
                    <button style={css.button} type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        addUser: state.addUser
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => dispatch({  type: 'ADD_USER', payload: user })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);