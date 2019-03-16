import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as css from './StockGraphCss'
import axios from 'axios';

class StockGraph extends Component {
    resolveGame(){
        let { mode, card, bet, symbol } = this.props
        if(this.props.revealed){
            return null
        } else if ((mode === 1 && card.high) || (mode === 2 && card.low)){
            axios.post(`/stocks/update/${symbol}/${bet * 4}`)
                .then(res => this.props.updateUser(res.data))
            this.props.winGame()
        } else{
            axios.post(`/stocks/update/${symbol}/-${bet}`)
                .then(res => this.props.updateUser(res.data))
        }
        this.props.updateGame();
    }
    render(){
        let card = this.props.card.stock;
        card += this.props.revealed ? 'F' : 'H'
        return <div style={css.innerBox}>
            <img style={css.graph} src={require(`./img/${card}.png`)} alt='A graph of the value over the year'/>
            <button style={css.btns} onClick={() => this.resolveGame()}>Pick Me</button>
            <p>{this.props.revealed ? this.props.card.value + '%' : ''}</p>
        </div>
    }
}

let mapStateToProps = (state) => {
    return {
        bet: state.game.bet,
        symbol: state.game.symbol,
        revealed: state.game.revealed,
        mode: state.game.mode
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        winGame: () => dispatch({type: 'WIN_GAME'}),
        updateGame: () => dispatch({type: 'UPDATE_GAME'}),
        updateUser: (user) => dispatch({type: 'UPDATE_USER', payload: user})
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StockGraph)