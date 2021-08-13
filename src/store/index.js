import { configureStore } from '@reduxjs/toolkit';
import cardListReducer from './cards';

const store = configureStore({ reducer: cardListReducer });

export default store;
