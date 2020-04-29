<template>
  <div class="h-100">
    <div
      class="p-lg-4 px-lg-4 pt-3 d-flex flex-column"
      :class="cash.amount.value === 0 ? 'h-100' : false">
      <div
        v-if="cash.amount.value === 0"
        class="d-flex flex-fill flex-column align-items-center justify-content-center px-4 text-center mb-4 mb-lg-0">
        <h4>{{ $t('investments-summary.empty-amount') }}</h4>
        <a
          href="#"
          class="btn btn-primary btn-lg px-5 mt-3"
          @click.prevent="">{{ $t('investments-summary.pay') }}</a>
      </div>
      <div
        v-else
        class="px-lg-0 px-4">
        <p class="h5 text-primary mb-0">
          {{ $t('investments-summary.title') }}
        </p>
        <div
          class="mb-5">
          <div class="progress investments-summary__progress my-4 rounded">
            <div
              v-for="product in products"
              :key="product.productId"
              class="progress-bar"
              :class="{'bg-stocks': product.slug==='stocks', 'bg-mutual-funds': product.slug==='mutual-funds' }"
              role="progressbar"
              :style="{width: product.amount.percentage + '%'} "
              :aria-valuenow="product.amount.percentage"
              aria-valuemin="0"
              aria-valuemax="100">
              {{ product.amount.percentageString }}
            </div>
          </div>

          <div class="investments-summary__product-list list-group rounded">
            <a
              v-for="product in products"
              :key="product.productId"
              :class="'list-' + product.slug"
              href="#"
              class="d-flex list-group-item align-items-center"
              @click="$emit('goto', 'investments', product.slug)">
              {{ product.name }}
              <span class="ml-auto mr-1">
                <strong class="blue">{{ product.amount.valueString }}</strong>
              </span>
              <font-awesome-icon
                icon="chevron-right"
                size="sm"
                class="ml-2" />
            </a>
          </div>
        </div>
        <div class="d-flex flex-column flex-lg-row mt-5">
          <p class="h5 text-primary">
            {{ $t('investments-summary.currency-detail') }}
          </p>
          <p class="mb-0 ml-lg-auto mt-3 mt-lg-0 d-flex d-lg-block justify-content-between">
            <span
              v-if="indicators.uf"
              class="badge badge-primary font-weight-normal ml-lg-3 mr-lg-0 mr-1 px-2 py-2 flex-fill">
              UF: {{ indicators.uf.valor | currency }}
            </span>
            <span
              v-if="indicators.dolar"
              class="badge badge-primary font-weight-normal ml-lg-3 mr-lg-0 mx-1 px-2 py-2 flex-fill">
              USD: {{ indicators.dolar.valor | currency }}
            </span>
            <span
              v-if="indicators.euro"
              class="badge badge-primary font-weight-normal ml-lg-3 mr-lg-0 ml-1 px-2 py-2 flex-fill">
              EUR: {{ indicators.euro.valor | currency }}
            </span>
          </p>
        </div>
        <div class="investments-summary__currency-list list-group mt-3 my-4 mb-lg-0 rounded">
          <div
            v-for="(currency,index) in currencies"
            :key="index"
            class="d-flex list-group-item d-flex align-items-center">
            <p class="col mb-0 p-0">
              {{ currency.name }}
            </p>
            <p class="col mb-0 p-0 text-right">
              <strong class="blue">{{ currency.amount.valueString }}</strong>
              <span
                v-if="currency.amount.currency !== localCurrency"
                class="d-block text-muted">
                {{ currency.amount.originValueString }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { currency } from '@modyo/financial-commons';

export default {

  name: 'InvestmentsSummary',
  filters: { currency },
  props: {
    account: {
      type: Object,
      required: true,
    },
    indicators: {
      type: Object,
      required: true,
    },
  },
  computed: {
    localCurrency() {
      return this.$store.state.localCurrency;
    },
    cash() {
      return this.account.products.find((product) => product.slug === 'cash');
    },
    products() {
      return this.account.products.filter((product) => product.slug !== 'cash');
    },
    currencies() {
      return this.account.currencies;
    },
  },
  created() {
    this.$store.commit('SET_CURRENT_PAGE', '');
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables.scss";

.investments-summary__progress {
  height: 3rem;
}

.investments-summary__product-list,
.investments-summary__currency-list {
  .list-group-item {
    border-top: none;
    border-right: none;
    border-bottom: 1px solid $tertiary-20;
    border-left: none;

    &:last-child {
      border-bottom: none;
    }
  }

  .list-stocks {
    border-left: 4px solid $stocks;
  }

  .list-mutual-funds {
    border-left: 4px solid $mutual-funds;
  }
}
</style>
