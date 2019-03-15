import React, { Component } from 'react';
import * as css from './GameChoiceCss.js'
import { connect } from 'react-redux';
import Scores from './Scores';
import axios from 'axios';

let pickFour = (values) => {
    let stocks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let gameStocks = [];
    console.log(values)
    for (let i = 0; i < 4; i++) {
        let pos = ~~(Math.random() * stocks.length);
        gameStocks.push({ stock: stocks[pos], value: values[pos] });
        stocks = [...stocks.slice(0, pos), ...stocks.slice(pos + 1)]
        values = [...values.slice(0, pos), ...values.slice(pos + 1)]
    }
    return gameStocks
}

class GameChoice extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        if(!this.props.symbol){
            axios.get('/api/companies')
                .then(res => this.props.updateSymbol(res.data.symbol))
        }
    }
    render(){
        return (
            <div>
                <div>Current stock needed to play is... {this.props.symbol}</div>
                <div style={css.content}>
                    <div>
                        <div style={css.gameSquare}>
                            <h4>Ups and Downs</h4>
                            <h5>1  to play</h5>
                            <button onClick={() => this.props.startGame(1, 1,)}>PLAY!</button>
                        </div>
                        <div style={css.gameSquare}>
                            <h4>Stock Predictions</h4>
                            <h5>8 stock to play</h5>
                            <button onClick={() => this.props.startGame(4, 4)}>PLAY!</button>
                        </div>
                    </div>
                    <div>
                        <div style={css.gameSquare}>
                            <h4>Best of Four</h4>
                            <h5>4 stock to play</h5>
                            <button onClick={() => this.props.startGame(2, 4, pickFour(this.props.values))}>PLAY!</button>
                        </div>
                        <div style={css.gameSquare}>
                            <h4>Worst of Four</h4>
                            <h5>4 stock to play</h5>
                            <button onClick={() => this.props.startGame(3, 8, pickFour(this.props.values))}>PLAY!</button>
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
}

let mapStateToProps = (state) => {
    return {
        values: state.results,
        symbol: state.game.symbol
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        startGame: (mode, bet, stocks) => dispatch({
            type: 'START_GAME', 
            payload: { mode, bet, stocks }
        }),
        updateSymbol: (symbol) => dispatch({type: 'UPDATE_SYMBOL', payload: symbol})
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameChoice)