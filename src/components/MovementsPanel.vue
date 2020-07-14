<template id="account-movements-template">
  <div>
    <div
      class="d-flex flex-column flex-lg-row justify-content-between
      px-0 px-lg-4 mx-4 mx-lg-0 py-lg-3 pt-0 pb-3 border-bottom">
      <a
        href="#"
        class="mr-3"
        @click.prevent="closePanel">
        <font-awesome-icon
          icon="chevron-left"
          size="sm"
          class="mr-2" /> {{ $t('commons.back') }}</a>
      <p class="h5 mb-0 text-primary mt-3 mt-lg-0">
        {{ $t('movements.title') }}
      </p>
    </div>
    <div class="row no-gutters">
      <div class="acccounts__movements-col-filters col-lg-4">
        <div class="movements-panel__filters p-lg-4 pt-4 px-4">
          <div class="movements-panel__filters-dates">
            <p class="h6 text-primary d-none d-lg-block">
              <strong>{{ $t('movements.period') }}</strong>
            </p>
            <div class="datepicker mb-4">
              <vue-date-picker
                v-model="dates"
                type="month"
                :name="$t('movements.period')"
                :format="dateFormats.short"
                :range="true"
                :max-date="maxMonth"
                :locale="{lang: dateFormats.lang}"
                :validate="true"
                fullscreen-mobile
                :format-header="dateFormats.short"
                color="#2e4553"
                @input="applyDates">
                <template #activator="{ date }">
                  <button
                    ref="activator"
                    class="movements-panel__filter-date-btn form-control btn btn-white border
                    d-flex justify-content-between align-items-center px-3 px-xl-3 text-left"
                    type="button">
                    <span class="text-capitalize">{{ date }}</span>
                    <font-awesome-icon
                      icon="calendar"
                      class="ml-2" />
                  </button>
                </template>
              </vue-date-picker>
            </div>
          </div>
          <div class="d-none d-lg-block movements-panel__filters-movement-type">
            <p class="h6 text-primary">
              <strong>{{ $t('movements.movement-types') }}</strong>
            </p>
            <div class="custom-control custom-checkbox">
              <input
                id="filterByAll"
                v-model="filterByAll"
                value="filterByAll"
                type="checkbox"
                class="custom-control-input rounded-0"
                @change="checkAll">
              <label
                class="custom-control-label"
                for="filterByAll">
                {{ $t('movements.types.all') }}
              </label>
            </div>
            <div class="custom-control custom-checkbox">
              <input
                id="buy-stock"
                v-model="filterBy"
                value="buy-stock"
                type="checkbox"
                class="custom-control-input rounded-0 filter-by"
                @change="checkFilters">
              <label
                class="custom-control-label"
                for="buy-stock">
                {{ $t('movements.types.stock-purchase') }}
              </label>
            </div>
            <div class="custom-control custom-checkbox">
              <input
                id="sell-stock"
                v-model="filterBy"
                value="sell-stock"
                type="checkbox"
                class="custom-control-input rounded-0 filter-by"
                @change="checkFilters">
              <label
                class="custom-control-label"
                for="sell-stock">
                {{ $t('movements.types.stock-sell') }}
              </label>
            </div>
            <div class="custom-control custom-checkbox">
              <input
                id="purchase-mutual-fund"
                v-model="filterBy"
                value="purchase-mutual-fund"
                type="checkbox"
                class="custom-control-input rounded-0 filter-by"
                @change="checkFilters">
              <label
                class="custom-control-label"
                for="purchase-mutual-fund">
                {{ $t('movements.types.mutual-funds-contribution') }}
              </label>
            </div>
            <div class="custom-control custom-checkbox">
              <input
                id="redeem-mutual-fund"
                v-model="filterBy"
                value="redeem-mutual-fund"
                type="checkbox"
                class="custom-control-input rounded-0 filter-by"
                @change="checkFilters">
              <label
                class="custom-control-label"
                for="redeem-mutual-fund">
                {{ $t('movements.types.mutual-funds-rescue') }}
              </label>
            </div>
            <div class="custom-control custom-checkbox">
              <input
                id="deposit-cash"
                v-model="filterBy"
                value="deposit-cash"
                type="checkbox"
                class="custom-control-input rounded-0 filter-by"
                @change="checkFilters">
              <label
                class="custom-control-label"
                for="deposit-cash">
                {{ $t('movements.types.cash-payment') }}
              </label>
            </div>
            <div class="custom-control custom-checkbox">
              <input
                id="withdraw-cash"
                v-model="filterBy"
                value="withdraw-cash"
                type="checkbox"
                class="custom-control-input rounded-0 filter-by"
                @change="checkFilters">
              <label
                class="custom-control-label"
                for="withdraw-cash">
                {{ $t('movements.types.dividend') }}
              </label>
            </div>
            <div class="custom-control custom-checkbox">
              <input
                id="check-others"
                v-model="filterBy"
                type="checkbox"
                class="custom-control-input rounded-0 filter-by"
                @change="checkFilters">
              <label
                class="custom-control-label"
                for="check-others">
                {{ $t('movements.types.others') }}
              </label>
            </div>
          </div>
          <a
            href="#"
            class="btn btn-secondary d-none d-lg-block mt-4">
            {{ $t('movements.export-excel') }}
            <font-awesome-icon
              icon="file-excel"
              size="lg"
              class="ml-3" />
          </a>
        </div>
      </div>
      <div class="col-lg-8 movements-panel__content p-lg-1 px-4 mb-4 mb-lg-0">
        <div
          v-if="isLoading"
          class="spinner-border"
          role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div
          v-else
          class="h-100 d-flex flex-column justify-content-between border">
          <div
            v-if="!movements.length"
            class="d-flex flex-column justify-content-center p-4 h-100">
            <h5 class="text-center">
              {{ $t('movements.no-movements') }}
            </h5>
            <p class="text-muted text-center mb-0">
              <span class="d-none d-lg-block">{{ $t('movements.select-other-period-sidebar') }}</span>
              <span class="d-lg-none">{{ $t('movements.select-other-period') }}</span>
            </p>
          </div>
          <div
            v-else
            id="movements-accordion">
            <div
              v-for="movement in movements"
              :key="movement.id"
              class="movements-panel__row bg-white border-bottom py-2">
              <a
                :href="'#movements-' + movement.id"
                :aria-controls="'#movements-' + movement.id"
                data-toggle="collapse"
                aria-expanded="false"
                class="row no-gutters collapsed py-2 px-lg-4 btn d-flex rounded-0 position-relative align-items-center"
                tabindex="0">
                <div class="col-3 text-left d-none d-lg-block"><span>{{ movement.date | date }}</span></div>
                <div class="col-6 col-lg-5 text-left">{{ movement.description }}</div>
                <div class="col-5 col-lg-3 text-right">
                  <span v-if="movement.type === 'CARGO'">-</span>
                  {{ movement.amount.valueString }}
                </div>
                <div class="col text-right">
                  <font-awesome-icon
                    icon="chevron-up" />
                </div>
              </a>
              <div
                :id="'movements-' + movement.id"
                role="tabpanel"
                class="collapse py-2 px-4 border-top movements-panel__row-details"
                data-parent="#movements-accordion">
                <div
                  v-if="movement.subject == 'cash'"
                  class="row">
                  <div class="col">
                    <small
                      v-if="movement.type === 'CARGO'"
                      class="d-block">{{ $t('movements.to-account') }}</small>
                    <small
                      v-if="movement.type === 'ABONO'"
                      class="d-block">{{ $t('movements.from-account') }}</small>
                    <p class="mb-0">
                      <strong>{{ movement.accountNumber }}</strong>
                    </p>
                  </div>
                  <div class="col">
                    <small class="d-block">{{ $t('movements.amount') }}</small>
                    <p
                      v-if="movement.type === 'CARGO'"
                      class="mb-0">
                      <strong>{{ movement.amount.valueString }}</strong>
                    </p>
                    <p
                      v-if="movement.type === 'ABONO'"
                      class="mb-0">
                      <strong>{{ movement.amount.valueString }}</strong>
                    </p>
                  </div>
                </div>

                <div
                  v-if="movement.subject == 'stock'"
                  class="row">
                  <div class="col">
                    <small class="d-block">{{ $t('movements.stock') }}</small>
                    <p class="mb-0">
                      <strong>{{ movement.productName }}</strong>
                    </p>
                  </div>
                  <div class="col">
                    <small class="d-block">{{ $t('movements.quantity') }}</small>
                    <p class="mb-0">
                      <strong>{{ movement.quantity }}</strong>
                    </p>
                  </div>
                  <div class="col">
                    <small class="d-block">{{ $t('movements.unit-price') }}</small>
                    <p class="mb-0">
                      <strong>{{ movement.priceString }}</strong>
                    </p>
                  </div>
                  <div class="col text-lg-right">
                    <small class="d-block">{{ $t('movements.total-amount') }}</small>
                    <p class="mb-0">
                      <strong>{{ movement.amount.valueString }}</strong>
                    </p>
                  </div>
                </div>

                <div
                  v-if="movement.subject == 'fund'"
                  class="row">
                  <div class="col">
                    <small class="d-block">{{ $t('movements.mutual-fund') }}</small>
                    <p class="mb-0">
                      <strong>{{ movement.productName }}</strong>
                    </p>
                  </div>
                  <div class="col">
                    <small class="d-block">{{ $t('movements.fees') }}</small>
                    <p class="mb-0">
                      <strong>{{ movement.quantity }}</strong>
                    </p>
                  </div>
                  <div class="col">
                    <small class="d-block">{{ $t('movements.fee-value') }}</small>
                    <p class="mb-0">
                      <strong>{{ movement.priceString }}</strong>
                    </p>
                  </div>
                  <div class="col text-lg-right">
                    <small class="d-block">{{ $t('movements.total-amount') }}</small>
                    <p class="mb-0">
                      <strong>{{ movement.amount.valueString }}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="filterByAll && movements.length"
            class="movements-panel__summary mt-3">
            <a
              href="#"
              class="btn d-flex justify-content-between align-items-center px-lg-4 py-3
              bg-tertiary rounded-0 position-relative text-white"
              @click.prevent="openSummary()">
              <h4 class="mb-0">
                {{ $t('movements.period-resume') }}
              </h4>
              <font-awesome-icon
                :icon="['fas', activeSummary ? 'times' : 'chevron-up']" />
            </a>
            <div
              v-if="activeSummary === true"
              class="movements-panel__summary-details border-top bg-white">
              <h5 class="text-primary px-lg-4 px-3 pt-4">
                <span class="font-weight-light d-lg-inline-block d-block">{{ $t('movements.period') }}:</span>
                {{ fromDate | date('MMMM yyyy', dateFormats.lang) }}
                {{ $t('movements.to') }}
                {{ toDate | date('MMMM yyyy', dateFormats.lang) }}
              </h5>
              <div
                class="d-flex flex-column flex-lg-row align-items-lg-center
                border-bottom border-top px-lg-4 px-3 py-2">
                <div class="mb-2 mb-lg-0">
                  {{ $t('movements.cash-balance') }}
                </div>
                <div class="d-flex flex-row flex-lg-column ml-lg-auto mr-lg-4 align-items-center">
                  <small class="d-block text-lg-right">
                    {{ $t('movements.initial') }}<span class="d-lg-none mr-2">:</span>
                  </small>
                  <p class="mb-0 text-right">
                    {{ summary.initialBalance.amount.value | currency }}
                  </p>
                </div>
                <div class="d-flex flex-row flex-lg-column ml-lg-3 align-items-center">
                  <small class="d-block text-lg-right">
                    {{ $t('movements.final') }}<span class="d-lg-none mr-2">:</span>
                  </small>
                  <p class="mb-0 text-right">
                    {{ summary.endBalance.amount.value | currency }}
                  </p>
                </div>
              </div>
              <div
                class="d-flex flex-column flex-lg-row align-items-lg-center
                border-bottom px-lg-4 px-3 py-2">
                <div class="mb-2 mb-lg-0">
                  {{ $t('movements.word') }}
                </div>
                <div class="d-flex d-lg-block flex-row flex-lg-column ml-lg-auto mr-lg-4 align-items-center">
                  <small class="d-block text-lg-right">
                    {{ $t('movements.payments') }}<span class="d-lg-none mr-2">:</span>
                  </small>
                  <p class="mb-0 text-right">
                    {{ summary.deposits.amount.value | currency }}
                  </p>
                </div>
                <div class="d-flex d-lg-block flex-row flex-lg-column ml-lg-3 mr-lg-4 align-items-center">
                  <small class="d-block text-lg-right">
                    {{ $t('movements.transfers') }}<span class="d-lg-none mr-2">:</span>
                  </small>
                  <p class="mb-0 text-right">
                    {{ summary.transfers.amount.value | currency }}
                  </p>
                </div>
                <div
                  class="d-flex d-lg-block flex-row flex-lg-column ml-lg-3
                  mr-lg-4 align-items-center text-lg-right">
                  <small class="d-block">
                    {{ $t('movements.purchases') }}<span class="d-lg-none mr-2">:</span>
                  </small>
                  <p class="mb-0">
                    {{ summary.purchases.amount.value | currency }}
                  </p>
                </div>
                <div
                  class="d-flex d-lg-block flex-row flex-lg-column ml-lg-3
                  align-items-center text-lg-right">
                  <small class="d-block">
                    {{ $t('movements.sales') }}<span class="d-lg-none mr-2">:</span>
                  </small>
                  <p class="mb-0">
                    {{ summary.sales.amount.value | currency }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueDatePicker } from '@mathieustan/vue-datepicker';
