import {InjectionKey} from 'vue'
import {createStore, Store, useStore as baseUseStore} from 'vuex'
import User from '@/store/models/UserModel';
import {GET_ME, LOGIN} from '@/store/action.types';
import {SET_AUTH, SET_USER} from '@/store/mutation.types';
import JwtService from "@/services/jwt.service";
import {createResources} from "@/common/helpers";


const $jwt = JwtService;
const $api = createResources();

export interface State {
  isLogged: boolean
  user: User,
}

export const key: InjectionKey<Store<State>> = Symbol('store');

export const store = createStore<State>({
  state: {
    isLogged: false,
    user: {
      id: 0,
      login: ''
    },
  },
  actions: {
    async [LOGIN]() {
      console.log('login');
    },

    async [GET_ME]({commit}) {
      try {
        const userData = await $api.auth.getMe();
        commit(SET_AUTH, true);
        commit(SET_USER, userData);
      } catch (e) {
        $jwt.destroyToken();
      }
    },

    /*
    [LOGOUT]() {} */
  },
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}
