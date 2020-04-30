import axios from 'axios';

const LANG = window.liquid ? window.liquid.lang : 'es-CL';

const BASE_URL = LANG === 'es-CL' ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';

export default {
  async GET_ACCOUNTS(context) {
    try {
      const accounts = await axios.get(`${BASE_URL}/api/v1/AccountDetail`);
      context.commit('SET_ACCOUNTS', accounts.data.data);
      return accounts;
    } catch (error) {
      return error;
    }
  },

  async GET_ACCOUNT_MOVEMENTS(context, payload) {
    try {
      const movements = await axios.get('https://modyo-investments-api.herokuapp.com/api/v1/AccountMovements', {
        headers: {
          'Accept-Language': LANG,
        },
        params: {
          id: payload.id,
          fromDate: payload.fromDate,
          toDate: payload.toDate,
          filter: payload.filter,
          filters: payload.filters ? payload.filters.join(',') : null,
        },
      });
      return movements;
    } catch (error) {
      return error;
    }
  },

  async GET_ACCOUNT_STATEMENTS(context, payload) {
    try {
      const movements = await axios.get(`${BASE_URL}/api/v1/AccountStatement`, {
        params: {
          id: payload.id,
        },
      });
      return movements;
    } catch (error) {
      return error;
    }
  },

  async GET_INDICATORS(context) {
    try {
      const indicators = await axios.get('https://mindicador.cl/api');
      context.commit('SET_INDICATORS', indicators.data);
      return indicators;
    } catch (error) {
      return error;
    }
  },
};
