<template>
  <div class="h-100">
    <div class="accounts-main resume-main p-4">
      <h3 class="mb-3 mb-lg-5">
        {{ $t('investments-summary.title') }}
      </h3>

      <div
        v-if="cash.amount.value === 0"
        class="empty-amount d-flex align-items-center">
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
        <div class="d-flex mb-4 graphic-comparison">
          <div
            v-for="product in products"
            :key="product.productId"
            :class="product.slug"
            :style="{width: product.amount.percentage + '%'} "
            class="p-3">
            {{ product.amount.percentageString }}
          </div>
        </div>

        <div class="list-group mt-5 list-funds">
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
              icon="chevron-right" />
          </a>
        </div>

        <div class="d-flex mt-5">
          <h4>{{ $t('investments-summary.currency-detail') }}</h4>
          <p class="mb-0 ml-auto">
            <span
              v-if="indicators.uf"
              class="ml-3">UF: {{ indicators.uf.valor | currency }}</span>
            <span
              v-if="indicators.dolar"
              class="ml-3">
              USD: {{ indicators.dolar.valor | currency }}
            </span>
            <span
              v-if="indicators.euro"
              class="ml-3">
              EUR: {{ indicators.euro.valor | currency }}
            </span>
          </p>
        </div>

        <div class="list-group mt-3">
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
      return this.account.products.find(product => product.name === 'Caja');
    },
    products() {
      return this.account.products.filter(product => product.name !== 'Caja');
    },
    currencies() {
      return this.account.currencies;
    },
  },
};
</script>

<style lang="css" scoped>
.mr-1 {
  margin-right: 1rem;
}
</style>
