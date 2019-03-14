const initialState = {
    user: {},
    game: {
        started: false,
        position: 0,
        type: '',
        odds: 0,
        bet: 0,
        symbol: ''
    },
    scores: []
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
                started: true,
                ...payload
            }
        }
    } else if(type === 'UPDATE_GAME'){
        return {
            ...state,
            game: {
                position: payload.position
            }
        }
    } else if(type === 'END_GAME'){
        return {
            ...state,
            game: {
                started: false,
                type: '',
                odds: 0,
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