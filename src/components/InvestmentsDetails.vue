<template>
  <div>
    <div class="header-nav d-flex">
      <a
        href="#"
        class="back-breadcrumb light mr-3"
        @click.prevent="closePanel">
        <font-awesome-icon
          icon="chevron-left" /> Volver</a>
      <h4 class="mb-0">
        {{ $t('investment-details.title') }}
      </h4>
    </div>
    <div class="row no-gutters row-investments p-3 p-sm-0">
      <div class="col-md-3">
        <div class="accounts-sidebar sidebar-accounts-investments">
          <div class="select-box d-block d-sm-none mb-3">
            <select
              id="investments"
              class="form-control"
              name=""
              @change="changeActiveProduct($event.target.value)">
              <option
                v-for="product in products"
                :key="product.id"
                :value="product.slug"
                :selected="investmentType === product.slug">
                {{ product.name }}
              </option>
            </select>
          </div>
          <ul class="nav flex-column d-none d-sm-flex">
            <li
              v-for="product in products"
              :key="product.id"
              class="nav-item">
              <a
                :class="{active: investmentType == product.slug}"
                class="nav-link"
                @click="changeActiveProduct(product.slug)">{{ product.name }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-9">
        <div class="accounts-main p-lg-3">
          <div class="table-flex table-scroll-body">
            <div class="row no-gutters tr-header-row d-none d-sm-flex">
              <div class="col-md-3" />
              <div
                v-if="investmentType === 'stocks'"
                class="col-md-2 text-right">
                <strong>{{ $t('investment-details.stock') }}</strong>
              </div>
              <div
                v-if="investmentType === 'mutual-funds'"
                class="col-md-2 text-right">
                <strong>{{ $t('investment-details.fees') }}</strong>
              </div>
              <div class="col-md-2 text-right">
                <strong>{{ $t('investment-details.rentability') }}</strong>
              </div>
              <div class="col-md-3 text-right">
                <strong>{{ $t('investment-details.current-investment') }}</strong>
              </div>
              <div class="col-md-2 text-right">
                <strong>{{ $t('investment-details.distribution') }}</strong>
              </div>
            </div>
            <div
              class="row no-gutters tr-header-row d-flex d-sm-none"
              style="padding-right: 40px">
              <div class="col" />
              <div
                v-if="investmentType === 'stocks'"
                class="col text-right">
                <strong>{{ $t('investment-details.stock') }}</strong>
              </div>
              <div
                v-if="investmentType === 'mutual-funds'"
                class="col text-right">
                <strong>{{ $t('investment-details.fees') }}</strong>
              </div>
              <div class="col text-right">
                <strong>{{ $t('investment-details.distribution') }}</strong>
              </div>
            </div>

            <div class="tbody-flex">
              <div
                id="investments-accordion"
                role="tablist">
                <investment-item
                  v-for="item in activeProduct.elements"
                  :key="item.id"
                  :item="item" />
              </div>
            </div>
            <div class="tfooter-flex">
              <div class="tr-flex align-items-center">
                <div class="col-md-4 td-flex d-none d-sm-flex">
                  <h4 class="mb-0">
                    {{ $t('investment-details.summary') }}
                  </h4>
                </div>
                <div class="col col-md-3 td-flex ml-auto text-right">
                  <strong class="d-block">{{ activeProduct.amountTotalReturn.valueString }}</strong>
                  <small>{{ $t('investment-details.utility-total-loss') }}</small>
                </div>
                <div class="col col-md-3 td-flex text-right">
                  <p class="mb-0">
                    {{ activeProduct.amount.valueString }}
                  </p>
                  <small>{{ $t('investment-details.total-current-investment') }}</small>
                </div>
                <div class="col col-md-2 td-flex text-right">
                  {{ activeProduct.amount.percentageString }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import InvestmentItem from './InvestmentItem.vue';

export default {

  name: 'InvestmentsDetails',

  components: {
    'investment-item': InvestmentItem,
  },
  props: {
    account: {
      type: Object,
      required: true,
    },
    investmentType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      activeProduct: {},
    };
  },
  computed: {
    localCurrency() {
      return this.$store.state.localCurrency;
    },
    products() {
      return this.account.products.filter(product => product.name !== 'Caja');
    },
    currencies() {
      return this.account.currencies;
    },
  },
  watch: {
    products: {
      handler: 'setActiveProduct',
      immediate: true,
    },
    investmentType() {
      this.setActiveProduct();
    },
  },
  methods: {
    changeActiveProduct(value) {
      this.$emit('change-investment-type', value);
    },
    setActiveProduct() {
      this.activeProduct = this.products.find(product => product.slug === this.investmentType);
    },
    closePanel() {
      this.$store.commit('SET_SHOW_PANEL', false);
    },
  },
};
</script>

<style lang="css" scoped>
</style>
