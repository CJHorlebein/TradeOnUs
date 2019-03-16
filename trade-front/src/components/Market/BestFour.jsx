import React from 'react';
import { connect } from 'react-redux';
import * as css from './BestFourCss';
import FormAlert from './FormAlert';
import SmallStockGraph from './SmallStockGraph';

let BestFour = ({ positions, revealed, outcome }) => {
    let msg = outcome ? 'You Win!!!' : 'You Loose!!!';
    return (
        <div>
            <h1>Best out of Four</h1>
            {revealed ? <FormAlert success={outcome} msg={msg} /> : ''}
            <div style={css.box}>
                {positions.map((stock, i) => <SmallStockGraph card={stock} key={i} />)}
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        outcome: state.game.outcome,
        revealed: state.game.revealed,
        positions: state.game.positions,

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