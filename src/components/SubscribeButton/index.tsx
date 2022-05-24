import styles from "./styles.module.scss"

interface SubscribeButtonProps {
  priceId: string
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ priceId }) => {
  return (
    <button
      className={styles.subscribe__button}
    >
      Subscribe now
    </button>
  )
}

export { SubscribeButton };