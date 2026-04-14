import { renderHook, waitFor } from "@testing-library/react";
import { getPostByIdUrl, getPostsUrl, POSTS_PER_PAGE } from "./libs/api";
import { useGetPosts } from "./pages/MainPage/api/useGetPosts";
import { useGetPost } from "./pages/PostPage/api/useGetPost";

type TPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type TMockResponse = Pick<Response, "ok" | "json" | "headers">;

const createPosts = (page: number): TPost[] =>
  Array.from({ length: POSTS_PER_PAGE }, (_, index) => {
    const id = (page - 1) * POSTS_PER_PAGE + index + 1;
    return {
      id,
      userId: 1,
      title: `Post ${id}`,
      body: `Body ${id}`,
    };
  });

const createResponse = (payload: TPost[] | TPost): TMockResponse => ({
  ok: true,
  json: async () => payload,
  headers: {
    get: (name: string) => (name.toLowerCase() === "x-total-count" ? "100" : null),
  } as Headers,
});

const mockFetch = jest.fn<Promise<Response>, [RequestInfo | URL, RequestInit?]>();

beforeEach(() => {
  mockFetch.mockImplementation(async (input) => {
    const requestUrl = String(input);

    if (requestUrl.includes("_page=2")) {
      return createResponse(createPosts(2)) as Response;
    }

    const postByIdMatch = requestUrl.match(/posts\/(\d+)$/);
    if (postByIdMatch) {
      const id = Number(postByIdMatch[1]);
      return createResponse({
        id,
        userId: 1,
        title: `Post ${id}`,
        body: `Body ${id}`,
      }) as Response;
    }

    return createResponse(createPosts(1)) as Response;
  });

  global.fetch = mockFetch as unknown as typeof fetch;
});

afterEach(() => {
  mockFetch.mockReset();
});

describe("API utils", () => {
  it("builds url for posts list with page and limit", () => {
    expect(getPostsUrl(2, POSTS_PER_PAGE)).toBe("posts?_limit=10&_page=2");
  });

  it("builds url for single post", () => {
    expect(getPostByIdUrl("15")).toBe("posts/15");
  });
});

describe("Data hooks", () => {
  it("loads a list of 10 posts for selected page", async () => {
    const { result } = renderHook(() => useGetPosts(1));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.posts).toHaveLength(10);
    expect(result.current.totalPosts).toBe(100);
    expect(result.current.error).toBeNull();
  });

  it("caches single post and does not refetch same id", async () => {
    const firstRender = renderHook(() => useGetPost("1"));
    await waitFor(() => expect(firstRender.result.current.isLoading).toBe(false));
    firstRender.unmount();

    const secondRender = renderHook(() => useGetPost("1"));
    await waitFor(() => expect(secondRender.result.current.isLoading).toBe(false));
    secondRender.unmount();

    const postCalls = mockFetch.mock.calls.filter(([input]) => String(input).endsWith("/posts/1"));
    expect(postCalls).toHaveLength(1);
  });
});
