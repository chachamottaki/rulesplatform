import { createStore } from 'redux';

const initialState = {
  ruleChains: [],
  isLoading: false,
  error: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_RULE_CHAINS_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_RULE_CHAINS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        ruleChains: action.payload,
      };
    case 'FETCH_RULE_CHAINS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(rootReducer);

export default store;
