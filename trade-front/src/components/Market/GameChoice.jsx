import React, { Component } from 'react';
import * as css from './GameChoiceCss.js'
import { connect } from 'react-redux';
import Scores from './Scores';
import FormAlert from './FormAlert'
import axios from 'axios';

class GameChoice extends Component{
    constructor(props){
        super(props)
        let initialState = {
            alerts: [
                // {msg: 'ALERT'}
            ]
        }
        this.state = initialState;
    }
    componentDidMount(){
        if(!this.props.symbol){
            axios.get('/api/companies')
                .then(res => this.props.updateSymbol(res.data.symbol))
                // .then(res => this.props.updateSymbol('FB'))
        }
    }
    pickStocks(len){
        let stocks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let gameStocks = [];
        let { values } = this.props
        for (let i = 0; i < len; i++) {
            let pos = ~~(Math.random() * stocks.length);
            gameStocks.push({ stock: stocks[pos], value: values[pos] });
            stocks = [...stocks.slice(0, pos), ...stocks.slice(pos + 1)]
            values = [...values.slice(0, pos), ...values.slice(pos + 1)]
        }
        return gameStocks
    }
    playGame(mode, bet){
        let { symbol, stocks } = this.props
        let stocksList = mode > 2 ? this.pickStocks(4) : this.pickStocks(1);
        // this.props.startGame(mode, bet, stocksList)
        if( stocks[symbol] && stocks[symbol].quantity > bet){
            this.props.startGame(mode, bet, stocksList)
        } else {
            this.setState({
                alerts: [
                    {msg: `You need more shares of ${symbol} to play`}
                ]
            })
        }
    }
    render(){
        return (
            <div>
                <div>Current stock needed to play is... {this.props.symbol}</div>
                <div style={css.alerts}>
                    {this.state.alerts.map((alert, i) => <FormAlert success={false} msg={alert.msg} key={i}/>)}
                </div>
                <div style={css.content}>
                    <div>
                        <div style={css.gameSquare}>
                            <h4>Ups and Downs</h4>
                            <h5>1 to play</h5>
                            <button onClick={() => this.playGame(1, 1)}>PLAY!</button>
                        </div>
                        <div style={css.gameSquare}>
                            <h4>Stock Predictions</h4>
                            <h5>8 stock to play</h5>
                            <button onClick={() => this.playGame(2,8)}>PLAY!</button>
                        </div>
                    </div>
                    <div>
                        <div style={css.gameSquare}>
                            <h4>Best of Four</h4>
                            <h5>4 stock to play</h5>
                            <button onClick={() => this.playGame(3, 4)}>PLAY!</button>
                        </div>
                        <div style={css.gameSquare}>
                            <h4>Worst of Four</h4>
                            <h5>4 stock to play</h5>
                            <button onClick={() => this.playGame(4, 4)}>PLAY!</button>
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
        symbol: state.game.symbol,
        stocks: state.user.stocks
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