import {
  startOfMonth, endOfMonth, subMonths, format, parseISO,
} from 'date-fns';

import { currency, date } from '@modyo/financial-commons';

export default {

  name: 'MovementsPanel',
  filters: { currency, date },
  components: {
    VueDatePicker,
  },
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLoading: true,
      activeSummary: false,
      monthPeriod: true,
      visibleFilters: false,
      dateFormats: this.$t('date.format'),
      movements: [],
      summary: {},
      filterBy: [
        'buy-stock',
        'sell-stock',
        'purchase-mutual-fund',
        'redeem-mutual-fund',
        'deposit-cash',
        'withdraw-cash',
        'others',
      ],
      filterByAll: true,
      fromDate: format(startOfMonth(subMonths(new Date(), 1)), this.$t('date.format.long')),
      toDate: format(new Date(), this.$t('date.format.long')),
      maxMonth: format(new Date(), this.$t('date.format.long')),
    };
  },
  computed: {
    dates: {
      get() {
        return {
          start: this.fromDate,
          end: this.toDate,
        };
      },
      set(values) {
        const { start, end } = values;
        this.fromDate = start;
        this.toDate = end;
      },
    },
  },
  watch: {
    account() {
      this.fetchAccountMovements();
    },

    filterBy: 'fetchAccountMovements',
    toDate: 'fetchAccountMovements',
  },
  created() {
    this.fetchAccountMovements();
  },
  methods: {
    checkAll(val) {
      const elems = this.$el.querySelectorAll('.filter-by');
      if (val.target.checked) {
        elems.forEach((elem) => {
          if (!elem.checked) { elem.click(); }
        });
      } else {
        elems.forEach((elem) => {
          if (elem.checked) { elem.click(); }
        });
      }
    },
    closePanel() {
      this.$store.commit('SET_SHOW_PANEL', false);
    },
    applyDates() {
      this.fetchAccountMovements();
    },
    checkFilters() {
      if (this.filterBy.length === 7) {
        this.filterByAll = true;
      } else {
        this.filterByAll = false;
      }
    },
    openSummary() {
      if (this.activeSummary === true) {
        this.activeSummary = false;
      } else {
        this.activeSummary = true;
      }
    },

    fetchAccountMovements() {
      this.isLoading = true;
      const params = {
        id: this.account.id,
        fromDate: this.fromDate,
        toDate: format(endOfMonth(parseISO(this.toDate)), this.dateFormats.long),
        filter: this.filterByAll,
        filters: this.filterBy,
      };

      this.$store.dispatch('GET_ACCOUNT_MOVEMENTS', params)
        .then(({ data }) => {
          const dato = data.data;
          this.movements = dato.movements;
          this.summary = dato.summary;
          this.isLoading = false;
        })
        .catch((err) => err);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables.scss";

.movements-panel__row,
.movements-panel__summary {
  .btn.collapsed {
    .svg-inline--fa {
      transform: rotate(180deg);
    }
  }

  .movements-panel__row-details,
  .movements-panel__summary-details {
    background-color: $tertiary-10;
  }
}

@media (max-width: 320px) {
  .movements-panel__filters-dates {
    .movements-panel__filter-date-btn {
      font-size: .9rem;
      line-height: .9rem;
    }
  }
}
@media (min-width: 992px) {
  .acccounts__movements-col-filters {
    border-right: 1px solid $primary-10;
  }

  .movements-panel__content {
    background-color: $tertiary-20;

    .movements-panel__row,
    .movements-panel__summary {
      .btn.collapsed {
        z-index: 100;
      }
    }
  }
}
</style>
