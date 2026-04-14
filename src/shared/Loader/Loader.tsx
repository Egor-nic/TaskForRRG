// Базовый компонент для отображения загрузки
// Текст можно прокинуть пропсом для более гипокого использования компонента.
// В рамках данной задачи текст статитчен
import styles from "./Loader.module.scss";

export default function Loader() {
    return (
        <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
        <div className={styles.text}>Загрузка...</div>
      </div>
    )
};
