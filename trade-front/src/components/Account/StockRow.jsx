import React from 'react';


let StockRow = ({ symbol, stock }) => (
    <tr>
        <td>{symbol}</td>
        <td>{stock.companyName}</td>
        <td>{stock.quantity}</td>
        <td>{stock.price}</td>
        <td>
            <input type='number' />
            <button>Sell</button>
        </td>
    </tr>
)

export default StockRow