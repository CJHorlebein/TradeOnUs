import React from 'react';
import { connect } from 'react-redux';
import * as css from './BestFourCss';
import StockBox from './StockBox';

let BestFour = ({ stocks }) => {
    console.log(stocks)
    return (
        <div>
            <h1>Best out of Four</h1>
            <div style={css.box}>
                {stocks.map((stock, i) => <StockBox card={stock} key={i} />)}
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        stocks : state.game.positions
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => dispatch({type: 'ADD_USER', payload: user})
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BestFour)