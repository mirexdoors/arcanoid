import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import IUser from '@/store/models/UserModel';
import { GET_ME, LOGIN } from '@/store/action.types';
import { SET_AUTH, SET_USER } from '@/store/mutation.types';
import JwtService from '@/services/jwt.service';
import { createResources } from '@/common/helpers';
import ICredentials from '@/store/models/Credentials.model';

const $jwt = JwtService;
const $api = createResources();

export interface State {
  isLogged: boolean
  user: IUser,
}

export const key: InjectionKey<Store<State>> = Symbol('store');

export const store = createStore<State>({
  state: {
    isLogged: false,
    user: {
      id: 0,
      login: '',
      name: ''
    }
  },
  actions: {
    async [LOGIN] ({ dispatch }, credentials: ICredentials) {
      try {
        const loginData = await $api.auth.login(credentials);

        if (loginData?.token) {
          $jwt.saveToken(loginData.token);
          $api.auth.setAuthHeader();
          dispatch(GET_ME);
        } else {
          console.error('Токен не получен');
        }
      } catch (e) {
        console.error(e);
      }
    },

    async [GET_ME] ({ commit }) {
      try {
        const userData = await $api.auth.getMe();
        commit(SET_AUTH, true);
        commit(SET_USER, userData);
      } catch (e) {
        $jwt.destroyToken();
      }
    }

    /*
    [LOGOUT]() {} */
  },

  mutations: {

  }
});

// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key);
}
