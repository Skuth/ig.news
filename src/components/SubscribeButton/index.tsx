import { useSession, signIn } from "next-auth/react"

import { api } from "../../services/api"
import { getStripeJs } from "../../services/stripe-js"

import styles from "./styles.module.scss"

interface SubscribeButtonProps {
  priceId: string
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ priceId }) => {
  const { data: session } = useSession()

  const handleSubscribe = async () => {
    if (!session) {
      signIn("github")
      return
    }

    try {
      const response = await api.post("subscribe")
      const { sessionId } = response.data

      const stripe = await getStripeJs()
      await stripe.redirectToCheckout({
        sessionId: sessionId
      })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <button
      className={styles.subscribe__button}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}

export { SubscribeButton };