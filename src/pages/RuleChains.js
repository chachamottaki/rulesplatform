import React, { useState, useEffect } from 'react';

const RuleChains = () => {
  const [ruleChains, setRuleChains] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock function to simulate fetching data from an API
  useEffect(() => {
    const fetchRuleChains = async () => {
      setIsLoading(true);
      try {
        // Simulated API call
        const response = await new Promise(resolve => {
          setTimeout(() => {
            resolve([
              { id: 1, name: 'Temperature Control', description: 'Controls the temperature of devices.' },
              { id: 2, name: 'Lighting Management', description: 'Manages the lighting based on ambient conditions.' },
            ]);
          }, 1000);
        });
        
        setRuleChains(response);
      } catch (error) {
        console.error('Failed to fetch rule chains', error);
      }
      setIsLoading(false);
    };

    fetchRuleChains();
  }, []);

  return (
    <div>
      <h2>Rule Chains</h2>
      {isLoading ? (
        <p>Loading rule chains...</p>
      ) : (
        <ul>
          {ruleChains.map(ruleChain => (
            <li key={ruleChain.id}>
              <h3>{ruleChain.name}</h3>
              <p>{ruleChain.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RuleChains;
