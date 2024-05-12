import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const fetchRuleChains = () => {
  return dispatch => {
    dispatch({ type: 'FETCH_RULE_CHAINS_REQUEST' });
    setTimeout(() => {  // Simulate API call
      dispatch({
        type: 'FETCH_RULE_CHAINS_SUCCESS',
        payload: [
          { id: 1, name: 'Temperature Control', description: 'Controls temperature.' },
          { id: 2, name: 'Lighting Management', description: 'Manages lighting.' }
        ]
      });
    }, 1000);
  };
};

const RuleChains = () => {
  const { ruleChains, isLoading } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRuleChains());
  }, [dispatch]);

  return (
    <div>
      <h2>Rule Chains</h2>
      {isLoading ? <p>Loading...</p> : (
        <ul>
          {ruleChains.map(ruleChain => (
            <li key={ruleChain.id}>{ruleChain.name}: {ruleChain.description}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RuleChains;
