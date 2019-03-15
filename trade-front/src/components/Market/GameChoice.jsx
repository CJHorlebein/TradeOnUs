import React from 'react';
import * as css from './GameChoiceCss.js'
import { connect } from 'react-redux';
import Scores from './Scores';

let GameChoice = (props) => {
    return (
        <div>
            <div>Current stock needed to play is... FB</div>
            <div style={css.content}>
                <div>
                    <div style={css.gameSquare}>
                        <h4>Ups and Downs</h4>
                        <h5>1 Stock to play</h5>
                        <button onClick={() => props.startGame(1, 1)}>PLAY!</button>
                    </div>
                    <div style={css.gameSquare}>
                        <h4>Stock Predictions</h4>
                        <h5>8 stock to play</h5>
                        <button onClick={() => props.startGame(4, 4)}>PLAY!</button>
                    </div>
                </div>
                <div>
                    <div style={css.gameSquare}>
                        <h4>Best of Four</h4>
                        <h5>4 stock to play</h5>
                        <button onClick={() => props.startGame(2, 4)}>PLAY!</button>
                    </div>
                    <div style={css.gameSquare}>
                        <h4>Worst of Four</h4>
                        <h5>4 stock to play</h5>
                        <button onClick={() => props.startGame(3, 8)}>PLAY!</button>
                    </div>
                </div>
                <div style={css.scores}>
                    <h3>Highest Earning Players</h3>
                    <Scores />
                </div>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        state
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        startGame: (mode, bet) => dispatch({
            type: 'START_GAME', 
            payload: { mode, bet }
        })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameChoice)