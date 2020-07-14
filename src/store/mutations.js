export default {
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

  SET_CURRENT_PAGE(state, data) {
    state.currentPage = data;
  },
};
