import { createSlice } from '@reduxjs/toolkit';

const initCardList = { items: [] };

const cardListSlice = createSlice({
  name: 'cards',
  initialState: initCardList,
  reducers: {
    setCards(state, action) {
      state.items = action.payload;
    },
    onChangeCard: (state, action) => {
      state.items = state.items.map((prevCard) =>
        prevCard.id === action.payload.id
          ? { ...prevCard, ...action.payload }
          : prevCard
      );
    },
    onAddCard: (state, action) => {
      state.items = [{ ...action.payload }, ...state.items];
    },
    onDeleteCard: (state) => {
      state.items = state.items.filter((card) => !card.check);
    },
  },
});

export const cardListActions = cardListSlice.actions;
export default cardListSlice.reducer;
