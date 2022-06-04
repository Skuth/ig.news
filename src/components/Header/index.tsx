import Link from "next/link"
import Image from "next/image"

import { ActiveLink } from "../ActiveLink"
import { SignInButton } from "../SignInButton"

import styles from "./styles.module.scss"

const Header: React.FC = () => {
  const links = [
    {
      title: "Home",
      path: "/"
    },
    {
      title: "Posts",
      path: "/posts"
    }
  ]

  return (
    <header className={styles.header__container}>
      <div className={styles.header__content}>
        <Link
          href="/"
          passHref
        >
          <a>
            <Image
              src="/images/logo.svg"
              alt="ig.news"
              width={110}
              height={31}
            />
          </a>
        </Link>

        <nav>
          {links.map((link, index) => (
          <ActiveLink
            key={index}
            href={link.path}
            passHref
            activeClassName={styles.active}
          >
            <a>
              {link.title}
            </a>
          </ActiveLink>
          ))}
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}

export { Header };