// src/redux/reducers/canvasReducer.js
import { ADD_NODE, MOVE_NODE, PLACE_NODE } from '../actions/nodeActions';

const initialState = {
    nodes: []
};

const canvasReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NODE:
            return { ...state, nodes: [...state.nodes, action.payload] };
        case MOVE_NODE:
            // Assuming MOVE_NODE temporarily updates the node's position during drag
            const { nodeId, coordinates } = action.payload;
            return {
                ...state,
                nodes: state.nodes.map(node =>
                    node.id === nodeId ? { ...node, ...coordinates } : node
                )
            };
        case PLACE_NODE:
            // PLACE_NODE permanently sets the node's position when dropped
            const { nodeId: placeNodeId, coordinates: placeCoordinates } = action.payload;
            return {
                ...state,
                nodes: state.nodes.map(node =>
                    node.id === placeNodeId ? { ...node, ...placeCoordinates } : node
                )
            };
        default:
            return state;
    }
};

export default canvasReducer;
