const initialState = {
    user: {}
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    if(type === 'ADD_USER'){
        return{
            user: payload
        }
    } else if(type === 'LOGOUT'){
        console.log('logged off')
        return {
            user: {}
        }
    } else {
        return state;
    }
}

export default reducer;