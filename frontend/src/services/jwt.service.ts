const TOKEN_KEY = "token";

export const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY);
};

// метод для сохранения токена по ключу в LocalStorage
export const saveToken = (token: string) => {
  window.localStorage.setItem(TOKEN_KEY, token);
};
// метод для удаления токена по ключу из LocalStorage
export const destroyToken = () => {
  window.localStorage.removeItem(TOKEN_KEY);
};

// экспортируем сервис как объект с 3-мя методами
export default { getToken, saveToken, destroyToken };
