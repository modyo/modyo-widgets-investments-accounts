<template>
  <div
    class="investment-item bg-white"
    :class="{ 'length-active': isLargeName }">
    <a
      :href="'#infoTable-'+ item.id"
      :aria-controls="'#infoTable-'+ item.id"
      class="row no-gutters collapsed px-4 py-3"
      data-toggle="collapse"
      aria-expanded="true">
      <div
        class="col col-lg-3">
        <strong class="d-block">{{ item.name }}</strong>
      </div>
      <div
        class="col col-lg-2 justify-content-end d-block d-lg-flex align-items-center text-right">
        {{ item.quantity }}
      </div>
      <div
        class="col col-lg-2 d-none d-lg-flex justify-content-lg-end align-items-center">
        <strong class="d-block d-lg-none">
          <font-awesome-icon
            icon="chevron-up"
            class="d-none d-lg-block" />
          {{ $t('investment-item.rentability') }}:
        </strong>
        {{ item.amountTotalReturn.percentageString }}
      </div>
      <div
        class="col col-lg-3 d-block d-lg-flex justify-content-lg-end align-items-center text-right">
        <p
          v-if="item.amount.currency !== 'clp'"
          class="m-0">{{ item.amount.originValueString }}</p>
        <p
          v-else
          class="m-0">{{ item.amount.valueString }}</p>
      </div>
      <div class="col col-lg-2 justify-content-lg-end d-none d-lg-flex align-items-center">
        <strong class="d-block d-lg-none">{{ $t('investment-item.distribution') }}:</strong>
        {{ item.amount.percentageString }}
      </div>
    </a>
    <div
      :id="'infoTable-'+ item.id"
      class="collapse row no-gutters investment-item__row p-4 border-top"
      role="tabpanel"
      data-parent="#investments-accordion">
      <div class="col-6 col-sm-3 order-2 text-lg-right mt-4 mt-sm-0">
        <a
          href="#accounts-modal"
          class="btn btn-primary px-4"
          @click.prevent="setModalData(item)">{{ $t('investment-item.detail') }}</a>
      </div>
      <div class="col-6 col-sm-3">
        <small
          v-if="item.slug === 'stock'"
          class="d-block">{{ $t('investment-item.closing-price') }}</small>
        <small
          v-if="item.slug === 'mutual-fund'"
          class="d-block">{{ $t('investment-item.fee-value') }}</small>
        <p class="mb-0">
          {{ item.currentPriceString }}
        </p>
      </div>
      <div class="col-6 col-sm-3">
        <small class="d-block">{{ $t('investment-item.utility-total-loss') }}</small>
        <p
          v-if="item.amountTotalReturn.currency !== localCurrency"
          class="m-0">
          {{ item.amountTotalReturn.originValueString }}
        </p>
        <p
          v-else
          class="m-0">
          {{ item.amountTotalReturn.valueString }}
        </p>
      </div>
      <div class="col-6 col-sm-3 mt-4 mt-sm-0">
        <small
          v-if="item.slug === 'stock'"
          class="d-block">{{ $t('investment-item.purchase-avg-price') }}</small>
        <small
          v-if="item.slug === 'mutual-fund'"
          class="d-block">{{ $t('investment-item.fee-avg-value') }}</small>
        <p class="mb-0">
          {{ item.purchasePriceString }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>

import $ from 'jquery';

export default {

  name: 'InvestmentItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    localCurrency() {
      return this.$store.state.localCurrency;
    },
    isLargeName() {
      return this.item.name.length > 25;
    },
  },
  methods: {
    setModalData(data) {
      this.$store.commit('SET_MODAL_DATA', data);
      $(this.$el).parents('.accounts-app').find('#accounts-modal').modal('show');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables.scss";

.investment-item {
  border-bottom: 1px solid $tertiary-20;

  &:last-child {
    border-bottom: none;
  }

  .investment-item__row {
    background-color: $tertiary-10;
  }
}
</style>
