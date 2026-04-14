import { useState, useEffect } from 'react';
import { fetcher } from '../../../libs/fetcher';
import { TPost } from '../types';


export const useGetPost = (id: string | undefined) => {

  const [post, setPost] = useState<TPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    if (id) {
      const fetchPosts = async () => {
        try {
          setIsLoading(true);
          const response = await fetcher({url: `posts/${id}`});

          if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
          }

          const data: TPost = await response.json();
          setPost(data);
          setError(null);

        } catch (err) {
          setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        } finally {
          setIsLoading(false);
        }
      };

      fetchPosts();
    } else {
        
    }
  }, [id]);

  return { post, isLoading, error };
};
