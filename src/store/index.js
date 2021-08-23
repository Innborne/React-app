import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import cardListReducer from './cards';
import userReducer from './user';

const logger = () => (next) => (action) => {
  console.log('dispatching', action);
  return next(action);
};

const store = configureStore({
  reducer: { cards: cardListReducer, user: userReducer },
  middleware: [thunk, logger],
});

export default store;
