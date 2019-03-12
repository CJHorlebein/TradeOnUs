import React from 'react';
import { connect } from 'react-redux';
import StockList from './StockList';
import * as css from './StockRowCss';


let Portfolio = ({ funds }) => {
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
            <StockList />
            <tbody>
                <tr style={css.tHeaders}>
                    <th colSpan="4">Funds</th>
                    <td>{funds}</td>
                </tr>
            </tbody>
        </table>
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
)(Portfolio);