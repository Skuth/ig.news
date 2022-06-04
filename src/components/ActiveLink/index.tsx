import { cloneElement } from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"

interface ActiveLinkProps extends LinkProps {
  children: JSX.Element
  activeClassName: string
}

const ActiveLink: React.FC<ActiveLinkProps> = ({
  children,
  activeClassName,
  ...rest
}) => {
  const router = useRouter()

  const className = router.pathname === rest.href
    ? activeClassName
    : ""

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className
      })}
    </Link>
  )
}

export { ActiveLink };