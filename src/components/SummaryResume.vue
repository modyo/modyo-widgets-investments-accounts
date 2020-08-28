<template>
  <div class="accounts__summary-sidebar">
    <div class="p-lg-4 px-4 pb-4">
      <h1 class="h5 mb-0 text-primary d-flex justify-content-between">
        <strong>{{ account.name }}</strong>
        <a
          href="#"
          class="d-inline-block d-lg-none"
          @click.prevent="$emit('config')">
          <font-awesome-icon icon="cog" />
        </a>
      </h1>
      <p class="mb-0">
        {{ $t('summary-resume.title') }}
      </p>
    </div>
    <div>
      <div class="text-center text-lg-right px-4 mb-4">
        <h2 class="mb-0 text-primary h3">
          {{ account.amount.valueString }}
        </h2>
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

      <div class="flex-column d-lg-flex px-4 pb-4 pt-2 mt-4">
        <a
          href="#"
          class="nav-link d-flex justify-content-between align-items-center rounded mb-2"
          :class="currentPage==='investments' ? 'active' : 'border'"
          @click.prevent="$emit('goto', 'investments')">{{ $t('summary-resume.investments-btn') }}
          <font-awesome-icon
            icon="chevron-right"
            size="xs"
            class="ml-2" />
        </a>

        <a
          href="#"
          class="nav-link d-flex justify-content-between align-items-center rounded mb-2"
          :class="currentPage==='movements' ? 'active' : 'border'"
          @click.prevent="$emit('goto', 'movements')">{{ $t('summary-resume.movements-btn') }}
          <font-awesome-icon
            icon="chevron-right"
            size="xs"
            class="ml-2" />
        </a>

        <a
          href="#"
          class="nav-link d-flex justify-content-between align-items-center rounded"
          :class="currentPage==='statements' ? 'active' : 'border'"
          @click.prevent="$emit('statements')">{{ $t('summary-resume.statements-btn') }}
          <font-awesome-icon
            icon="chevron-right"
            size="xs"
            class="ml-2" /></a>

        <div class="row no-gutters mt-4 d-lg-flex d-none">
          <div class="col-lg-6 pr-lg-2">
            <a
              href="#"
              class="btn btn-primary btn-block"
              @click.prevent="">{{ $t('summary-resume.invest-btn') }}</a>
          </div>
          <div class="col-lg-6 pl-lg-2 pt-2 pt-lg-0">
            <a
              href="#"
              class="btn btn-primary btn-block"
              @click.prevent="">{{ $t('summary-resume.pay-btn') }}</a>
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
  .accounts__summary-sidebar {
    border-right: 1px solid $primary-10;
  }
}
</style>
