import '@/styles/globals.scss'
import { Provider } from 'react-redux'
import store from '@/store/store'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from 'react-query' 

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  )
}
