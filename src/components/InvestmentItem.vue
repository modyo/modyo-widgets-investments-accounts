<template>
  <div
    :class="{ 'length-active': isLargeName }"
    class="item-investment-row accordion-light">
    <a
      :href="'#infoTable-'+ item.id"
      :aria-controls="'#infoTable-'+ item.id"
      class="tr-flex tr-row row no-gutters collapsed"
      data-toggle="collapse"
      aria-expanded="true">
      <div
        class="td-flex col col-lg-3 pl-4">
        <strong class="d-block font-mini">{{ item.name }}</strong>
      </div>
      <div
        class="td-flex col col-lg-2 justify-content-end
        d-block d-lg-flex align-items-center text-right">
        {{ item.quantity }}
      </div>
      <div
        class="td-flex col col-lg-2 d-none d-sm-flex justify-content-lg-end align-items-center">
        <strong class="d-block d-sm-none font-mini">
          <font-awesome-icon
            icon="chevron-up"
            class="d-none d-sm-block" />
          {{ $t('investment-item.rentability') }}:
        </strong>
        {{ item.amountTotalReturn.percentageString }}
      </div>
      <div
        class="td-flex col col-lg-3 d-block d-lg-flex
    justify-content-lg-end align-items-center text-right">

        <p
          v-if="item.amount.currency !== 'clp'"
          class="m-0">{{ item.amount.originValueString }}</p>
        <p
          v-else
          class="m-0">{{ item.amount.valueString }}</p>
      </div>
      <div class="td-flex col col-lg-2 justify-content-lg-end d-none d-sm-flex align-items-center">
        <strong class="d-block d-sm-none font-mini">{{ $t('investment-item.distribution') }}:</strong>
        {{ item.amount.percentageString }}
      </div>
    </a>
    <div
      :id="'infoTable-'+ item.id"
      class="collapse"
      role="tabpanel"
      data-parent="#investments-accordion">
      <div class="table-inner table-mobile-block">
        <div class="tr-flex border-0">
          <div class="td-flex col order-2">
            <a
              href="#accounts-modal"
              class="btn btn-lightblue"
              @click.prevent="setModalData(item)">{{ $t('investment-item.detail') }}</a>
          </div>
          <div class="td-flex col text-lg-center">
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
          <div class="td-flex col text-lg-center">
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
          <div class="td-flex col text-lg-center">
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

<style lang="css" scoped>
</style>
