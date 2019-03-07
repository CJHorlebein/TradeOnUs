import React, { Component } from 'react';
import * as css from './LoginCss'
import LoginLogo from './LoginLogo'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

class Login extends Component{
    constructor(props){
        super(props);
        let initialState = {
            login: false
        };
        this.state = initialState;
    }
    changeForm(type){
        this.setState({
            login: type
        })
    }
    render(){
        let sizeStyle = window.innerWidth > 1200 ? css.container : css.nothing
        return (
            <div style={css.box}>
                <div style={css.mainContainer}>
                    <LoginLogo />
                    <div style={sizeStyle}>
                        <div style={css.buttons}>
                            <button style={this.state.login ? css.signTrue : css.signBtn} onClick={() => this.changeForm(true)}>Sign In</button>
                            <button style={!this.state.login ? css.regisTrue : css.regisBtn} onClick={() => this.changeForm(false)}>Register</button>
                        </div>
                        {this.state.login ? <LoginForm /> : <RegisterForm />}
                    </div>
                </div>
            </div>
        )
    }
}



export default Login;