import React from 'react';
import * as css from './RegisterFormCss'


let RegisterForm = () => (
    <div style={css.box}>
        <h1 style={css.header}><span>Register today!</span></h1>
        <h3 style={css.subHeader}><span>Make your money work for you!</span></h3>
        <form style={css.formField}>
            <div style={css.nameFields}>
                <input style={css.nameField} type='text' name='fname' placeholder='First Name' />
                <input style={css.nameField} type='text' name='lname' placeholder='Last Name' />
            </div>
            <input style={css.field} type='text' name='email' placeholder='Email' />
            <input style={css.field} type='password' name='password' placeholder='Password' />
            <input style={css.field} type='password' name='password2' placeholder='Confirm Password' />
            <button style={css.button} type='submit'>Submit</button>
        </form>
    </div>
)


export default RegisterForm;