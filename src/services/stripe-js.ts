import { loadStripe } from "@stripe/stripe-js"

export const getStripeJs = async () => {
  const stripeJs = await loadStripe(process.env.STRIPE_PUBLIC)
  
  return stripeJs
}