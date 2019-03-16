import React, { Component } from 'react';
import * as css from './RegisterFormCss';
import axios from 'axios';
import FormAlert from './FormAlert';

class RegisterForm extends Component {
    constructor(props){
        super(props);
        let initialState = {
            errors: [
                // {msg: "Please fill in all fields"}
            ],
            success: false
        };
        this.state = initialState;
    }
    submitForm(e){
        e.preventDefault();
        let fields = ['fname', 'lname', 'email', 'password', 'password2']
        let user = {}
        fields.forEach( field => {
            user[field] = document.getElementById(field).value;
            if(user[field] === ''){ user[field] = undefined };
        })
        axios.post('/users/register', user).then(res => {
            this.setState({
                errors: [],
                success: true
            })
        }).catch(err => {
            this.setState({
                errors: [...err.response.data]
            });
        });
    }
    render (){
        return (
            <div style={css.box}>
                {this.state.errors.map((error, i) => <FormAlert success={this.state.success} msg={error} key={i}/>)}
                {this.state.success ? <FormAlert success={true} msg={'You have been registered, please login!'} /> : ''}
                <h1 style={css.header}><span>Register today!</span></h1>
                <h3 style={css.subHeader}><span>Make your money work for you!</span></h3>
                <form onSubmit={(e) => this.submitForm(e)} style={css.formField}>
                    <div style={css.nameFields}>
                        <input style={css.nameField} type='text' id='fname' placeholder='First Name'/>
                        <input style={css.nameField} type='text' id='lname' placeholder='Last Name'/>
                    </div>
                    <input style={css.field} type='text' id='email' placeholder='Email'/>
                    <input style={css.field} type='password' id='password' placeholder='Password'/>
                    <input style={css.field} type='password' id='password2' placeholder='Confirm Password'/>
                    <button style={css.button} type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}



export default RegisterForm;