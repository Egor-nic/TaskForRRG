import styles from "./Post.module.scss";
import { Link, useParams } from 'react-router-dom';
import PostItem from "../../shared/PostItem/PostItem";
import { useGetPost } from "./api/useGetPost";
import { BackButton } from "../../shared/BackButton/BackButton";
import Loader from "../../shared/Loader/Loader";

export default function PostPage() {

  const { id } = useParams();

  const { post, isLoading, error } = useGetPost(id);

  return (

    <main>

      <header className={styles.header}>
        <nav>
          <BackButton />
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
            isHoveEffect={false}
          />
        }
      </div>
    </main>
  )
}
