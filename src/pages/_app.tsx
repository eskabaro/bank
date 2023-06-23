import '@/styles/globals.scss';
import store from '@/store/store';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from 'react-query' ;
import type { AppProps } from 'next/app';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
};
