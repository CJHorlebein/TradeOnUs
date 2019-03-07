const initialState = {
    user: {}
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    if(type === 'ADD_USER'){
        return{
            user: payload
        }
    } else {
        return state;
    }
}

export default reducer;