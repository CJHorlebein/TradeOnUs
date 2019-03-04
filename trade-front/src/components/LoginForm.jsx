import React, { Component} from 'react';
import * as css from './LoginFormCss';


class LoginForm extends Component{
    render(){
        return (
            <div style={css.box}>
                <div style={css.header}><em>Please sign in to continue...</em></div>
                <form style={css.formField}>
                    <input style={css.field} type='text' name='email' placeholder='Email' />
                    <input style={css.field} type='Password' name='password' placeholder='password' />
                    <button style={css.button} type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}



export default LoginForm;