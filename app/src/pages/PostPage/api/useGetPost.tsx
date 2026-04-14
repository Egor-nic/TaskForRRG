import { useState, useEffect } from 'react';
import { fetcher } from '../../../libs/fetcher';
import { TPost } from '../types';
import { getPostByIdUrl } from '../../../libs/api';

const cache = new Map<string, TPost>();

export const useGetPost = (id: string | undefined) => {

  const [post, setPost] = useState<TPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Некорректный id поста");
      setIsLoading(false);
      return;
    }

    let isCancelled = false;
    const controller = new AbortController(); // Использую AbortController для показа знакомства с данной технологией
    const url = getPostByIdUrl(id);

    if (cache.has(url)) {
      setPost(cache.get(url)!);
      setError(null);
      setIsLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetcher({ url, signal: controller.signal });
        const data: TPost = await response.json();

        if (!isCancelled) {
          cache.set(url, data);
          setPost(data);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [id]);

  return { post, isLoading, error };
};
