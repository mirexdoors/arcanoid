import { GET_ME, LOGIN, LOGOUT } from "@/store/action.types";
import { SET_AUTH, SET_USER } from "@/store/mutation.types";
export default {
    namespaced: true,
    state: {
        user: null,
        isLogged: false
    },
    actions: {
        async [LOGIN]({ dispatch }, credentials) { },
        async [GET_ME]({ commit }) { },
        [LOGOUT]({ commit }) { }
    },
    mutations: {
        [SET_AUTH](state, payload) {
            state.isLoggedIn = payload;
        },
        [SET_USER](state, payload) {
            state.user = payload;
        }
    },
    getters: {
        isLogged(state) {
            return state.isLogged;
        },
        getUser(state) {
            return state.user;
        },
    },
};
//# sourceMappingURL=auth.module.js.map