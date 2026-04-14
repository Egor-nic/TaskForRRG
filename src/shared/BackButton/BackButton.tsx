import { useNavigate } from 'react-router-dom';
import styles from "./BackButton.module.scss";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <button className={styles.button} onClick={() => navigate(-1)}>
      Назад
    </button>
  );
}