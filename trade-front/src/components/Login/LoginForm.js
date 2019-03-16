import React, { Component} from 'react';
import { connect } from 'react-redux';
import * as css from './LoginFormCss';
import FormAlert from './FormAlert';
import axios from 'axios';


class LoginForm extends Component{
    constructor(props){
        super(props);
        let initialState = {
            alerts: [
                // {msg: ''}
            ],
            success: false
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
                this.props.updateUser(res.data)
                this.setState({
                    alerts: [{msg: 'You are now logged in'}],
                    success: true
                })
            })
            .catch(err => {
                this.setState({
                    alerts: [{msg: 'Something went wrong!'}],
                    success: false
                })
            })
    }
    render(){
        return (
            <div style={css.box}>
                {this.state.alerts.map((alert, i) => <FormAlert success={this.state.success} msg={alert.msg} key={i} />)}
                <div style={css.header}><em>Please sign in to continue...</em></div>
                <form onSubmit={(e) => this.loginUser(e)} style={css.formField}>
                    <input style={css.field} type='text' id='email' placeholder='Email'/>
                    <input style={css.field} type='Password' id='password' placeholder='password'/>
                    <button style={css.button} type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        scores: state.scores
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => dispatch({  type: 'UPDATE_USER', payload: user })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);