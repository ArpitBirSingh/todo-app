import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: "",
    email: "",
    photoUrl: "",
    id:""
  },

  reducers: {
    setDetails: (state, action) => {
      state.userName = action.payload.name;
      state.email = action.payload.email;
      state.photoUrl = action.payload.photoUrl;
      state.id = action.payload.id;
    },
    removeDetails: (state) => {
      state.userName = null;
      state.email = null;
      state.photoUrl = null;
      state.id = null;
    }

  }
});

export const { setDetails, removeDetails } = userSlice.actions;

export default userSlice.reducer;
