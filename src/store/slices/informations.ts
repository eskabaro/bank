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
   name: string
   date: string
   amount: number
}

const Informations = createSlice({
   name: 'InformationsSlice',
   initialState,
   reducers: {
      addNewBlock: (state, action: PayloadAction<IPayload>) => { 
         state.blocks.push(action.payload)
      },
      setBlocks: (state, action: PayloadAction<IBlock[]>) => {
         state.blocks = action.payload
      }
   }
})

export const { addNewBlock, setBlocks } = Informations.actions
export default Informations.reducer