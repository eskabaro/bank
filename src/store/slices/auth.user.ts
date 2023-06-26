import { User } from "@/interfaces/data";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: { user: User | null } = {
   user: null
}

const SetUserSlice = createSlice({
   name: 'SetUserSlice',
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<User>) => {
         state.user = action.payload
         
         const d = new Date()
         d.setTime(d.getTime() + (1 * 24 * 60 * 1000))
         const expires = d.toUTCString()
         document.cookie = `user=${JSON.stringify(action.payload)}; expires=${expires}; path=/`
      }
   }
})

export const { setUser } = SetUserSlice.actions
export default SetUserSlice.reducer