import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { query as fq } from "faunadb"

import { fauna } from "../../../services/fauna"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    async signIn({ user }) {

      const { email } = user
      
      try {
        await fauna.query(
          fq.If(
            fq.Not(
              fq.Exists(
                fq.Match(
                  fq.Index("user_by_email"),
                  fq.Casefold(email)
                )
              )
            ),
            fq.Create(
              fq.Collection("users"),
              {
                data: { email }
              }
            ),
            fq.Get(
              fq.Match(
                fq.Index("user_by_email"),
                fq.Casefold(email)
              )
            )
          )
        )

        return true
      } catch {
        return false
      }
    }
  }
})