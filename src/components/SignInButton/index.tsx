import { useState } from "react"
import { FaGithub } from "react-icons/fa"
import { FiX } from "react-icons/fi"

import styles from "./styles.module.scss"

const SignInButton: React.FC = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState<boolean>(false)

  const handleSignIn = () => {
    setUserLoggedIn(!isUserLoggedIn)
  }

  return isUserLoggedIn ? (
    <button className={styles.sign__in__button} onClick={handleSignIn}>
      <FaGithub color="#04d361" />
      Sign in with Github
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