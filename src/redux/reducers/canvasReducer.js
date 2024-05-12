// src/redux/reducers/canvasReducer.js

import { ADD_NODE, MOVE_NODE } from '../actions/nodeActions';

const initialState = {
    nodes: []
};

const canvasReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NODE:
            return { ...state, nodes: [...state.nodes, action.payload] };
        case MOVE_NODE:
            const { nodeId, coordinates } = action.payload;
            return {
                ...state,
                nodes: state.nodes.map(node =>
                    node.id === nodeId ? { ...node, ...coordinates } : node
                )
            };
        default:
            return state;
    }
};

export default canvasReducer;
