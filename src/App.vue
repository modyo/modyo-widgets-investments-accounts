<template>
  <div class="accounts-app py-4">
    <div
      v-if="isLoading"
      class="loading">
      <div class="loading-ico" />
    </div>
    <div
      v-else
      class="accounts__container container">
      <div class="tabs-top accounts-tabs">
        <div class="select-box d-block d-sm-none">
          <select
            id="account"
            v-model="activeAccount"
            class="form-control"
            name="account">
            <option
              v-for="account in accounts"
              :key="account.id"
              :value="account">
              {{ account.name }}
            </option>
          </select>
        </div>
        <ul class="nav nav-tabs-line d-none d-sm-flex">
          <li
            v-for="account in accounts"
            :key="account.id"
            class="nav-item">
            <a
              :class="{active: activeAccount.id == account.id}"
              href="#"
              class="nav-link"
              @click.prevent="setActiveAccount(account)">{{ account.name }}</a>
          </li>
        </ul>
      </div>
      <div class="wrapper-slider">
        <div
          :class="config || statements ? 'no-transform' : false"
          class="accounts-body">
          <div class="row no-gutters h-100">
            <div class="col-md-4">
              <summary-resume
                :account="activeAccount"
                @statements="openStatementsPanel()"
                @config="openConfigPanel()"
                @goto="goToSlide" />
            </div>
            <div class="col-md-8">
              <investments-summary
                :account="activeAccount"
                :indicators="indicators"
                @goto="goToSlide" />

              <transition name="slide">
                <div
                  v-if="config === true"
                  key="config"
                  class="config-account p-4 p-lg-5">
                  <settings-panel
                    :account="activeAccount"
                    @closepanel="closePanel()" />
                </div>
                <div
                  v-if="statements === true"
                  key="statements"
                  class="statements p-3 p-lg-5">
                  <statements-panel
                    :account-id="activeAccount.id"
                    @closestatementspanel="closeStatementsPanel()" />
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div
          v-if="showPanel"
          class="movements-investments">
          <keep-alive>
            <component
              :is="activeSlide"
              :account="activeAccount"
              :investment-type="investmentType"
              class="swich-component"
              @change-investment-type="changeInvestmentType" />
          </keep-alive>
        </div>
      </div>
    </div>
    <investment-modal />
  </div>
</template>

<script>

import { getURLParams } from './helpers';

import SummaryResume from './components/SummaryResume.vue';
import SettingsPanel from './components/SettingsPanel.vue';
import InvestmentsDetails from './components/InvestmentsDetails.vue';
import InvestmentsSummary from './components/InvestmentsSummary.vue';
import MovementsPanel from './components/MovementsPanel.vue';
import StatementsPanel from './components/StatementsPanel.vue';
import InvestmentModal from './components/InvestmentModal.vue';

export default {
  name: 'Accounts',
  components: {
    'summary-resume': SummaryResume,
    'settings-panel': SettingsPanel,
    'investments-details': InvestmentsDetails,
    'investments-summary': InvestmentsSummary,
    'investment-modal': InvestmentModal,
    'movements-panel': MovementsPanel,
    'statements-panel': StatementsPanel,
  },
  data() {
    return {
      isLoading: true,
      config: false,
      statements: false,
      activeAccount: {},
      activeSlide: 'investments-details',
      investmentType: 'stocks',
      paramAccountId: parseInt(getURLParams('account'), 10),
    };
  },
  computed: {
    localCurrency() {
      return this.$store.state.localCurrency;
    },
    accounts() {
      return this.$store.state.accounts;
    },
    indicators() {
      return this.$store.state.indicators;
    },
    showPanel() {
      return this.$store.state.showPanel;
    },
  },
  watch: {
    accounts() {
      if (this.paramAccountId) {
        this.activeAccount = this.accounts.find((account) => account.id === this.paramAccountId);
      } else {
        [this.activeAccount] = this.accounts;
      }
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    openConfigPanel() {
      this.config = true;
      this.statements = false;
    },
    closePanel() {
      this.config = false;
    },
    openStatementsPanel() {
      this.config = false;
      this.statements = true;
    },
    closeStatementsPanel() {
      this.statements = false;
    },
    goToSlide(slide, slug) {
      if (slide === 'investments') {
        this.activeSlide = 'investments-details';
        if (slug) {
          this.investmentType = slug;
        } else {
          this.investmentType = 'stocks';
        }
      } else if (slide === 'movements') {
        this.activeSlide = 'movements-panel';
      }
      this.$store.commit('SET_SHOW_PANEL', true);
    },
    setActiveAccount(account) {
      this.activeAccount = account;
    },
    changeInvestmentType(value) {
      this.investmentType = value;
    },
    fetchData() {
      const vm = this;
      this.isLoading = true;
      this.$store.dispatch('GET_ACCOUNTS')
        .then(() => {
          vm.isLoading = false;
        });
      this.$store.dispatch('GET_INDICATORS');
    },
  },
};
</script>

<style lang="scss" scoped>
@media (min-width: 992px) {
  .accounts__container {
    background-color: white;
  }
}
</style>
