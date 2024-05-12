// src/redux/reducers/ruleChainsReducer.js

import { FETCH_RULE_CHAINS_REQUEST, FETCH_RULE_CHAINS_SUCCESS, FETCH_RULE_CHAINS_FAILURE } from '../actions/ruleChainActions';

const initialState = {
    isLoading: false,
    ruleChains: [],
    error: null
};

const ruleChainsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RULE_CHAINS_REQUEST:
            return { ...state, isLoading: true };
        case FETCH_RULE_CHAINS_SUCCESS:
            return { ...state, isLoading: false, ruleChains: action.payload };
        case FETCH_RULE_CHAINS_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};

export default ruleChainsReducer;
