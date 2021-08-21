import { createSlice } from '@reduxjs/toolkit';

const adminData = {
  email: 'testAdmin@gmail.com',
  password: '12345yuiopp',
  isAdmin: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState: { user: JSON.parse(localStorage.getItem('user')) || null },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const login = (user) => {
  return (dispatch) => {
    let userData;

    if (
      user.email === adminData.email &&
      user.password === adminData.password
    ) {
      userData = { ...adminData };
    } else {
      userData = {
        email: user.email,
        password: user.password,
      };
    }

    localStorage.setItem(
      'user',
      JSON.stringify({ email: userData.email, isAdmin: userData.isAdmin })
    );

    dispatch(userActions.setUser(userData));
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(userActions.setUser(null));
    localStorage.removeItem('user');
  };
};

export const userActions = userSlice.actions;
export default userSlice.reducer;
