import type { AppProps } from 'next/app'
import { SessionProvider as NextAuthProvider } from 'next-auth/react'

import { Header } from '../components/Header'

import "../styles/global.scss"

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}
