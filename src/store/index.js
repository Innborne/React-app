import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import cardListReducer from './cards';

const logger = () => (next) => (action) => {
  console.log('dispatching', action);
  return next(action);
};

const store = configureStore({
  reducer: cardListReducer,
  middleware: [thunk, logger],
});

export default store;
