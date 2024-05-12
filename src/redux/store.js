import { configureStore } from '@reduxjs/toolkit';
import ruleChainsReducer from './reducers/ruleChainsReducer';
import canvasReducer from './reducers/canvasReducer';

const store = configureStore({
  reducer: {
    ruleChains: ruleChainsReducer,
    canvas: canvasReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== 'production', // Automatically handles Redux DevTools
});
export default store;