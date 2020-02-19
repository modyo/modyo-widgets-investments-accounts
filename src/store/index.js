import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    localCurrency: 'clp',
    accounts: [],
    modalData: null,
    indicators: {},
    showPanel: false,
  },
  mutations: {
    STOP_LOADING(state) {
      state.loading = false;
    },

    SET_ACCOUNTS(state, data) {
      state.accounts = data.accounts;
    },

    SET_MODAL_DATA(state, data) {
      state.modalData = data;
    },

    SET_INDICATORS(state, data) {
      state.indicators = data;
    },

    SET_SHOW_PANEL(state, data) {
      state.showPanel = data;
    },
  },
  actions: {
    GET_ACCOUNTS(context) {
      return new Promise(((resolve, reject) => {
        axios.get('https://api-bank.herokuapp.com/api/v1/AccountDetail')
          .then((response) => {
            context.commit('SET_ACCOUNTS', response.data.data);
            resolve(response.data.data);
          }, (err) => {
            reject(err.statusText);
          });
      }));
    },

    GET_INDICATORS(context) {
      return new Promise(((resolve, reject) => {
        axios.get('https://mindicador.cl/api')
          .then((response) => {
            context.commit('SET_INDICATORS', response.data);
            resolve(response.data.data);
          }, (err) => {
            reject(err.statusText);
          });
      }));
    },
  },
});
