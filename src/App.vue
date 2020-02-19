<template>
  <div class="accounts-app py-4">
    <div
      v-if="isLoading"
      class="loading">
      <div class="loading-ico" />
    </div>
    <div
      v-else
      class="container">
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
          :class="config === true ? 'no-transform' : '' || statements === true ? 'no-transform' : ''"
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
          :class="showPanel ? 'active' : ''"
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

<style lang="scss">
.ml-05 {
  margin-left: .5rem;
}
.wrapper-slider {
  position: relative;

  overflow: hidden;
}
.accounts-app .tabs-top .nav-tabs-line {
  margin-bottom: 3px;

  background: rgba(255,255,255,.5);
}
.accounts-app .tabs-top .nav-tabs-line .nav-link {
  margin-bottom: -3px;

  border-top: 0;
  border-bottom: 3px solid #ECF0F4;
}
.accounts-app .tabs-top .nav-tabs-line .nav-link.active {
  border-color: #A9D446;
}

.accounts-tabs {
  .nav-link {
    padding: 1rem 2rem;

    color: #333;
  }
}

.graphic-comparison > div:first-child {
  border-radius: .25rem 0 0 .25rem;
}

.graphic-comparison > div:last-child {
  border-radius: 0 .25rem .25rem 0;
}

.list-funds > a {
  position: relative;
}

.list-funds > a:before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;

  width: 5px;
  height: auto;

  content: '';
}

.list-funds > a.list-stocks:before {
  background: #02ADE6;
}

.list-funds > a.list-mutual-funds:before {
  background: #094279;
}

.list-funds > a.list-investment-funds:before {
  background: #A9D446;
}

.empty-movements {
  display: flex;

  height: 100%;

  justify-content: center;
  align-items: center;
}

.graphic-comparison {
  color: #FFF;
}

.graphic-comparison .stocks {
  background: #02ADE6;
}

.graphic-comparison .mutual-funds {
  background: #094279;
}

.graphic-comparison .investment-funds {
  background: #A9D446;
}

.accounts-app {
  background: #ECF0F4;
}

.accounts-body {
  background: none;
}

.accounts-sidebar {
  position: relative;
  z-index: 2;

  height: 100%;

  background: #FFF;
}

.swich-component {
  display: flex;
  flex-direction: column;

  height: 100%;
}

.movements-investments {
  position: absolute;
  z-index: 999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  transition: all .2s ease-in-out;
  -webkit-transform: translateX(100%);
          transform: translateX(100%);

  background: #FFF;
}

.movements-investments.active {
  -webkit-transform: translateX(0);
          transform: translateX(0);
}

.wrap-sidebar-movements {
  height: 100%;
  // overflow: auto;
}

.sidebar-resume-header {
  border-bottom: 1px solid #EEE;
}

.total-amount {
  border-bottom: 1px solid #EEE;
}

.accounts-main {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
      flex-direction: column;

  height: 100%;
  margin-left: 3px;

  background: #F7F9FB;

  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
}

