export async function fetchApiData<T = unknown>(url = 'https://jsonplaceholder.typicode.com/posts/1'): Promise<T> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error en la respuesta del API: ${response.status}`);
        }
        return (await response.json()) as T;
    } catch (error) {
        console.error('Error fetching API:', error);
        throw error;
    }
}