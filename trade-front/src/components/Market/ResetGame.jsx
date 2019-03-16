import React from 'react';
import { connect } from 'react-redux';

let btn = {
    backgroundColor: '#14232D',
    color: '#FFC600',
    fontWeight: '700',
    borderRadius: '8px',
    padding: '.8em 1.5em',
    marginBottom: '.2em',
    border: '0',
    fontSize: '1.2rem'
}

let ResetGame = (props) => {
    if(props.show){
        return (
            <div>
                <button style={btn} onClick={() => props.resetGame()}>Play Again?</button>
            </div>
        )
    }
    return ""
}

let mapStateToProps = (state) => {
    return {
        show: state.game.revealed,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        resetGame: () => dispatch({ type: 'RESET_GAME' })
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetGame);