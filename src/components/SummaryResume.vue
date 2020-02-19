<template>
  <div class="accounts-sidebar pt-lg-4">
    <div class="sidebar-resume-header p-3">
      <p class="mb-0 light">
        {{ $t('summary-resume.title') }}
      </p>
      <h4 class="mb-0">
        <strong>{{ account.name }}</strong>
        <a
          href="#"
          class="d-inline-block d-sm-none"
          @click.prevent="$emit('config')">
          <font-awesome-icon icon="cog" />
        </a>
      </h4>
    </div>
    <div class="sidebar-resume-body">
      <div class="total-amount p-3 text-center text-lg-right">
        <h3 class="mb-0 global-price">
          {{ account.amount.valueString }}
        </h3>
        <div class="">
          <p class="mb-0 d-block">
            {{ $t('summary-resume.account-label') }}
          </p>
          <small class="d-none d-sm-block light">{{ account.valuationDate | date }}</small>
        </div>
      </div>
      <table class="table">
        <tr>
          <td>{{ cash.name }}</td>
          <td class="text-right">
            <strong class="blue">{{ cash.amount.valueString }}</strong>
          </td>
        </tr>
        <tr>
          <td>{{ cash.details[0].name }}</td>
          <td
            class="text-right">
            <strong class="blue">
              {{ cash.details[0].amount.valueString }}
            </strong>
          </td>
        </tr>
      </table>
      <div class="actions-resume-body p-3">
        <a
          href="#"
          class="btn btn-secondary btn-block"
          @click.prevent="$emit('goto', 'investments')">{{ $t('summary-resume.investments-btn') }}
          <font-awesome-icon
            icon="chevron-right"
            size="xs"
            class="ml-05" /> </a>
        <a
          href="#"
          class="btn btn-secondary btn-block"
          @click.prevent="$emit('goto', 'movements')">{{ $t('summary-resume.movements-btn') }}
          <font-awesome-icon
            icon="chevron-right"
            size="xs"
            class="ml-05" /></a>
        <a
          href="#"
          class="btn btn-secondary btn-block"
          @click.prevent="$emit('statements')">{{ $t('summary-resume.statements-btn') }}
          <font-awesome-icon
            icon="chevron-right"
            size="xs"
            class="ml-05" /></a>

        <div class="row mt-3">
          <div class="col-6 mt-2">
            <a
              href="/privado/fondos-mutuos"
              class="btn btn-lightblue btn-block">{{ $t('summary-resume.invest-btn') }}</a>
          </div>
          <div class="col-6 mt-2">
            <a
              href="/privado/abonar"
              class="btn btn-lightblue btn-block">{{ $t('summary-resume.pay-btn') }}</a>
          </div>
        </div>

        <div class="mt-3 d-none d-sm-block">
          <a
            href="#"
            class="btn btn-link px-0"
            @click.prevent="$emit('config')">
            <font-awesome-icon icon="cog" /> {{ $t('summary-resume.config-account-btn') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { date } from '../filters';

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
      return this.account.products.find((product) => product.name === 'Caja');
    },
  },
};
</script>
