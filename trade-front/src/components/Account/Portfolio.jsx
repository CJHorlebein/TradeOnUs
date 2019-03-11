import React from 'react';
import StockRow from './StockRow';
import * as css from './StockRowCss';


let Portfolio = ({funds, stocks}) => {
    let stockList = Array.from(Object.keys(stocks));
    return (
        <table style={css.table}>
            <thead>
                <tr style={css.tHeaders}>
                    <th style={css.tCol}>Symbol</th>
                    <th style={css.tCol}>Company Name</th>
                    <th style={css.tCol}>Quantity</th>
                    <th style={css.tCol}>Cost</th>
                    <th style={css.tCol}>Total</th>
                    <th style={css.tCol}>Total</th>
                </tr>
            </thead>
            <tbody>
                {stockList.map((stock, i) => <StockRow key={i} symbol={stock} stock={stocks[stock]}/>)}
                <tr style={css.tHeaders}>
                    <th colSpan="4">Funds</th>
                    <td>{funds}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Portfolio;