import React from 'react';

let container = {
    width: '50%',
    textAlign: 'center',
    margin: '3em auto'
}

let LoginLogo = () => {
    if(window.innerWidth > 1200){
        return (
            <div style={container}>
                <div style={{fontSize:'2em'}}>Learn how to trade like the professionals!</div>
                <img style={{width: '20em'}} src={require('./img/dollar.svg')} alt="TradeOn logo" />
            </div>
        )
    } else {
        return null
    }
}


export default LoginLogo;