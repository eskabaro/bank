import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IPayload {
   type: string,
   value: number
}

interface IState {
   income: number
   expense: number
}

const initialState: IState = {
   income: 0,
   expense: 0
}

const statisticsSlice = createSlice({
   name: 'statisticsSlice',
   initialState,
   reducers: {
      setIncome: (state, action: PayloadAction<number>) => {
         state.income += action.payload
      },
      setExpense: (state, action: PayloadAction<number>) => {
         state.expense += action.payload
      },
      setWithUseEffect: (state, action: PayloadAction<IPayload>) => {
         if (action.payload.type === 'SET_INCOME') {
            state.income = action.payload.value
         } else if (action.payload.type === 'SET_EXPENSE') {
            state.expense = action.payload.value
         }
      }
   }
})

export const { setIncome, setExpense, setWithUseEffect } = statisticsSlice.actions
export default statisticsSlice.reducer