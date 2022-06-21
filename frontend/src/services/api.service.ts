import axiosInstance from '@/plugins/axios';
import JwtService from '@/services/jwt.service';

class BaseApiService {}

export class ReadOnlyApiService extends BaseApiService {
  #resource;

  constructor (resource: any) {
    super();
    this.#resource = resource;
  }

  // запрос на получение списка сущностей
  async query (config = {}) {
    const { data } = await axiosInstance.get(this.#resource, config);
    return data;
  }

  // запрос на получение одной сущности по id
  async get (id: number, config = {}) {
    const { data } = await axiosInstance.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor (resource: any) {
    super(resource);
    this.#resource = resource;
  }

  // запрос на создание сущности
  async post (entity: any) {
    const { data } = await axiosInstance.post(this.#resource, entity);
    return data;
  }

  // запрос на обновление сущности
  async put (entity: any) {
    const { data } = await axiosInstance.put(
      `${this.#resource}/${entity.id}`,
      entity
    );
    return data;
  }

  // запрос на удаление сущности
  async delete (id: number) {
    const { data } = await axiosInstance.delete(`${this.#resource}/${id}`);
    return data;
  }
}

export class AuthApiService extends BaseApiService {
  setAuthHeader () {
    const token = JwtService.getToken();
    axiosInstance.defaults.headers.common.Authorization = token
      ? `Bearer ${token}`
      : '';
  }

  // отправляем логин/пароль для авторизации на сервере
  async login (params: any) {
    const { data } = await axiosInstance.post('login', params);
    return data;
  }

  async logout () {
    const { data } = await axiosInstance.delete('logout');
    return data;
  }

  async getMe () {
    const { data } = await axiosInstance.get('whoAmI');
    return data;
  }
}
