import type { AppProps } from 'next/app'

import { Header } from '../components/Header'

import "../styles/global.scss"

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}
