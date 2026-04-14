
type TFetcher = {
    url: string,
}

// Обычно хранят в env файле, но в рамках этой задачи я объявил ее здесь
const BaseURL = 'https://jsonplaceholder.typicode.com/';

export async function fetcher({ url }: TFetcher) {
    const response = await fetch(`${BaseURL}${url}`);

    if (!response.ok) {
        throw new Error('Ошибка при загрузке данных');
    }

    return response;
};
