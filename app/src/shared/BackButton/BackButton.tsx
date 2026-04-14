import { useNavigate } from 'react-router-dom';
import styles from "./BackButton.module.scss";

type BackButtonProps = {
  fallbackPath?: string;
};

export function BackButton({ fallbackPath = "/" }: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(fallbackPath, { replace: true });
  };

  return (
    <button className={styles.button} onClick={handleBack}>
      Назад
    </button>
  );
}