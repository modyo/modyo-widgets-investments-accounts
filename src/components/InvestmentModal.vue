<template>
  <div
    id="accounts-modal"
    class="modal fade"
    tabindex="-1"
    role="dialog">
    <div
      class="modal-dialog modal-dialog-centered modal-lg"
      role="document">
      <div
        v-if="item"
        class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-primary">
            {{ item.name }}
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body p-0">
          <h5
            v-if="item.slug === 'stock'"
            class="text-primary py-4 px-3 mb-0 investment-modal__subtitle">
            {{ $t('investment-details.modal.title.buy-sell-historical') }}
          </h5>
          <h5
            v-if="item.slug === 'mutual-fund'"
            class="text-primary py-4 px-3 mb-0 investment-modal__subtitle">
            {{ $t('investment-details.modal.title.input-rescue-historical') }}
          </h5>
          <div class="overflow-auto">
            <table class="table text-right table-detail">
              <thead>
                <tr>
                  <th class="text-center pl-3">
                    {{ $t('investment-details.modal.date') }}
                  </th>
                  <th v-if="item.slug === 'stock'">
                    {{ $t('investment-details.modal.quantity') }}
                  </th>
                  <th v-if="item.slug === 'mutual-fund'">
                    {{ $t('investment-details.modal.fees') }}
                  </th>
                  <th v-if="item.slug === 'stock'">
                    {{ $t('investment-details.modal.purchase-price') }}
                  </th>
                  <th v-if="item.slug === 'mutual-fund'">
                    {{ $t('investment-details.modal.purchase-value') }}
                  </th>
                  <th v-if="item.slug === 'stock'">
                    {{ $t('investment-details.modal.current-price') }}
                  </th>
                  <th v-if="item.slug === 'mutual-fund'">
                    {{ $t('investment-details.modal.current-value') }}
                  </th>
                  <th>{{ $t('investment-details.modal.initial-investment') }}</th>
                  <th
                    v-if="item.slug === 'stock'"
                    class="pr-3">
                    {{ $t('investment-details.modal.market-value') }}
                  </th>
                  <th
                    v-if="item.slug === 'mutual-fund'"
                    class="pr-3">
                    {{ $t('investment-details.modal.current-valorization') }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="detail in details"
                  :key="detail.id">
                  <td class="text-lg-center">
                    {{ detail.date | date }}
                  </td>
                  <td>
                    <small class="d-block d-sm-none">{{ $t('investment-details.modal.quantity') }}</small>
                    {{ detail.quantity }}
                  </td>
                  <td>
                    <small class="d-block d-sm-none">{{ $t('investment-details.modal.purchase-price') }}</small>
                    {{ detail.purchasePriceString }}
                  </td>
                  <td>
                    <small class="d-block d-sm-none">{{ $t('investment-details.modal.current-price') }}</small>
                    {{ detail.currentPriceString }}
                  </td>
                  <td v-if="detail.purchaseAmount.currency !== localCurrency">
                    <small class="d-block d-sm-none">{{ $t('investment-details.modal.initial-investment') }}</small>
                    {{ detail.purchaseAmount.originValueString }}
                  </td>
                  <td v-else>
                    <small class="d-block d-sm-none">{{ $t('investment-details.modal.initial-investment') }}</small>
                    {{ detail.purchaseAmount.valueString }}
                  </td>
                  <td v-if="detail.amount.currency !== localCurrency">
                    <small class="d-block d-sm-none">{{ $t('investment-details.modal.market-value') }}</small>
                    {{ detail.amount.originValueString }}
                  </td>
                  <td v-else>
                    <small class="d-block d-sm-none">{{ $t('investment-details.modal.market-value') }}</small>
                    {{ detail.amount.valueString }}
                  </td>
                </tr>

              <!-- <tr class="tfooter">
                <th></th>
                <th>{{item.quantity}}</th>
                <th>{{item.purchasePriceString}}</th>
                <th>{{item.currentPriceString}}</th>
                <th v-if="item.amount.currency !== localCurrency">
                {{item.amount.originValueString}}
                </th>
                <th v-else>{{item.amount.valueString}}</th>
                <th v-if="item.amount.currency !== localCurrency">-</th>
                <th v-else>-</th>
              </tr> -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { date } from '@modyo/financial-commons';

export default {
  name: 'InvestmentModal',
  filters: {
    date,
  },
  computed: {
    localCurrency() {
      return this.$store.state.localCurrency;
    },
    item() {
      return this.$store.state.modalData;
    },
    details() {
      return this.item.details.slice().sort((a, b) => a.date - b.date);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables.scss";

.investment-modal__subtitle {
  background-color: $tertiary-10;
}
</style>
