const initialState = {
    user: {},
    game: {
        started: false,
        revealed: false,
        outcome: false,
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
    } else if(type === 'UPDATE_SCORES'){
        return {
            ...state,
            scores: payload
        }
    } else if(type === 'UPDATE_SYMBOL'){
        return {
            ...state,
            game: {
                ...state.game,
                symbol: payload
            }
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
                ...state.game,
                revealed: true
            }
        }
    } else if(type === 'WIN_GAME'){
        return {
            ...state,
            game: {
                ...state.game,
                outcome: true
            }
        }
    } else if(type === 'RESET_GAME'){
        return {
            ...state,
            game: {
                started: false,
                revealed: false,
                outcome: false,
                positions: [],
                mode: 0,
                bet: 0,
                symbol: ''
            }
        }
    } else {
        return state;
    }
}

export default reducer;