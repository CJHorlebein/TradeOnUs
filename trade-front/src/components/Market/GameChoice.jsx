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
        }
    }
    pickStocks(){
        let stocks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let gameStocks = [];
        let { values } = this.props
        for (let i = 0; i < 4; i++) {
            let pos = ~~(Math.random() * stocks.length);
            gameStocks.push({ stock: stocks[pos], value: values[pos], low: false, high: false });
            stocks = [...stocks.slice(0, pos), ...stocks.slice(pos + 1)]
            values = [...values.slice(0, pos), ...values.slice(pos + 1)]
        }
        return gameStocks
    }
    playGame(mode, bet){
        let { symbol, stocks } = this.props
        let low = {pos: -1, value: 100}
        let high = {pos: -1, value: -100}
        let stocksList = this.pickStocks(4);
        stocksList.forEach((stock, i) => {
            if(stock.value < low.value){low.pos = i; low.value = stock.value}
            if(stock.value > high.value){high.pos = i; high.value = stock.value}
        })
        stocksList[low.pos].low = true
        stocksList[high.pos].high = true
        if( stocks && stocks[symbol] && stocks[symbol].quantity >= bet){
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
                <h3>Current stock needed to play is... <span style={css.selected}>{this.props.symbol}</span></h3>
                <div style={css.alerts}>
                    {this.state.alerts.map((alert, i) => <FormAlert success={false} msg={alert.msg} key={i}/>)}
                </div>
                <div style={css.content}>
                    <div>
                        <div style={css.gameSquare}>
                            <h2>Best of Four</h2>
                            <h4>1 stock to play</h4>
                            <button style={css.btns} onClick={() => this.playGame(1, 1)}>PLAY!</button>
                            <p style={css.description}>Predict which stock will perform the Best</p>
                        </div>
                        <div style={css.gameSquare}>
                            <h2>Worst of Four</h2>
                            <h4>1 stock to play</h4>
                            <button style={css.btns} onClick={() => this.playGame(2, 1)}>PLAY!</button>
                            <p style={css.description}>Predict which stock will perform the Worst</p>
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