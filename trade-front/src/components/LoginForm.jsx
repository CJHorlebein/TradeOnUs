import React, { Component} from 'react';
import * as css from './LoginFormCss';


class LoginForm extends Component{
    render(){
        return (
            <div style={css.box}>
                <span style={css.header}><em>Please sign in to continue...</em></span>
                <form>
                    <div style={css.formBlock}>
                        <label htmlFor='email'>Email</label>
                        <input name='email' type='text'/>
                    </div>
                    <div style={css.formBlock}>
                        <label htmlFor='password'>Password</label>
                        <input name='password' type='password'/>
                    </div>
                    <button>Sign In</button>
                </form>
            </div>
        )
    }
}



export default LoginForm;