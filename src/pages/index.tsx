import Head from "next/head"

import { SubscribeButton } from "../components/SubscribeButton"

import styles from "../styles/home.module.scss"

const Home = () => {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.content__container}>
        <section className={styles.hero}>
          <span>&#x1f44f; Hey, welcome</span>

          <h1>News about the <span>React</span> world.</h1>

          <p>
            Get access to all the publications <br />
            <span>for $9.90 / month</span>
          </p>

          <SubscribeButton />
        </section>

        <img
          src="/images/avatar.svg"
          alt="Girl coding"
        />
      </main>
    </>
  )
}

export default Home