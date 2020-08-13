<template>
  <div>
    <div class="d-flex flex-column flex-lg-row justify-content-between px-4 pb-3 py-lg-3 border-bottom">
      <a
        href="#"
        class="mr-3 mb-3 mb-lg-0"
        @click.prevent="closePanel">
        <font-awesome-icon
          icon="chevron-left"
          size="sm"
          class="mr-2" /> {{ $t('commons.back') }}</a>
      <p class="h5 mb-0 text-primary">
        {{ $t('investment-details.title') }}
      </p>
    </div>
    <div class="row no-gutters">
      <div class="col-lg-3 p-4 border-right">
        <multiselect
          v-model="selectedProduct"
          class="d-lg-none"
          :options="products"
          :multiple="false"
          :group-select="false"
          track-by="name"
          label="name"
          :searchable="false"
          select-label=""
          deselect-label=""
          selected-label=""
          :allow-empty="false"
          @input="changeActiveProduct($event.slug)" />
        <ul class="nav nav-pills flex-column d-none d-lg-flex">
          <li
            v-for="(product,index) in products"
            :key="product.id"
            class="nav-item"
            :class="index==products.length-1 ? 'mt-2' : false">
            <a
              :class="investmentType == product.slug ? 'active' : 'border'"
              class="nav-link d-flex justify-content-between align-items-center"
              @click="changeActiveProduct(product.slug)">
              {{ product.name }}
              <font-awesome-icon
                icon="chevron-right"
                size="sm"
                class="ml-2" />
            </a>
          </li>
        </ul>
      </div>
      <div class="col-lg-9 investments-details__content">
        <div class="p-lg-4 px-4 pb-3 border-bottom">
          <div class="row no-gutters d-none d-lg-flex">
            <div class="col-lg-3" />
            <div
              v-if="investmentType === 'stocks'"
              class="col-lg-2 text-right">
              <strong class="text-primary">{{ $t('investment-details.stock') }}</strong>
            </div>
            <div
              v-if="investmentType === 'mutual-funds'"
              class="col-lg-2 text-right">
              <strong class="text-primary">{{ $t('investment-details.fees') }}</strong>
            </div>
            <div class="col-lg-2 text-right">
              <strong class="text-primary">{{ $t('investment-details.rentability') }}</strong>
            </div>
            <div class="col-lg-3 text-right">
              <strong class="text-primary">{{ $t('investment-details.current-investment') }}</strong>
            </div>
            <div class="col-lg-2 text-right">
              <strong class="text-primary">{{ $t('investment-details.distribution') }}</strong>
            </div>
          </div>
          <div class="row no-gutters d-flex d-lg-none">
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
        </div>
        <div
          id="investments-accordion"
          role="tablist"
          class="border-bottom">
          <investment-item
            v-for="item in activeProduct.elements"
            :key="item.id"
            :item="item" />
        </div>
        <div class="investments-details__summary px-4 py-lg-3 py-4 mt-2 mt-lg-0">
          <div class="row no-gutters">
            <div class="col-lg-4 d-none d-lg-flex px-1">
              <h5 class="mb-0 text-primary">
                {{ $t('investment-details.summary') }}
              </h5>
            </div>
            <div class="col col-lg-3 ml-auto text-left text-lg-right px-1">
              <strong class="d-block">{{ activeProduct.amountTotalReturn.valueString }}</strong>
              <small>{{ $t('investment-details.utility-total-loss') }}</small>
            </div>
            <div class="col col-lg-3 text-center text-lg-right px-1">
              <strong class="d-block">
                {{ activeProduct.amount.valueString }}
              </strong>
              <small>{{ $t('investment-details.total-current-investment') }}</small>
            </div>
            <div class="col col-lg-2 text-right px-1">
              <strong class="d-block">
                {{ activeProduct.amount.percentageString }}
              </strong>
              <small>{{ $t('investment-details.distribution-total') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import InvestmentItem from './InvestmentItem.vue';

export default {

  name: 'InvestmentsDetails',

  components: {
    'investment-item': InvestmentItem,
    Multiselect,
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
      selectedProduct: null,
    };
  },
  computed: {
    localCurrency() {
      return this.$store.state.localCurrency;
    },
    products() {
      return this.account.products.filter((product) => product.slug !== 'cash');
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
  created() {
    [this.selectedProduct] = this.products;
  },
  methods: {
    changeActiveProduct(value) {
      this.$emit('change-investment-type', value);
    },
    setActiveProduct() {
      this.activeProduct = this.products.find((product) => product.slug === this.investmentType);
    },
    closePanel() {
      this.$store.commit('SET_SHOW_PANEL', false);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
@import "../scss/variables.scss";

.nav-link {
  background-color: $primary-10;

  &:hover,
  &:focus {
    background: $primary-20;
  }

  small {
    color: $primary-60;
  }
}

@media (min-width: 992px) {
  .investments-details__content {
    background-color: $tertiary-20;
  }

  .investments-details__summary {
    background-color: $tertiary-10;
  }
}
</style>