.empty-amount {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

  text-align: center;

  -webkit-box-flex: 1;
  -ms-flex: 1;
      flex: 1;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.header-nav {
  padding: 1rem;

  border-bottom: 1px solid #EEE;
  background: #FFF;
}

.accounts-main {
  .table-flex {
    background: none;
    .accordion-light {
      background: #FFF;
    }
  }
}

.accounts-sidebar {
  .flex-column .nav-link.active,
  .flex-column .nav-link.active:hover {
    color: #FFF;
    background: #02ADE6;
  }
}

.config-account {
  position: absolute;
  top: 0;
  left: 3px;

  width: 100%;
  height: 100%;

  background: #FBFBFB;
}

.statements {
  position: absolute;
  top: 0;
  left: 3px;

  width: 100%;
  height: 100%;

  background: #FBFBFB;
}

.slide-enter {
  -webkit-transform: translateX(100%);
          transform: translateX(100%);
}

.slide-enter-to {
  -webkit-transform: translateX(0);
          transform: translateX(0);
}

.slide-enter-active {
  position: absolute;
}

.slide-leave {
  -webkit-transform: translateX(0);
          transform: translateX(0);
}

.slide-leave-to {
  -webkit-transform: translateX(100%);
          transform: translateX(100%);
}

.slide-enter-active,
.slide-leave-active {
  -webkit-transition: all 250ms ease-in-out;
          transition: all 250ms ease-in-out;
}

.summary-period {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  left: 1rem;
}

.inner-summary-period {
  position: absolute;
  right: 0;
  bottom: 100%;
  left: 0;

  margin-top: .25rem;
}

.inner-summary-period > a {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

  padding: 1rem;

  text-decoration: none;

  color: #FFF;
  background: #02ADE6;

  align-items: center;
}

.inner-summary-period__icon {
  position: absolute;
  right: 20px;
}

.accounts-main {
  .list-group-item {
    margin-bottom: 2px;

    border: 0;
  }
  a.list-group-item:hover {
    background: #DEEAEF;
  }
}

.panel-summary-period {
  border: 1px solid #EEE;
  background: #FFF;
}

.summary-period.active .inner-summary-period {
  position: relative;

  border: 1px solid #DDD;
}
.summary-period.active .inner-summary-period:after {
  position: absolute;
  top: -20px;
  right: -1px;
  left: -1px;

  height: 20px;

  content: '';

  opacity: .15;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
}

.mask-table-flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
      flex-direction: column;

  height: 100%;

  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
}

.sidebar-resume-header {
  position: relative;
}

.sidebar-resume-header a {
  font-size: 21px;

  position: absolute;
  top: 8px;
  right: 1.5rem;

  color: #FFF;
}

.mask-table-flex .table-flex {
  overflow: auto;
  // height: 0;

  max-height: 480px;
  margin-bottom: 60px;
  // flex: 1;
}

.global-price {
  font-weight: bold;
}

.table-scroll-body {
  display: flex;
  flex-direction: column;

  height: 100%;
  min-height: 500px;
}
.table-scroll-body .tbody-flex {
  overflow: auto;

  flex: 1 auto;
}

.row-investments {
  flex: 1 auto;
}
.row-movements {
  flex: 1 auto;
}


/* STATEMENTS */

.mask-statements {
  display: flex;
  flex-direction: column;

  height: 100%;
}
.table-statements {
  overflow: auto;

  flex: 1 auto;
}

.swich-component .tfooter-flex {
  border-top: 2px solid #A9D446;
  background: #FFF;
}
.swich-component .accordion-light > .tr-flex.collapsed {
  margin-bottom: 3px;

  border-bottom: 0;
}

.swich-component .tr-flex {
  border: 0;
  &:hover {
    background: #DEEAEF;
  }
}
.swich-component {
  .accordion-light .collapse.show,
  .accordion-light .collapsing {
    margin-bottom: 1rem;

    border: 0;
  }
}

.custom-control {
  position: relative;

  display: block;

  min-height: 1.4rem;
  padding-right: 20px;
}

.custom-checkbox .custom-control-label::before {
  position: absolute;
  z-index: 2;
  top: 2px;
  left: 2px;

  display: block;

  width: 18px;
  height: 18px;

  content: '';
  user-select: none;
  transition: all .2s ease-in-out;
  pointer-events: none;

  border-radius: 50% !important;
  background: none;
  background: rgba(255,255,255,.6);
}

