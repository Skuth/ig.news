import { FaGithub } from "react-icons/fa"
import { FiX } from "react-icons/fi"

import { signIn, signOut, useSession } from "next-auth/react"

import styles from "./styles.module.scss"

const SignInButton: React.FC = () => {
  const { data: session } = useSession()

  const handleSignIn = () => {
    signIn("github")
  }

  const handleSignOut = () => {
    signOut()
  }

  return session ? (
    <button className={styles.sign__in__button} onClick={handleSignOut}>
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737380" className={styles.close__icon} />
    </button>
  ) : (
    <button className={styles.sign__in__button} onClick={handleSignIn}>
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  )
}

export { SignInButton };