<template>
  <div class="h-100">
    <div class="p-4">
      <h3 class="text-primary mb-0">
        {{ $t('investments-summary.title') }}
      </h3>

      <div
        v-if="cash.amount.value === 0"
        class="d-flex align-items-center">
        <div>
          <h4>{{ $t('investments-summary.empty-amount') }}</h4>
          <a
            href="/privado/abonar"
            class="btn btn-primary btn-lg">{{ $t('investments-summary.pay') }}</a>
        </div>
      </div>

      <div
        v-else
        class="mb-5">
        <div class="progress investments-summary__progress my-5 rounded-sm">
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
            <span>
              {{ product.amount.percentageString }}
            </span>
          </div>
        </div>

        <div class="investments-summary__product-list list-group">
          <a
            v-for="product in products"
            :key="product.productId"
            :class="'list-' + product.slug"
            href="#"
            class="d-flex list-group-item align-items-center rounded-0"
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

        <div class="d-flex mt-5">
          <h4 class="text-primary">{{ $t('investments-summary.currency-detail') }}</h4>
          <p class="mb-0 ml-auto">
            <span
              v-if="indicators.uf"
              class="badge badge-primary ml-3 px-2">UF: {{ indicators.uf.valor | currency }}</span>
            <span
              v-if="indicators.dolar"
              class="badge badge-primary ml-3 px-2">
              USD: {{ indicators.dolar.valor | currency }}
            </span>
            <span
              v-if="indicators.euro"
              class="badge badge-primary ml-3 px-2">
              EUR: {{ indicators.euro.valor | currency }}
            </span>
          </p>
        </div>

        <div class="investments-summary__currency-list list-group mt-3">
          <div
            v-for="(currency,index) in currencies"
            :key="index"
            class="d-flex list-group-item d-flex align-items-center rounded-0">
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

import currency from '../filters';

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
      return this.account.products.find((product) => product.name === 'Caja');
    },
    products() {
      return this.account.products.filter((product) => product.name !== 'Caja');
    },
    currencies() {
      return this.account.currencies;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

.investments-summary__progress {
  height: 3rem;
}

.investments-summary__product-list, .investments-summary__currency-list {
  .list-group-item {
    border-bottom: 1px solid $tertiary-20;
    border-left: none;
    border-right: none;
    border-top: none;
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
