import styles from "./Post.module.scss";
import { useLocation, useParams } from 'react-router-dom';
import PostItem from "../../shared/PostItem/PostItem";
import { useGetPost } from "./api/useGetPost";
import { BackButton } from "../../shared/BackButton/BackButton";
import Loader from "../../shared/Loader/Loader";

type TPostLocationState = {
  fromPage?: number;
};

export default function PostPage() {

  const { id } = useParams();
  const location = useLocation();
  const locationState = location.state as TPostLocationState | null;
  const fallbackPage = locationState?.fromPage ?? 1;
  const { post, isLoading, error } = useGetPost(id);

  return (

    <main>
      <header className={styles.header}>
        <nav>
          <BackButton fallbackPath={`/?page=${fallbackPage}`} />
        </nav>
      </header>

      <div className={styles.wrapper}>

        {error && <div>Ошибка получения поста</div>}
        {isLoading && <Loader />}

        {post &&
          <PostItem
            key={post.id}
            body={post.body}
            userId={post.userId}
            title={post.title}
            id={post.id}
            className={styles.postItem}
            isHoverEffect={false}
          />
        }
      </div>
    </main>
  )
};
