import { SignInButton } from "../SignInButton"

import styles from "./styles.module.scss"

const Header: React.FC = () => {
  return (
    <header className={styles.header__container}>
      <div className={styles.header__content}>
        <img
          src="/images/logo.svg"
          alt="ig.news"
        />

        <nav>
          <a href="#" className={styles.active}>Home</a>
          <a href="#">Posts</a>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}

export { Header };