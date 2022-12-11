import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../modules/header/components/header'
import { AuthProvider } from '../modules/auth/auth-provider'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const API_URL = 'https://api.lens.dev'

/* create the API client */
export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Header />
        <div className="container m-auto max-w-full pt-4 my-20">
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </ApolloProvider>
  )
}
