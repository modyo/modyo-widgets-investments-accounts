/* eslint-disable no-useless-catch */
import axios from 'axios';

const LANG = window.liquid ? window.liquid.lang : 'es-CL';

const BASE_URL = LANG === 'es-CL' ? 'https://api-bank.herokuapp.com' : 'https://dynamic-bank-api.herokuapp.com';

export default {
  async GET_ACCOUNTS(context) {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/AccountDetail`);
      context.commit('SET_ACCOUNTS', response.data.data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async GET_ACCOUNT_MOVEMENTS(context, payload) {
    try {
      const movements = await axios.get(`${BASE_URL}/api/v1/AccountMovements`, {
        params: {
          id: payload.id,
          fromDate: payload.fromDate,
          toDate: payload.toDate,
          filter: payload.filter,
          filters: payload.filters,
        },
      });
      return movements.data;
    } catch (error) {
      throw error;
    }
  },

  async GET_ACCOUNT_STATEMENTS(context, payload) {
    try {
      const statements = await axios.get(`${BASE_URL}/api/v1/AccountStatement`, {
        params: {
          id: payload.id,
        },
      });
      return statements.data;
    } catch (error) {
      throw error;
    }
  },

  async GET_INDICATORS(context) {
    try {
      const indicators = await axios.get('https://mindicador.cl/api');
      context.commit('SET_INDICATORS', indicators.data);
      return indicators;
    } catch (error) {
      throw error;
    }
  },
};
