// src/redux/actions/ruleChainActions.js

// Action Types
export const FETCH_RULE_CHAINS_REQUEST = 'FETCH_RULE_CHAINS_REQUEST';
export const FETCH_RULE_CHAINS_SUCCESS = 'FETCH_RULE_CHAINS_SUCCESS';
export const FETCH_RULE_CHAINS_FAILURE = 'FETCH_RULE_CHAINS_FAILURE';

// Action Creators
export const fetchRuleChainsRequest = () => ({
    type: FETCH_RULE_CHAINS_REQUEST
});

export const fetchRuleChainsSuccess = ruleChains => ({
    type: FETCH_RULE_CHAINS_SUCCESS,
    payload: ruleChains
});

export const fetchRuleChainsFailure = error => ({
    type: FETCH_RULE_CHAINS_FAILURE,
    payload: error
});
