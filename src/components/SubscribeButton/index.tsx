import { useState } from "react"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router"

import { FiLoader } from "react-icons/fi"

import { api } from "../../services/api"
import { getStripeJs } from "../../services/stripe-js"

import styles from "./styles.module.scss"

interface SubscribeButtonProps {
  priceId: string
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ priceId }) => {
  const { data: session } = useSession()
  const router = useRouter()

  const [isLoading, setLoading] = useState<boolean>(false)

  const handleSubscribe = async () => {
    if (!session) {
      signIn("github")
      return
    }

    if (session.activeSubscription) {
      router.push("/posts")
      return
    }

    setLoading(true)

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

    setLoading(false)
  }

  return (
    <button
      disabled={isLoading}
      className={styles.subscribe__button}
      onClick={handleSubscribe}
    >
      {isLoading && <FiLoader />}
      Subscribe now
    </button>
  )
}

export { SubscribeButton };