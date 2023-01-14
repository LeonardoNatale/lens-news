import '../styles/globals.css'
import '../styles/article.css'
import type { AppProps } from 'next/app'
import Header from '../modules/header/components/header'
import { AuthProvider } from '../modules/auth/auth-provider'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { WagmiConfig } from 'wagmi'
import { chains, wagmiClient } from '../common/rainbow'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

const API_URL = 'https://api-mumbai.lens.dev'

/* create the API client */
export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <AuthProvider>
            <Header />
            <div className="container m-auto max-w-full">
              <Component {...pageProps} />
            </div>
          </AuthProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  )
}
