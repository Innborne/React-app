import { createSlice } from '@reduxjs/toolkit';

const initCardList = {
  items: [],
  readOnly: localStorage.getItem('settings')
    ? localStorage.getItem('settings') === 'true'
    : true,
};

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
    setReadOnlyMode: (state, action) => {
      state.readOnly = action.payload;
      state.items = state.items.map((card) => ({ ...card, check: false }));
    },
  },
});

export const changeReadOnlyMode = (readOnlyValue) => {
  return (dispatch) => {
    localStorage.setItem('settings', JSON.stringify(readOnlyValue));
    dispatch(cardListActions.setReadOnlyMode(readOnlyValue));
  };
};

export const cardListActions = cardListSlice.actions;
export default cardListSlice.reducer;
