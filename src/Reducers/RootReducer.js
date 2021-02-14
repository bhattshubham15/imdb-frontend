
const RootReducer = (state = {}, action) => {
    switch (action) {
        case action.type === 'LIST_GENRES':
            console.log('ddd');
            return state;
            break;

        default: return state;
    }
}

export default RootReducer;
