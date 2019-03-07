import React from 'react';

let box = {
    backgroundColor: '#DC5E04',
    color: 'white',
    fontSize: '1.3rem',
    textAlign: 'center',
    borderRadius: '4px',
    width: '80%',
    margin: '.5em auto',
    padding: '.6em 0'
}

let FormAlert = ({success, error}) => {
    if(success){
        box.backgroundColor = '#229922'
        error = {
            msg: 'You have been registered, please login!'
        }
    }
    return (
        <div style={box}>
            <span>{error.msg}</span>
        </div>
    )
}
export default FormAlert;