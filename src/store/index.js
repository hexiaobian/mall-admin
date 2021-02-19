import Vue from 'vue';
import Vuex from 'vuex';
import {
  setUserCookie,
  getUserCookie,
  removeUserCookie
} from '../utils/userCookie'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //折叠
    collapsed: false,
    //用户信息
    user: getUserCookie(),
    //菜单栏
    menuList: []
  },
  mutations: {
    toggleCollapsed(state) {
      state.collapsed = !state.collapsed
    },
    setUserInfo(state, userInfo) {
      state.user = userInfo
    },
    logout(state) {
      state.user = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      }
    },
    getMenuList(state, routes) {
      state.menuList = routes
    }
  },
  actions: {
    toggleCollapsed({
      commit
    }) {
      commit("toggleCollapsed")
    },
    setUserInfo({
      commit
    }, userInfo) {
      commit('setUserInfo', userInfo)
      setUserCookie(userInfo)
    },
    logout({
      commit
    }) {
      commit('logout')
      removeUserCookie()
    },
    getMenuList({
      commit
    }, routes) {
      commit('getMenuList', routes)
    }
  },
  modules: {

  },
});
