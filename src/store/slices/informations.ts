import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IBlock {
   name: string,
   date: string,
   amount: number
}

interface IState {
   blocks: IBlock[]
}

const initialState: IState = {
   blocks: []
}

interface IPayload {
   amount: number,
   name: string
}

const Informations = createSlice({
   name: 'InformationsSlice',
   initialState,
   reducers: {
      addNewBlock: (state, action: PayloadAction<IPayload>) => { 
         const block = {
            name: action.payload.name,
            date: String(new Date),
            amount: action.payload.amount
         }
         state.blocks.push(block)
      },
      setBlocks: (state, action: PayloadAction<IBlock[]>) => {
         state.blocks = action.payload
      }
   }
})

export const { addNewBlock, setBlocks } = Informations.actions
export default Informations.reducer