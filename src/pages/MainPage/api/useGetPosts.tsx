import { useState, useEffect } from 'react';
import { fetcher } from '../../../libs/fetcher';
import { TPost } from '../../PostPage/types';


export const useGetPosts = (page: number) => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPosts, setTotalPosts] = useState(0);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // setPosts([]);
        setIsLoading(true);
        // _limit Можно утсановить через пропс для более гипокого использования, но в рамках текущей задачи
        // параметр установлен согласно условию
        const response = await fetcher({url: `posts?_limit=10&_page=${page}`});

        const totalPosts = response.headers.get('x-total-count');
        const data: TPost[] = await response.json();
        setPosts(data);
        setError(null);

        if (totalPosts) {
          setTotalPosts(parseInt(totalPosts, 10));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  return { posts, totalPosts, isLoading, error };
};
