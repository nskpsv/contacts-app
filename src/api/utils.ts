export const checkResponseError = (response: Response, cb: Function) => {
    if (!response.ok || response.status < 200 || response.status >= 300) {
        cb(`Ошибка сервера: ${response.statusText}`)
    }
}