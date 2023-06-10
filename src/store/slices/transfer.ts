import { User } from "@/interfaces/data";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TransferState {
   friends: User[]
}

const initialState: TransferState = {
   friends: []
}

export const TransferSlice = createSlice({
   name: 'TransferSlice',
   initialState,
   reducers: {
      addFriend: (state, action: PayloadAction<User>) => {
         const currentUser = state.friends.find(e => e.id === action.payload.id)
         if (!currentUser) {
            state.friends.push(action.payload)
            localStorage.setItem('friends', JSON.stringify(state.friends))
         }
      },
      deleteFriend: (state, action: PayloadAction<string>) => {
         state.friends = state.friends.filter(e => e.id !== action.payload)
         localStorage.setItem('friends', JSON.stringify(state.friends))
      },
      setFriends: (state, action: PayloadAction<User[]>) => {
         state.friends = action.payload
      }
   }
})


export const { addFriend, setFriends, deleteFriend } = TransferSlice.actions
export default TransferSlice.reducer