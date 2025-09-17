const initialState = {
    search: "",
    search_results: [],
    load_more: true,
}

export default function counterReducer(state = initialState, action) {
    switch (action.type){
        case 'CHANGE_SEARCH':
            return {
                ... state,
                search: action.payload,
            };
        case 'SEARCH_RESULTS':
            return {
                ...state,
                search_results: action.payload,
            }
        case 'LOAD_MORE':
            return {
                ...state,
                load_more: action.payload,
            }
        default:
            return state;
    }
};