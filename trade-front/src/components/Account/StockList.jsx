import React from 'react';
import { connect } from 'react-redux';
import StockRow from './StockRow';
import * as css from './StockRowCss';


let StockList = (props) => {
    let { stocks } = props.state.user
    let stockList = stocks ? Array.from(Object.keys(stocks)) : [];
    console.log(stockList);
    return (
        <tbody>
            {stockList.map((stock, i) => <StockRow key={i} symbol={stock} stock={stocks[stock]} />)}
        </tbody>
    )
}

let mapStateToProps = (state) => {
    return {
        state
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => dispatch({ type: 'UPDATE_USER', payload: user })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StockList);