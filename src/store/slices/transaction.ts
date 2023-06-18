import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IState {
    balance: number
}

const initialState: IState = {
    balance: 0
}

const registerSlice = createSlice({
    name: 'registerSlice',
    initialState,
    reducers: {
        setBalance: (state, action: PayloadAction<number>) => {
            state.balance = action.payload
        }
    }
})

export const { setBalance } = registerSlice.actions
export default registerSlice.reducer