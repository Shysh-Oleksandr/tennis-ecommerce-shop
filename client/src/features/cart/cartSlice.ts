import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IProduct from "../../interfaces/product";
import IOrderItem from "./../../interfaces/orderItem";

export interface ICartState {
  cartItems: IOrderItem[];
}

const initialState: ICartState = {
  cartItems: [],
};

// export const fetchAllNotes = createAsyncThunk('cart/fetchAllNotesStatus', async ({ user, filter, sort }: IFilterNotes) => {
//     const response = await axios({
//         method: 'GET',
//         url: `${config.server.url}/notes/${user._id}`
//     });

//     if (response.status === 200 || response.status === 304) {
//         let notes = response.data.notes as INote[];
//         const oldestNoteDate = notes.sort((x, y) => y.startDate - x.startDate).at(-1)?.startDate;
//         notes.push(getInitialNote(user));
//         notes = filter ? filter(notes) : notes;
//         const endNotes: INote[] = notes
//             .filter((note) => dateDiffInDays(new Date(note.startDate), new Date(note.endDate)) + 1 >= 2)
//             .map((note) => {
//                 // Adding end date notes.
//                 const copyNote = JSON.parse(JSON.stringify(note));
//                 copyNote.isEndNote = true;
//                 const startDate = copyNote.startDate;
//                 copyNote.startDate = copyNote.endDate;
//                 copyNote.endDate = startDate;
//                 return copyNote;
//             });
//         notes = [...notes, ...endNotes].filter((note) => note.startDate <= new Date().getTime());

//         notes = sort ? sort(notes) : notes.sort((x, y) => y.startDate - x.startDate);
//         return { notes: notes, oldestNoteDate: oldestNoteDate };
//     } else {
//         return { notes: [] };
//     }
// });

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addToCart: (state, { payload }: PayloadAction<IOrderItem>) => {
      state.cartItems = [...state.cartItems, payload];
    },
    removeFromCart: (state, { payload }: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.product._id !== payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  // extraReducers: (builder) => {
  //     // Fetch all notes
  //     builder.addCase(fetchAllNotes.pending, (state, action) => {
  //         state.loading = true;
  //     });
  //     builder.addCase(fetchAllNotes.fulfilled, (state, action) => {
  //         state.notes = action.payload.notes;
  //         state.loading = false;
  //         if (!state.oldestNoteDate) state.oldestNoteDate = action.payload.oldestNoteDate ? action.payload.oldestNoteDate : state.oldestNoteDate;
  //     });
  //     builder.addCase(fetchAllNotes.rejected, (state, action) => {
  //         state.loading = false;
  //         state.error = 'Unable to retreive notes.';
  //     });
  // }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
