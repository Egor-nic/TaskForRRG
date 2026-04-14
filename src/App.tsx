import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/Main.page";
import styles from "./styles/App.module.scss";
import PostPage from "./pages/PostPage/Post.page";

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </div>
  );
}

export default App;
