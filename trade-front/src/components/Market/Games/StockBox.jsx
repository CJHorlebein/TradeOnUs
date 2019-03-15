import React from 'react';


let innerBox = {
    width: '15em',
    height: '15em',
    margin: '1em',
    backgroundColor: 'beige',
    minWidth: '15em'
}

let graph = {
    width: '100%'
}
let StockBox = ({card}) => {
    return <div style={innerBox}>
        <img style={graph} src={require(`./img/${card.stock}H.png`)}/>
        <button>Pick Me</button>
    </div>
}

export default StockBox