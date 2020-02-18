<template id="account-movements-template">
  <div>
    <div class="header-nav d-flex">
      <div class="d-flex align-items-center">
        <a
          href="#"
          class="back-breadcrumb light mr-3"
          @click.prevent="closePanel">
          <font-awesome-icon icon="chevron-left" /> {{ $t('ui.back') }}</a>
        <h4 class="mb-0">
          {{ $t('movements.title') }}
        </h4>
      </div>
      <div class="actions ml-auto d-none d-sm-block">
        <a
          href="#"
          class="btn btn-secondary">{{ $t('movements.export-excel') }}</a>
      </div>
    </div>
    <div class="row no-gutters row-movements">
      <div class="col-md-4">
        <div class="d-block d-sm-none">
          <div class="d-flex p-3 filers-bar">
            <div>
              {{ $t('movements.period') }}:
              <strong v-if="fromDate">{{ fromDate | date('MMMM yyyy') }} {{ $t('movements.to') }}</strong>
              <strong> {{ toDate | date('MMMM yyyy') }}</strong>
            </div>
            <div class="ml-auto">
              <a
                href="#"
                @click="visibleFilters = !visibleFilters">
                <font-awesome-icon
                  icon="ellipsis-v"
                  style="cursor: pointer" />
              </a>
            </div>
          </div>
        </div>
        <div
          :class="visibleFilters ? 'active' : ''"
          class="accounts-sidebar accounts-sidebar-movements">
          <div class="wrap-sidebar-movements p-3">
            <h4
              class="d-flex justify-content-between">
              <strong>{{ $t('movements.period') }}</strong>
              <a
                href="#"
                class="close-filter d-inline-block d-sm-none"
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
                @input="applyDates" />
            </div>

            <div class="d-none d-sm-block">
              <h4 class="mb-4">
                <strong>{{ $t('movements.movement-types') }}</strong>
              </h4>

              <div class="form-check mb-1">
                <input
                  id="filterByAll"
                  v-model="filterByAll"
                  class="form-check-input"
                  type="checkbox"
                  value="all"
                  @change="checkAll">
                <label
                  for="filterByAll"
                  class="form-check-label">{{ $t('movements.types.all') }}</label>
              </div>
              <div class="form-check mb-1">
                <input
                  id="buy-stock"
                  v-model="filterBy"
                  class="form-check-input filter-by"
                  type="checkbox"
                  value="buy-stock"
                  @change="checkFilters">
                <label
                  for="buy-stock"
                  class="form-check-label">{{ $t('movements.types.stock-purchase') }}</label>
              </div>
              <div class="form-check mb-1">
                <input
                  id="sell-stock"
                  v-model="filterBy"
                  class="form-check-input
                  filter-by"
                  type="checkbox"
                  value="sell-stock"
                  @change="checkFilters">
                <label
                  for="sell-stock"
                  class="form-check-label">{{ $t('movements.types.stock-sell') }}</label>
              </div>
              <div class="form-check mb-1">
                <input
                  id="purchase-mutual-fund"
                  v-model="filterBy"
                  class="form-check-input
                  filter-by"
                  type="checkbox"
                  value="purchase-mutual-fund"
                  @change="checkFilters">
                <label
                  for="purchase-mutual-fund"
                  class="form-check-label">{{ $t('movements.types.mutual-funds-contribution') }}</label>
              </div>
              <div class="form-check mb-1">
                <input
                  id="redeem-mutual-fund"
                  v-model="filterBy"
                  class="form-check-input
                  filter-by"
                  type="checkbox"
                  value="redeem-mutual-fund"
                  @change="checkFilters">
                <label
                  for="redeem-mutual-fund"
                  class="form-check-label">{{ $t('movements.types.mutual-funds-rescue') }}</label>
              </div>
              <div class="form-check mb-1">
                <input
                  id="deposit-cash"
                  v-model="filterBy"
                  class="form-check-input
                  filter-by"
                  type="checkbox"
                  value="deposit-cash"
                  @change="checkFilters">
                <label
                  for="deposit-cash"
                  class="form-check-label">{{ $t('movements.types.cash-payment') }}</label>
              </div>
              <div class="form-check mb-1">
                <input
                  id="withdraw-cash"
                  v-model="filterBy"
                  class="form-check-input
                  filter-by"
                  type="checkbox"
                  value="withdraw-cash"
                  @change="checkFilters">
                <label
                  for="withdraw-cash"
                  class="form-check-label">{{ $t('movements.types.dividend') }}</label>
              </div>
              <div class="form-check">
                <input
                  id="check-others"
                  v-model="filterBy"
                  class="form-check-input
                  filter-by"
                  type="checkbox"
                  value="others"
                  @change="checkFilters">
                <label
                  for="check-others"
                  class="form-check-label">{{ $t('movements.types.others') }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div
          v-if="isLoading"
          class="loading">
          <div class="loading-ico" />
        </div>
        <div
          v-else
          class="mask-table-flex accounts-main">
          <div
            v-if="!movements.length"
            class="empty-movements">
            <div class="p-3 p-lg-5">
              <h5 class="mb-0">
                {{ $t('movements.no-movements') }}
              </h5>
              <p class="text-muted">
                {{ $t('movements.select-other-period') }}
              </p>
            </div>
          </div>
          <div
            v-else
            id="movements-accordion"
            class="table-flex p-3">
            <div
              v-for="movement in movements"
              :key="movement.id"
              class="movements-row accordion-light">
              <a
                :href="'#movements-' + movement.id"
                :aria-controls="'#movements-' + movement.id"
                data-toggle="collapse"
                aria-expanded="false"
                class="tr-flex tr-row block-responsive row no-gutters collapsed"
                tabindex="0">
                <div class="td-flex col-md-2 light"><span class="pl-lg-3">{{ movement.date | date }}</span></div>
                <div class="td-flex col-md-7 "><strong>{{ movement.description }}</strong></div>
                <div class="td-flex col-md-3 text-right">
                  <span v-if="movement.type === 'CARGO'">-</span>
                  {{ movement.amount.valueString }}
                </div>
              </a>
              <div
                :id="'movements-' + movement.id"
                role="tabpanel"
                class="collapse"
                style=""
                data-parent="#movements-accordion">
                <div
                  v-if="movement.subject == 'cash'"
                  class="row table-inner table-mobile-block">
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
                  class="row table-inner table-mobile-block">
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
                  <div class="col">
                    <small class="d-block">{{ $t('movements.total-amount') }}</small>
                    <p class="mb-0">
                      <strong>{{ movement.amount.valueString }}</strong>
                    </p>
                  </div>
                </div>

                <div
                  v-if="movement.subject == 'fund'"
                  class="row table-inner table-mobile-block">
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
                  <div class="col">
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
            :class="activeSummary ? 'active' : ''"
            class="summary-period">
            <div class="inner-summary-period">
              <a
                href="#"
                @click.prevent="openSummary()">
                <h4 class="mb-0"><strong>{{ $t('movements.period-resume') }}</strong></h4>
                <font-awesome-icon
                  :icon="['fas', activeSummary ? 'times' : 'chevron-up']"
                  class="inner-summary-period__icon" />
              </a>
              <div
                v-if="activeSummary === true"
                class="panel-summary-period p-2 p-lg-4">
                <div class="header-panel-summary-period">
                  <h4>
                    {{ $t('movements.period') }}:
                    <strong>{{ fromDate | date('MMMM yyyy') }} {{ $t('movements.to') }}</strong>
                    <strong> {{ toDate | date('MMMM yyyy') }}</strong>
                  </h4>
                </div>
                <div class="tr-flex align-items-center block-mobile">
                  <div class="td-flex">
                    <strong>{{ $t('movements.cash-balance') }}</strong>
                  </div>
                  <div class="td-flex ml-auto">
                    <small class="d-block text-right">{{ $t('movements.initial') }}</small>
                    <p class="mb-0 text-right">
                      {{ summary.initialBalance.amount.value | currency }}
                    </p>
                  </div>
                  <div class="td-flex">
                    <small class="d-block text-right">{{ $t('movements.final') }}</small>
                    <p class="mb-0 text-right">
                      {{ summary.endBalance.amount.value | currency }}
                    </p>
                  </div>
                </div>
                <div class="tr-flex align-items-center block-mobile">
                  <div class="td-flex">
                    <strong>Movimientos</strong>
                  </div>
                  <div class="td-flex ml-auto">
                    <small class="d-block text-right">{{ $t('movements.payments') }}</small>
                    <p class="mb-0 text-right">
                      {{ summary.deposits.amount.value | currency }}
                    </p>
                  </div>
                  <div class="td-flex">
                    <small class="d-block text-right">{{ $t('movements.transfers') }}</small>
                    <p class="mb-0 text-right">
                      {{ summary.transfers.amount.value | currency }}
                    </p>
                  </div>
                  <div class="td-flex">
                    <small class="d-block text-right">{{ $t('movements.purchases') }}</small>
                    <p class="mb-0 text-right">
                      {{ summary.purchases.amount.value | currency }}
                    </p>
                  </div>
                  <div class="td-flex">
                    <small class="d-block text-right">{{ $t('movements.sales') }}</small>
                    <p class="mb-0 text-right">
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
          elem.click();
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
        .catch(err => err);
    },
  },
};
</script>