.custom-checkbox .custom-control-label::after {
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 2.4rem;
  height: 1.4rem;

  content: '';

  border-radius: 2rem;
  background: #D4D4D4;
}
.custom-checkbox .custom-control-label:hover {
  cursor: pointer;
}
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::after {
  background: #02ADE6;
  background-image: none !important;
}
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
  left: 18px;

  background: #FFF;
}
@media (max-width: 767px) {
  .resume-main {
    display: none;
  }

  .accounts-app {
    height: calc(100vh - 50px);
    > .container {
      display: flex;
      flex-direction: column;

      height: 100%;
      margin: 0;
      padding: 0;
    }
    .mask-table-flex .table-flex {
      margin-bottom: 0;
    }
    .accounts-body {
      flex: 1;
      > div {
        height: 100%;
        > div {
          height: 100% !important;
          max-height: 100%;
        }
      }
    }
  }

  .accounts-sidebar-movements {
    position: absolute;
    top: 1rem;
    right: 1rem;
    left: 1rem;

    box-shadow: 0 0 1000px 100px #000;
  }

  .accounts-sidebar-movements.active {
    border-bottom: 1px solid #EEE;
    background: #F9F9F9;
  }

  .panel-summary-period .td-flex {
    padding: .25em;

    justify-content: flex-start;
  }

  .row-investments {
    flex: 0 auto;
  }

  .row-movements {
    flex-direction: column;
  }
  .row-movements .col-md-8 {
    flex: 1 auto;
  }
  .row-movements .mask-table-flex {
    height: 100%;
  }
  .row-movements .mask-table-flex .table-flex {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: block;
    overflow: auto;

    margin-bottom: 70px;
  }
  .movements-investments {
    top: 15px;
  }

  .table-scroll-body {
    min-height: 1px;
  }

  .wrapper-slider {
    display: flex;
    flex-direction: column;

    height: 100%;
  }

  .accounts-tabs {
    margin-top: -1.5rem;
  }
  .accounts-tabs .dropdown-nav {
    min-height: 54px;
  }
  .accounts-tabs .dropdown-nav-trigger {
    padding: 12px;
  }
  .accounts-tabs .dropdown-nav.active {
    margin-bottom: 4rem;
    padding-top: 54px;
  }
  .accounts-tabs .nav-tabs-line .nav-link {
    padding: .5rem 1rem;

    color: #333;
    background: #FFF;
  }
  .accounts-tabs .nav-tabs-line li {
    border-bottom: 1px solid #DDD;
  }
  .accounts-tabs .nav-tabs-line .nav-link.active {
    color: #FFF;
    border-radius: 0;
    background: #094279;
  }
  .mask-table-flex {
    display: block;
  }
  .mask-table-flex .table-flex {
    overflow: visible;

    height: auto;
  }
  .accounts-main {
    border-top: 1px solid #DDD;
  }
  .accounts-sidebar {
    height: auto;
    min-height: 0;

    border: 0;
  }
  .accounts-sidebar-movements {
    display: none;
  }
  .accounts-sidebar-movements.active {
    display: block;
  }
  .filers-bar {
    border-bottom: 1px solid #DDD;
    background: #F9F9F9;
    -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, .1);
            box-shadow: 0 2px 0 rgba(0, 0, 0, .1);
  }
  .accounts-body {
    margin-top: 15px;

    background: #FFF;
  }
  .back-breadcrumb {
    font-size: 11px;

    display: block;

    margin: -1rem;
    padding: 17px 10px;

    text-transform: uppercase;

    background: #F4F4F4;
  }
  .back-breadcrumb i:before {
    -webkit-transform: scale(2);
            transform: scale(2);
  }
  .sidebar-accounts-investments {
    min-height: 0;
  }
  .config-account,
  .statements {
    position: fixed;
    z-index: 10;
    right: 0;
    left: 0;

    overflow: auto;

    width: 100vw;

    -webkit-box-shadow: 0 0 1000px 500px rgba(0, 0, 0, .2);
            box-shadow: 0 0 1000px 500px rgba(0, 0, 0, .2);
  }

  .accounts-app {
    background: none;
  }
  .accounts-tabs {
    margin-bottom: -15px;
    padding: 1rem;

    color: #FFF;
    background: none;
    background: #02ADE6;
  }
  .accounts-tabs select {
    color: #FFF;
    border-color: #FFF;
    background: none;
  }
  .total-amount {
    color: #FFF;
    background: -webkit-gradient(linear, left top, left bottom, from(#02ADE6), to(#01BDC6));
    background: linear-gradient(to bottom, #02ADE6 0%, #01BDC6 100%);
  }
  .total-amount h3 {
    font-size: 2.5rem;
  }
  .total-amount .light {
    display: none;
  }
  .total-amount p {
    opacity: .7;
  }
  .actions-resume-body {
    background: #FFF;
  }
  .sidebar-resume-header {
    color: #FFF;
    background: #02ADE6;
  }
  .sidebar-resume-header {
    text-align: center;

    border: 0;
  }
  .sidebar-resume-header p {
    display: none;
  }
  .sidebar-resume-header h4 {
    font-size: 12px;

    text-transform: uppercase;

    opacity: .8;
  }
  .font-mini {
    font-size: 10px;

    text-transform: uppercase;

    opacity: .7;
  }
  .tfooter-flex .td-flex {
    padding-right: .5rem;
    padding-left: .5rem;
  }
  .item-investment-row .table-inner {
    padding: 0;
  }
  .item-investment-row .table-inner .td-flex {
    padding-right: .5rem;
    padding-left: .5rem;
  }
  .table-detail {
    width: 1000px;
  }
  .modal-body {
    overflow: auto;
  }
  .table-inner.table-mobile-block {
        flex-direction: column;

    padding: 1rem;

    text-align: right;

    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
  }
  .table-inner.table-mobile-block > .col {
    padding: .5rem;

    border-bottom: 1px solid #EEE;

    -webkit-box-flex: 1;
    -ms-flex: auto;
        flex: auto;
  }
  .table-inner.table-mobile-block .tr-flex {
        flex-direction: column;

    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
  }
  .table-inner.table-mobile-block .td-flex {
    border-bottom: 1px solid #EEE;

    -webkit-box-flex: 1;
    -ms-flex: auto;
        flex: auto;
  }
  .table-inner.table-mobile-block .td-flex:first-child {
    border-bottom: 0;
  }
  .table-inner.table-mobile-block .td-flex p {
    font-weight: bold;
  }
  .table-sm-block thead {
    display: none;
  }
  .table-sm-block .tfooter {
    display: none;
  }
  .global-price {
    font-weight: normal;
  }
}

.loading {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

  min-height: 400px;

  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.loading-ico {
  position: relative;

  width: 56px;
  height: 56px;

  border: 4px solid transparent;
  border-radius: 50%;
}

.loading-ico:before {
  position: absolute;
  top: -9.6px;
  left: -9.6px;

  width: 67.2px;
  height: 67.2px;

  content: '';
  -webkit-animation: loader-scale 1s ease-out infinite;
          animation: loader-scale 1s ease-out infinite;
  -webkit-animation-delay: 1s;
          animation-delay: 1s;

  opacity: 0;
  border: 4px solid rgba(0, 82, 236, .5);
  border-radius: 50%;
}

.loading-ico:after {
  position: absolute;
  top: -4px;
  left: -4px;

  width: 56px;
  height: 56px;

  content: '';
  -webkit-animation: loader-scale 1s ease-out infinite;
          animation: loader-scale 1s ease-out infinite;
  -webkit-animation-delay: .5s;
          animation-delay: .5s;

  border: 4px solid #0052EC;
  border-radius: 50%;
}

@-webkit-keyframes loader-scale {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);

    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);

    opacity: 0;
  }
}

