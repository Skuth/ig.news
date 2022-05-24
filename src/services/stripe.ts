import Stripe from "stripe"

import app from "../../package.json"

export const stripe = new Stripe(
  process.env.STRIPE_SECRET,
  {
    apiVersion: "2020-08-27",
    appInfo: {
      name: "Ig.news",
      version: app?.version || "0.1.0"
    }
  }
)