import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from './slices/transaction';
import transferReduser from './slices/transfer';
import statisticsReducer from './slices/statistics';
import informationsReduser from './slices/informations'
import setUserReducer from './slices/auth.user';

const store = configureStore({
    reducer: {
        transaction: transactionReducer,
        transfer: transferReduser,
        statistics: statisticsReducer,
        informations: informationsReduser,
        setUser: setUserReducer
    }
}) 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
