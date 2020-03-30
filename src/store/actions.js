import axios from 'axios';

const BASE_URL = 'https://api-bank.herokuapp.com';

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
