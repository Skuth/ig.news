import { GetStaticProps, NextPage } from "next"
import Head from "next/head"

import { stripe } from "../services/stripe"

import { SubscribeButton } from "../components/SubscribeButton"

import styles from "../styles/home.module.scss"

interface HomeProps {
  product: {
    priceId: string
    amount: string
  }
}

const Home: NextPage = ({ product }: HomeProps) => {
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
            <span>for {product.amount} / month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img
          src="/images/avatar.svg"
          alt="Girl coding"
        />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1L2mHxEmEJcxqdeiqDMrgbIU")

  const product = {
    priceId: price.id,
    amount: Number(price.unit_amount / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    })
  }
  

  return {
    props: {
      product
    },
    revalidate: (60 * 60) * 24 // 24 horas
  }
}

export default Home