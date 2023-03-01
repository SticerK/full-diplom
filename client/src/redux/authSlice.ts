import { RootState } from './../store/store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { formProps } from '../components/login/login';

export const fetchUser = createAsyncThunk('auth/fetchUser', async (props: formProps) => {
  const { data } = await axios.post('http://localhost:8080/login', props);
  return data;
});

export const fetchUserReg = createAsyncThunk('auth/fetchUserReg', async (props) => {
  const { data } = await axios.post('http://localhost:8080/register', props);
  return data;
});

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (props: { id: string; userData: User }) => {
    if (props.id === props.userData._id) {
      const { data } = await axios.patch(`http://localhost:8080/profile/${props.id}`, props);
      return data;
    }
  }
);

export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (props: { id: string; userData: User }) => {
    if (props.id === props.userData._id) {
      //@ts-ignore
      const { data } = await axios.delete(`http://localhost:8080/profile/${props.id}`);
      return data;
    }
  }
);

export const buyItemsUser = createAsyncThunk(
  'auth/fetchBuyItemsUser',
  async (props, { dispatch, getState }) => {
    //@ts-ignore
    dispatch(buyItems(props.cost));
    const state = getState() as RootState;
    //@ts-ignore
    if (props.user._id) {
      const { data } = await axios.patch(`http://localhost:8080/basket`, state.authSlice.user);
      return data;
    }
  }
);

export type RegisterFormProp = {
  status: string;
  user: null | User;
  isAuth: boolean;
  message: string;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _password: string;
  cash: number;
  _id: string;
};

const initialState: RegisterFormProp = {
  status: 'pending',
  user: null,
  isAuth: false,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuth = false;
      state.user = null;
    },
    addCash(state, action) {
      if (state.user !== null) {
        state.user.cash = +state.user.cash + Number(action.payload);
      }
    },
    buyItems(state, action) {
      if (state.user !== null) {
        state.user.cash -= action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = 'pending';
      state.user = null;
      state.isAuth = false;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      if (action.payload.message) state.message = action.payload.message;

      state.user = action.payload;
      //@ts-ignore
      if (!state.user.message) {
        state.isAuth = true;
      }
    });
    builder.addCase(fetchUser.rejected, (state, action: PayloadAction<any>) => {
      console.log(action);

      state.status = 'rejected';
      state.user = null;
      state.isAuth = false;
    });
    builder.addCase(fetchUserReg.pending, (state) => {
      state.status = 'pending';
      state.user = null;
      state.isAuth = false;
    });
    builder.addCase(fetchUserReg.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.user = action.payload;
      state.message = '';
      state.isAuth = true;
    });
    builder.addCase(fetchUserReg.rejected, (state) => {
      state.status = 'rejected';
      state.user = null;
      state.isAuth = false;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.user = action.payload;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.status = 'fulfilled';
      state.user = null;
      state.isAuth = false;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.status = 'rejected';
      state.user = null;
      state.isAuth = false;
    });
  },
});

export default authSlice.reducer;

export const { logout, addCash, buyItems } = authSlice.actions;
