// Элемент поста
import { TPostPageProps } from "../../pages/PostPage/types";
import styles from "./PostItem.module.scss";

export default function PostItem({ title, body, id, className, isHoveEffect = true }: TPostPageProps) {
  return (
    <div className={`${styles.wrapper} ${className} ${isHoveEffect ? '' : styles.noHover}`}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.body}>{body}</p>
      <div className={styles.postFooter}>
        <p className={styles.postId}>Пост номер {id}</p>
      </div>
    </div>
  )
}
