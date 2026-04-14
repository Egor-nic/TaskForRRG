import { Link, useSearchParams } from "react-router-dom";
import { useGetPosts } from "./api/useGetPosts"
import styles from "./Main.module.scss";
import PostItem from "../../shared/PostItem/PostItem";
import Pagination from "../../shared/Pagination/Pagination";
import classNames from "classnames";
import Loader from "../../shared/Loader/Loader";

export default function MainPage() {

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const { posts, totalPosts, isLoading, error } = useGetPosts(currentPage);

  if (error) {
    return (
      <div>{error}</div>
    )
  }

  return (
    <main className={styles.main}>

      <header>
        <h1 className={styles.title}>Список всех постов</h1>

        <Pagination
          totalItems={totalPosts}
          itemsPerPage={10}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          className={styles.pagination}
        />
      </header>

      {isLoading && <Loader />}

      <div key={currentPage} className={classNames(styles.wrapper, {
          [styles.visiblePosts]: posts.length > 0,
      })}>

        {posts.map(post =>

          <Link to={`/post/${post.id}`} className={`${styles.postLink}`}>
            <PostItem
              key={post.id}
              body={post.body}
              userId={post.userId}
              title={post.title}
              id={post.id}
            />
          </Link>
        )}
      </div>
    </main>
  );
};
