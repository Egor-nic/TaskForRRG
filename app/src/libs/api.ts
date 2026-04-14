//Для переменных лучше использовать ENV, в рамках данного проекта использовал отдельный файл.

export const API_BASE_URL = "https://jsonplaceholder.typicode.com/";
export const POSTS_ENDPOINT = "posts";
export const POSTS_PER_PAGE = 10;

export const getPostByIdUrl = (id: string): string => `${POSTS_ENDPOINT}/${id}`;

export const getPostsUrl = (page: number, limit: number = POSTS_PER_PAGE): string => {
  const params = new URLSearchParams({
    _limit: String(limit),
    _page: String(page),
  });

  return `${POSTS_ENDPOINT}?${params.toString()}`;
};
