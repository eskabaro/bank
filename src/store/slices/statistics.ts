import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IPayload {
   type: string,
   value: number
}

const initialState = {
   income: 0,
   expense: 0
}

const statisticsSlice = createSlice({
   name: 'statisticsSlice',
   initialState,
   reducers: {
      setIncome: (state, action: PayloadAction<number>) => {
         state.income += action.payload
         localStorage.setItem('income', JSON.stringify(state.income))
      },
      setExpense: (state, action: PayloadAction<number>) => {
         state.expense += action.payload
         localStorage.setItem('expense', JSON.stringify(state.expense))
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