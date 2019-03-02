const initialState = {
    user: {}
}

const reducer = (state = initialState, action) => {
    const { type } = action;
    if(type){
        return{
            ...state
        }
    } else {
        return state;
    }
}

export default reducer;