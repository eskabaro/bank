'use client'

import store from '@/store/store';

import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify"
import { QueryClient, QueryClientProvider } from "react-query";
import { PropsWithChildren } from "react";   

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false
      }
   }
});

const Providers = ({
   children
}: PropsWithChildren) => {
   return (
      <QueryClientProvider client={queryClient}>
         <Provider store={store}>
            <ToastContainer />
            {children}
         </Provider>
      </QueryClientProvider>
   )
}

export default Providers