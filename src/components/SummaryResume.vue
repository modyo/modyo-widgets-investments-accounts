<template>
  <div class="accounts__summary-sidebar">
    <div class="p-lg-4 px-4 pb-4">
      <h4 class="mb-0 text-primary d-flex justify-content-between">
        <strong>{{ account.name }}</strong>
        <a
          href="#"
          class="d-inline-block d-lg-none"
          @click.prevent="$emit('config')">
          <font-awesome-icon icon="cog" />
        </a>
      </h4>
      <p class="mb-0">
        {{ $t('summary-resume.title') }}
      </p>
    </div>
    <div>
      <div class="text-center text-lg-right px-4 mb-4">
        <h3 class="mb-0 text-primary">
          {{ account.amount.valueString }}
        </h3>
        <div class="">
          <p class="mb-0 d-block">
            {{ $t('summary-resume.account-label') }}
          </p>
          <small class="d-none d-lg-block">{{ account.valuationDate | date }}</small>
        </div>
      </div>
      <table class="table border-bottom mb-0">
        <tr>
          <td class="pl-4">
            {{ cash.name }}
          </td>
          <td class="pr-4 text-right">
            <strong class="blue">{{ cash.amount.valueString }}</strong>
          </td>
        </tr>
        <tr>
          <td class="pl-4">
            {{ cash.details[0].name }}
          </td>
          <td
            class="pr-4 text-right">
            <strong class="blue">
              {{ cash.details[0].amount.valueString }}
            </strong>
          </td>
        </tr>
      </table>
      <div class="px-4 pb-4 pt-2 mt-4">
        <a
          href="#"
          class="btn btn-secondary btn-block"
          :class="currentPage==='investments' ? 'active' : false"
          @click.prevent="$emit('goto', 'investments')">{{ $t('summary-resume.investments-btn') }}
          <font-awesome-icon
            icon="chevron-right"
            size="xs"
            class="ml-2" /> </a>
        <a
          href="#"
          class="btn btn-secondary btn-block"
          :class="currentPage==='movements' ? 'active' : false"
          @click.prevent="$emit('goto', 'movements')">{{ $t('summary-resume.movements-btn') }}
          <font-awesome-icon
            icon="chevron-right"
            size="xs"
            class="ml-2" /></a>
        <a
          href="#"
          class="btn btn-secondary btn-block"
          :class="currentPage==='statements' ? 'active' : false"
          @click.prevent="$emit('statements')">{{ $t('summary-resume.statements-btn') }}
          <font-awesome-icon
            icon="chevron-right"
            size="xs"
            class="ml-2" /></a>

        <div class="row no-gutters mt-4 d-lg-flex d-none">
          <div class="col-lg-6 pr-lg-2">
            <a
              href="/privado/fondos-mutuos"
              class="btn btn-primary btn-block">{{ $t('summary-resume.invest-btn') }}</a>
          </div>
          <div class="col-lg-6 pl-lg-2 pt-2 pt-lg-0">
            <a
              href="/privado/abonar"
              class="btn btn-primary btn-block">{{ $t('summary-resume.pay-btn') }}</a>
          </div>
        </div>

        <div class="mt-4 d-none d-lg-block">
          <a
            href="#"
            class="btn border btn-block"
            :class="currentPage==='settings' ? 'btn-primary text-white' : false"
            @click.prevent="$emit('config')">
            <font-awesome-icon
              icon="cog"
              class="mr-2" /> {{ $t('summary-resume.config-account-btn') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { date } from '@modyo/financial-commons';

export default {
  name: 'SummaryResume',
  filters: { date },
  props: {
    account: {
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
    currentPage() {
      return this.$store.state.currentPage;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

@media (min-width: 992px){
  .accounts__summary-sidebar{
    border-right: 1px solid $primary-10;
  }
}
</style>
