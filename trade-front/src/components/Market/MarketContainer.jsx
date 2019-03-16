import React from 'react';
import { connect } from 'react-redux';
import GameChoice from './GameChoice';

// Game Modes Routes
import BestFour from './BestFour'
import WorstFour from './WorstFour'



let MarketContainer = (props) => {
    let { game } = props;
    if(!game.started){
        return <GameChoice />
    }
    else if (game.mode === 1){ return <BestFour />}
    else if (game.mode === 2){ return <WorstFour />}
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