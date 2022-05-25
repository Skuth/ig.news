import { query as fq } from "faunadb"

import { fauna } from "../../../services/fauna"
import { stripe } from "../../../services/stripe"

interface saveSubscriptionProps {
  subscriptionId: string
  customerId: string
  createAction?: boolean
}

export const saveSubscription = async ({
  subscriptionId,
  customerId,
  createAction = false
}: saveSubscriptionProps) => {
  const userRef = await fauna.query(
    fq.Select(
      "ref",
      fq.Get(
        fq.Match(
          fq.Index("user_by_stripe_customer_id"),
          customerId
        )
      )
    )
  )
  
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id
  }

  if (createAction) {
    await fauna.query(
      fq.Create(
        fq.Collection("subscriptions"),
        {
          data: subscriptionData
        }
      )
    )
  } else {
    await fauna.query(
      fq.Replace(
        fq.Select(
          "ref",
          fq.Get(
            fq.Match(
              fq.Index("subscription_by_id"),
              subscriptionId
            )
          )
        ),
        {
          data: subscriptionData
        }
      )
    )
  }
}