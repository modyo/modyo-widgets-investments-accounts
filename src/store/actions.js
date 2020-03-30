import axios from 'axios';

const LANG = window.liquid.lang;

const BASE_URL = LANG === 'es-CL' ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';

export default {
  GET_ACCOUNTS(context) {
    return new Promise(((resolve, reject) => {
      axios.get(`${BASE_URL}/api/v1/AccountDetail`)
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
};
