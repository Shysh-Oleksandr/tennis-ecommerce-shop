import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import IProduct from "../../interfaces/product";
import IOrderItem from "../../interfaces/orderItem";
import IUser from "./../../interfaces/user";
import Toast from "react-native-toast-message";
import axios from "axios";
import { API_URL } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

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
    console.log("log");

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
          text2: "Enjoy!",
        });
        setTimeout(() => {
          navigation.navigate("Home");
        }, 500);
        const token = response.data.token;
        AsyncStorage.setItem("jwt", token);
        return { token: jwt_decode(token), user: response.data.user };
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
      console.log("Catch: " + error);
      return { error: true };
    }
  }
);

// export const getUserProfile = createAsyncThunk(
//   "user/getUserProfileStatus",
//   async (id: string) => {
//     console.log("get profile");

//     try {
//       const response = await axios({
//         method: "GET",
//         url: `${API_URL}/users/${id}`,
//       });

//       if (response.status === 200) {
//         const userProfile = response.data.user as IUser;
//         console.log(userProfile);
//         return userProfile;
//       }
//     } catch (error) {
//       Toast.show({
//         topOffset: 60,
//         type: "error",
//         text1: "Something went wrong",
//         text2: "Please, try again",
//       });
//       console.log("Catch: " + error);
//     }
//   }
// );

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