@keyframes loader-scale {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);

    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);

    opacity: 0;
  }
}
/* TABLES */

.table {
  color: #647788;
}

.table thead th {
  border-top: 0;
}


/* table flex */
.table-flex {
  min-height: 150px;

  background: #FCFCFC;
}

.tr-flex {
  position: relative;

  display: flex;

  border-bottom: 1px solid #EEE;
}
.tr-flex.tr-row {
  padding-right: 20px;
}
.tr-flex:hover {
  text-decoration: none;

  color: #666;
  background: #F9F9F9;
}
.td-l-auto {
  margin-left: auto;
}
.td-flex {
  line-height: 1.4;

  padding: 1rem;

  color: #647788;
}
.tr-header-row {
  padding: .7rem 0;
  padding-right: 35px;

  border-bottom: 2px solid #EEE;
}

.table-inner {
  padding: 1rem;
}
.table-inner .td-flex {
  padding: .5rem 1.5rem;
}
.tfooter-flex {
  border-top: 2px solid #A9D446;
  background: #F4F4F4;;
}
.tfooter-flex .td-flex {
  padding: .5rem 1.5rem;
}

.table-invert {
  color: #FFF;
}
.table-inver thead {
  background: rgba(0,0,0,.05);
}
.table-invert thead th {
  border-color: rgba(255,255,255,.1);
}
.table-invert td,
.table-invert th {
  border-color: rgba(255,255,255,.1);
}

</style>
