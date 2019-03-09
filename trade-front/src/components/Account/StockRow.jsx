import React from 'react';


let StockRow = ({ stock }) => (
    <tr>
        <td>{stock.ticker}</td>
        <td>{stock.name}</td>
        <td>{stock.quantity}</td>
        <td>{stock.price}</td>
        <td>100</td>
    </tr>
)

export default StockRow