import React from 'react';
import { connect } from 'react-redux';
import GameChoice from './GameChoice';

// Game Modes Routes
import FourGraphs from './FourGraphs';


let MarketContainer = (props) => {
    let { game } = props;
    if(!game.started){
        return <GameChoice />
    } else {
        return <FourGraphs />
    }
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