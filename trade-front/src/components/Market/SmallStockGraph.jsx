import React, { Component } from 'react';
import { connect } from 'react-redux';

let innerBox = {
    width: '15em',
    height: '15em',
    margin: '1em',
    backgroundColor: 'beige',
    minWidth: '15em'
}

let graph = {
    width: '100%'
}

class SmallStockGraph extends Component {
    constructor(props){
        super(props)
    }
    resolveGame(){
        console.log(this.props.card.high)
        let { mode, card } = this.props
        if(this.props.revealed){
            return null
        } else if (mode === 1 && card.high){
            this.props.winGame()
        } else if (mode === 2 && card.low){
            this.props.winGame()
        }
        
        this.props.updateGame();
    }
    render(){
        let card = this.props.card.stock;
        card += this.props.revealed ? 'F' : 'H'
        return <div style={innerBox}>
            <img style={graph} src={require(`./img/${card}.png`)} alt='A graph of the value over the year'/>
            <button onClick={() => this.resolveGame()}>Pick Me</button>
        </div>
    }
}

let mapStateToProps = (state) => {
    return {
        revealed: state.game.revealed,
        mode: state.game.mode
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        winGame: () => dispatch({type: 'WIN_GAME'}),
        updateGame: () => dispatch({type: 'UPDATE_GAME'}),
        addUser: (user) => dispatch({type: 'ADD_USER', payload: user})
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SmallStockGraph)