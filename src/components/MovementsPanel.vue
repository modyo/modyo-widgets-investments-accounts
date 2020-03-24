<template id="account-movements-template">
  <div>
    <div class="d-flex justify-content-between px-4 py-3 border-bottom">
      <a
        href="#"
        class="mr-3"
        @click.prevent="closePanel">
        <font-awesome-icon
          icon="chevron-left"
          size="sm"
          class="mr-2" /> Volver</a>
      <h4 class="mb-0 text-primary">
        {{ $t('movements.title') }}
      </h4>
    </div>
    <div class="row no-gutters">
      <div class="col-lg-4 border-right">
        <div class="movements-panel__filters p-4">
          <div class="movements-panel__filters-dates">
            <h4
              class="d-flex justify-content-between text-primary">
              <strong>{{ $t('movements.period') }}</strong>
              <a
                href="#"
                class="d-inline-block d-lg-none"
                @click="visibleFilters = false">
                <font-awesome-icon
                  icon="times"
                  style="cursor: pointer" />
              </a>
            </h4>
            <div class="datepicker mb-4">
              <vue-date-picker
                v-model="dates"
                type="month"
                :format="monthFormat"
                :range="true"
                :max-date="maxMonth"
                :locale="{lang: 'es'}"
                :validate="true"
                fullscreen-mobile
                :format-header="monthFormat"
                range-header-text="De %d a %d"
                range-input-text="De %d a %d"
                @input="applyDates">
                <template #activator="{ date }">
                  <button
                    ref="activator"
                    class="form-control btn btn-white border d-flex justify-content-between
                    align-items-center"
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
            <h4 class="text-primary">
              <strong>{{ $t('movements.movement-types') }}</strong>
            </h4>
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
      <div class="col-lg-8 movements-panel__content p-1">
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
            <h5 class="mb-0 text-center">
              {{ $t('movements.no-movements') }}
            </h5>
            <p class="text-muted text-center">
              {{ $t('movements.select-other-period') }}
            </p>
          </div>
          <div
            v-else
            id="movements-accordion">
            <div
              v-for="movement in movements"
              :key="movement.id"
              class="movements-panel__row bg-white border-bottom">
              <a
                :href="'#movements-' + movement.id"
                :aria-controls="'#movements-' + movement.id"
                data-toggle="collapse"
                aria-expanded="false"
                class="row no-gutters collapsed py-2 px-4 btn d-flex rounded-0 position-relative"
                tabindex="0">
                <div class="col-lg-3 text-left"><span>{{ movement.date | date }}</span></div>
                <div class="col-lg-6 text-left"><strong>{{ movement.description }}</strong></div>
                <div class="col-lg-3 text-right">
                  <span v-if="movement.type === 'CARGO'">-</span>
                  {{ movement.amount.valueString }}
                  <font-awesome-icon
                    icon="chevron-up"
                    class="ml-2" />
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
            class="movements-panel__summary">
            <a
              href="#"
              class="btn d-flex justify-content-between align-items-center px-4 py-3
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
              <h5 class="text-primary px-4 pt-4">
                <span class="font-weight-light">{{ $t('movements.period') }}:</span>
                {{ fromDate | date('MMMM yyyy') }}
                {{ $t('movements.to') }}
                {{ toDate | date('MMMM yyyy') }}
              </h5>
              <div class="d-flex align-items-center border-bottom border-top px-4 py-2">
                <div>
                  {{ $t('movements.cash-balance') }}
                </div>
                <div class="ml-auto mr-4">
                  <small class="d-block text-right">{{ $t('movements.initial') }}</small>
                  <p class="mb-0 text-right">
                    {{ summary.initialBalance.amount.value | currency }}
                  </p>
                </div>
                <div>
                  <small class="d-block text-right">{{ $t('movements.final') }}</small>
                  <p class="mb-0 text-right">
                    {{ summary.endBalance.amount.value | currency }}
                  </p>
                </div>
              </div>
              <div class="d-flex align-items-center px-4 py-2">
                <div>
                  Movimientos
                </div>
                <div class="ml-auto mr-4">
                  <small class="d-block text-right">{{ $t('movements.payments') }}</small>
                  <p class="mb-0 text-right">
                    {{ summary.deposits.amount.value | currency }}
                  </p>
                </div>
                <div class="mr-4">
                  <small class="d-block text-right">{{ $t('movements.transfers') }}</small>
                  <p class="mb-0 text-right">
                    {{ summary.transfers.amount.value | currency }}
                  </p>
                </div>
                <div class="mr-4 text-right">
                  <small class="d-block">{{ $t('movements.purchases') }}</small>
                  <p class="mb-0">
                    {{ summary.purchases.amount.value | currency }}
                  </p>
                </div>
                <div class="text-right">
                  <small class="d-block">{{ $t('movements.sales') }}</small>
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
  startOfMonth, endOfMonth, subMonths, format,
} from 'date-fns';
import axios from 'axios';
import currency, { date } from '../filters';

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
      monthFormat: 'MMMM YYYY',
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
      fromDate: format(startOfMonth(subMonths(new Date(), 1)), 'yyyy-MM'),
      toDate: format(endOfMonth(new Date()), 'yyyy-MM'),
      maxMonth: format(startOfMonth(new Date()), 'yyyy-MM'),
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
    formatMonths(Dates) {
      let formattedDates = '';
      if (Dates[0]) {
        formattedDates = format(Dates[0], this.monthFormat);
      }
      if (this.monthPeriod && Dates[1]) {
        formattedDates += ` - ${format(Dates[1], this.monthFormat)}`;
      }
      return formattedDates;
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

      axios.get('https://api-bank.herokuapp.com/api/v1/AccountMovements', {
        params: {
          id: this.account.id,
          fromDate: this.fromDate,
          toDate: this.toDate,
          filter: this.filterByAll,
          filters: this.filterBy,
        },
      })
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
@import '../scss/_variables.scss';
.movements-panel__content {
background-color: $tertiary-20;
.movements-panel__row, .movements-panel__summary {
  .btn.collapsed  {
    z-index: 100;
    .svg-inline--fa {
      transform: rotate(180deg);
    }
  }
  .movements-panel__row-details, .movements-panel__summary-details {
    background-color: $tertiary-10;
  }
}
}
</style>
