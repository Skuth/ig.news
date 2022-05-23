import styles from "./styles.module.scss"

const SubscribeButton: React.FC = () => {
  return (
    <button
      className={styles.subscribe__button}
    >
      Subscribe now
    </button>
  )
}

export { SubscribeButton };