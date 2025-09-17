export const changeSearchValue = (value) => ({
    type: "CHANGE_SEARCH",
    payload: value,
});

export const changeSearchResults = (results) => ({
    type: "SEARCH_RESULTS",
    payload: results,
});

export const loadMore = (tf) => ({
    type: "LOAD_MORE",
    payload: tf,
});