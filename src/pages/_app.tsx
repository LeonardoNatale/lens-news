import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../modules/header/components/header'
import { AuthProvider } from '../modules/auth/auth-provider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  )
}
