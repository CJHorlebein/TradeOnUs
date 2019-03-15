import React from 'react';
import { connect } from 'react-redux';
import GameChoice from './GameChoice';

// Game Modes Routes
import BestFour from './Games/BestFour'
import WorstFour from './Games/WorstFour'
import Predictions from './Games/Predictions'
import UpsDowns from './Games/UpsDowns'



let MarketContainer = (props) => {
    let { game } = props;
    if(!game.started){
        return <GameChoice />
    }
    else if (game.mode === 1){ return <UpsDowns />}
    else if (game.mode === 2){ return <BestFour />}
    else if (game.mode === 3){ return <WorstFour />}
    else if (game.mode === 4){ return <Predictions />}
}


let mapStateToProps = (state) => {
    return {
        game: state.game
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => dispatch({ type: 'ADD_USER', payload: user})
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MarketContainer)