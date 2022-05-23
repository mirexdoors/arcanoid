import { GET_ME, LOGIN, LOGOUT } from '@/store/action.types';
import { SET_AUTH, SET_USER } from '@/store/mutation.types';
import User from '@/store/models/UserModel';

export default {
  namespaced: true,
  state: {
    user: {
      id: 0,
      login: '',
    } as User,
    isLogged: false,
  },
  actions: {
    /* async [LOGIN]() {},

    async [GET_ME]() {},

    [LOGOUT]() {} */
  },

  mutations: {
    [SET_AUTH](state, payload: boolean) {
      state.isLoggedIn = payload;
    },
    [SET_USER](state, payload: User) {
      state.user = payload;
    },
  },
  getters: {
    isLogged(state): boolean {
      return state.isLogged;
    },
    getUser(state): User {
      return state.user;
    },
  },
};
