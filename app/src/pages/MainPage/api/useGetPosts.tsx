import { useState, useEffect } from 'react';
import { fetcher } from '../../../libs/fetcher';
import { TPost } from '../../PostPage/types';
import { getPostsUrl } from '../../../libs/api';


const cache = new Map<string, { data: TPost[], total: number }>(); // В идиале использовать библиотеку SWR или подобные, но по условию стека ее нет.

export const useGetPosts = (page: number) => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = getPostsUrl(page);
    let isCancelled = false; // Избегаем гонки проммисов
    const controller = new AbortController();

    if (cache.has(url)) {
      const cached = cache.get(url)!;
      setPosts(cached.data);
      setTotalPosts(cached.total); // Сохраняю количество страниц для рендора пагинации при возврате с поста. 
      setIsLoading(false);
      setError(null);
    } else {
      const fetchPosts = async () => {
        setIsLoading(true);
        try {
          const response = await fetcher({ url, signal: controller.signal });
          const totalPageHeader = response.headers.get('x-total-count'); // Получаю количество всех страниц
          const data: TPost[] = await response.json();
          const total = totalPageHeader ? parseInt(totalPageHeader, 10) : 0;

          if (!isCancelled) {
            cache.set(url, { data, total });
            setPosts(data);
            if (total) {
              setTotalPosts(total)
            };
            setError(null);
          }
        } catch (err) {
          if (!isCancelled) {
            setError(err instanceof Error ? err.message : 'Ошибка');
          }
        } finally {
          if (!isCancelled) setIsLoading(false);
        }
      };

      fetchPosts();
    }

    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [page]);

  return { posts, totalPosts, isLoading, error };
};
