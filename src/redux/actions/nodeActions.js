// Action Types
export const ADD_NODE = 'ADD_NODE';
export const MOVE_NODE = 'MOVE_NODE';

// Action Creators
export const addNode = node => ({
    type: ADD_NODE,
    payload: node
});

export const moveNode = (nodeId, coordinates) => ({
    type: MOVE_NODE,
    payload: { nodeId, coordinates }
});
