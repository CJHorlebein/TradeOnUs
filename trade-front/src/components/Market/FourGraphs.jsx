import React from 'react';
import { connect } from 'react-redux';
import * as css from './FourGraphsCss';
import FormAlert from './FormAlert';
import StockGraph from './StockGraph';

let FourGraphs = ({ positions, revealed, outcome, mode }) => {
    let msg = outcome ? 'You Win!!!' : 'You Loose!!!';
    return (
        <div>
            <h1>{mode === 1 ? 'Best': 'Worst'} out of Four</h1>
            {revealed ? <FormAlert success={outcome} msg={msg} /> : ''}
            <div style = {css.box}>
                {positions.map((stock, i) => <StockGraph card={stock} key={i} />)}
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        mode: state.game.mode,
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
)(FourGraphs)