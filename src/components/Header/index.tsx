import Link from "next/link"

import { SignInButton } from "../SignInButton"

import styles from "./styles.module.scss"

const Header: React.FC = () => {
  return (
    <header className={styles.header__container}>
      <div className={styles.header__content}>
        <Link href="/">
          <img
            src="/images/logo.svg"
            alt="ig.news"
          />
        </Link>

        <nav>
          <Link href="/" passHref>
            <a className={styles.active}>Home</a>
          </Link>
          <Link href="/posts" passHref>
            <a>Posts</a>
          </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}

export { Header };