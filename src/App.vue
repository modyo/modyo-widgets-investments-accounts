<template>
  <div class="accounts-app py-lg-5">
    <div
      v-if="isLoading"
      class="loading">
      <div
        class="spinner-border"
        role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div
      v-else
      class="accounts__container container-lg p-0">
      <div class="d-block d-lg-none p-lg-4 px-4 pt-4 pb-3">
        <multiselect
          v-model="activeAccount"
          :options="accounts"
          :multiple="false"
          :group-select="false"
          track-by="name"
          label="name"
          :searchable="false"
          select-label=""
          deselect-label=""
          selected-label=""
          :allow-empty="false" />
      </div>
      <ul class="accounts__nav nav d-none d-lg-flex">
        <li
          v-for="account in accounts"
          :key="account.id"
          class="nav-item">
          <a
            :class="{active: activeAccount.id == account.id}"
            href="#"
            class="nav-link px-5 py-3"
            @click.prevent="setActiveAccount(account)">{{ account.name }}</a>
        </li>
      </ul>
      <div>
        <div
          v-if="!showPanel"
          class="row no-gutters h-100">
          <div
            class="col-lg-4 d-lg-block"
            :class="!config && !statements ? false : 'd-none'">
            <summary-resume
              :account="activeAccount"
              @statements="openStatementsPanel()"
              @config="openConfigPanel()"
              @goto="goToSlide" />
          </div>
          <div class="col-lg-8 accounts__investsments-summary">
            <investments-summary
              v-if="!config && !statements"
              class="d-none d-lg-block"
              :account="activeAccount"
              :indicators="indicators"
              @goto="goToSlide" />
            <transition name="slide">
              <settings-panel
                v-if="config === true"
                key="config"
                :account="activeAccount"
                @closepanel="closePanel()" />
              <statements-panel
                v-if="statements === true"
                key="statements"
                :account-id="activeAccount.id"
                @closestatementspanel="closeStatementsPanel()" />
            </transition>
          </div>
        </div>
        <div v-if="showPanel">
          <keep-alive>
            <component
              :is="activeSlide"
              :account="activeAccount"
              :investment-type="investmentType"
              @change-investment-type="changeInvestmentType" />
          </keep-alive>
        </div>
      </div>
    </div>
    <investment-modal />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { getURLParams } from '@modyo/financial-commons';

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
    Multiselect,
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
      this.$store.commit('SET_CURRENT_PAGE', 'settings');
    },
    closePanel() {
      this.config = false;
    },
    openStatementsPanel() {
      this.config = false;
      this.statements = true;
      this.$store.commit('SET_CURRENT_PAGE', 'statements');
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
      this.$store.commit('SET_CURRENT_PAGE', slug);
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
@import "./scss/custom.scss";

.accounts-app {
  min-height: 100%;

  background-color: #fff;
}

@media (min-width: 992px) {
  .accounts-app {
    min-height: auto;

    background-color: transparent;
  }

  .accounts__container {
    background-color: #fff;
  }

  .accounts__nav {
    border-bottom: 1px solid $gray-300;

    .nav-item {
      .nav-link {
        &.active {
          background-color: $primary-10;
          border-bottom: 4px solid $primary;
        }
      }
    }
  }

  .accounts__investsments-summary {
    background-color: $tertiary-20;
  }
}
</style>
