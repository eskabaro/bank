import { IFriend } from "@/interfaces/data";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TransferState {
   friends: IFriend[]
}

const initialState: TransferState = {
   friends: []
}

export const TransferSlice = createSlice({
   name: 'TransferSlice',
   initialState,
   reducers: {
      addFriend: (state, action: PayloadAction<IFriend>) => {
         const currentUser = state.friends.find(e => e.id === action.payload.id)
         if (!currentUser) state.friends.push(action.payload)
      },
      deleteFriend: (state, action: PayloadAction<string>) => {
         state.friends = state.friends.filter(e => e.id !== action.payload)
      },
      setFriends: (state, action: PayloadAction<IFriend[]>) => {
         state.friends = action.payload
      }
   }
})


export const { addFriend, setFriends, deleteFriend } = TransferSlice.actions
export default TransferSlice.reducer