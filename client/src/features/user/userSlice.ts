import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from "react-native-toast-message";
import { API_URL } from "../../constants";
import IUser from "./../../interfaces/user";

export const DEFAULT_USER: IUser = {
  name: "",
  phone: "",
  email: "",
  password: "",
  isAdmin: false,
  _id: "",
};

export interface IUserState {
  user: IUser;
  token: any;
  loading: boolean;
}
const initialState: IUserState = {
  user: DEFAULT_USER,
  token: "",
  loading: false,
};

interface ILogin {
  email: string;
  password: string;
  navigation: any;
  setError: (value: React.SetStateAction<string>) => void;
}

export const loginUser = createAsyncThunk(
  "user/loginUserStatus",
  async ({ email, password, navigation, setError }: ILogin) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${API_URL}/users/login`,
        data: {
          email,
          password,
        },
      });

      if (response.status === 200) {
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Login succeeded",
        });
        setTimeout(() => {
          navigation.navigate("Home");
        }, 500);
        const token = response.data.token;
        AsyncStorage.setItem("jwt", token);
        return { token: token, user: response.data.user };
      } else {
        setError("Invalid email or password, try again.");
        return { error: true };
      }
    } catch (error) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong",
        text2: "Please, try again",
      });
      return { error: true };
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state) => {
      AsyncStorage.removeItem("jwt");
      state.user = DEFAULT_USER;
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    // Fetch all notes
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        userSlice.caseReducers.logout(state);
      } else {
        state.user = action.payload?.user;
        state.token = action.payload?.token;
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      userSlice.caseReducers.logout(state);
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
