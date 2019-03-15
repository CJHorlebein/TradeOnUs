const initialState = {
    user: {},
    game: {
        started: false,
        positions: [],
        mode: 0,
        bet: 0,
        symbol: ''
    },
    scores: [],
    results: [
        3.1,
        -3.3,
        -21.6,
        -3.8,
        -19.9,
        5.3,
        0,
        -26.9,
        4.4,
        8.9
    ]
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    if(type === 'UPDATE_USER'){
        return {
            ...state,
            user: payload
        }
    } else if(type === 'LOGOUT'){
        return {
            ...state,
            user: {}
        }
    } else if(type === 'START_GAME'){
        return {
            ...state,
            game: {
                ...state.game,
                started: true,
                positions: payload.stocks,
                mode: payload.mode,
                bet: payload.bet
            }
        }
    } else if(type === 'UPDATE_GAME'){
        return {
            ...state,
            game: {
                position: payload.positions
            }
        }
    } else if(type === 'UPDATE_SYMBOL'){
        return {
            ...state,
            game: {
                ...state.game,
                symbol: payload
            }
        }
    } else if(type === 'RESET_GAME'){
        return {
            ...state,
            game: {
                started: false,
                position: 0,
                mode: 0,
                bet: 0,
                symbol: ''
            }
        }
    } else if(type === 'UPDATE_SCORES'){
        return {
            ...state,
            scores: payload
        }
    } else {
        return state;
    }
}

export default reducer;