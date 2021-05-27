<template>
  <div class="h-100 d-flex flex-column">
    <div
      class="d-flex flex-column flex-lg-row justify-content-between
      px-4 py-lg-3 pt-0 pb-3 border-bottom bg-white">
      <a
        href="#"
        class="mr-3"
        @click.prevent="$emit('closestatementspanel')">
        <font-awesome-icon
          icon="chevron-left"
          size="sm"
          class="mr-2" /> {{ $t('commons.back') }}</a>
      <p class="h5 mb-0 mt-3 mt-lg-0 text-primary">
        {{ $t('statements.title') }}
      </p>
    </div>
    <div
      class="my-4 mt-lg-0 mb-lg-1 h-100">
      <m-shadow-scroll
        class="h-100">
        <validation-card
          v-if="responseStatus"
          class="accounts__container container-lg text-center py-5"
          :status="responseStatus">
          <template #loading>
            <div
              class="loading spinner-border"
              role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </template>
          <template #error>
            <div class="d-flex flex-column justify-content-center p-4 h-100">
              <h5 class="text-center">
                {{ $t('statements.error') }}
              </h5>
              <p class="text-muted text-center mb-0">
                {{ $t('commons.try-again') }}
              </p>
            </div>
          </template>
          <template #empty>
            <div class="d-flex flex-column justify-content-center p-4 h-100">
              <h5 class="text-center">
                {{ $t('statements.no-statements') }}
              </h5>
            </div>
          </template>
        </validation-card>
        <div
          v-else
          class="mx-4 mx-lg-1 mb-0 mt-1">
          <table class="table border-bottom mb-0">
            <tbody class="border-left border-right">
              <tr
                v-for="statement in statements"
                :key="statement.id">
                <td class="d-none d-lg-table-cell align-middle text-muted pl-4 bg-white">
                  {{ statement.period | date('MM/yyyy') }}
                </td>
                <td class="align-middle bg-white pl-4 pl-lg-2">
                  {{ statement.name }}
                  <small class="d-block d-lg-none text-muted mt-1">{{ statement.period | date('MM/yyyy') }}</small>
                </td>
                <td class="text-right pr-4 bg-white align-middle">
                  <a
                    :href="statement.document"
                    target="_blank"
                    class="btn btn-secondary d-none d-lg-inline-block">
                    <font-awesome-icon
                      icon="file-pdf"
                      class="mr-2"
                      size="lg" />
                    {{ $t('statements.download') }}
                  </a>
                  <a
                    :href="statement.document"
                    target="_blank"
                    class="btn btn-secondary d-lg-none p-2">
                    <font-awesome-icon
                      icon="file-download"
                      size="lg" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </m-shadow-scroll>
    </div>
  </div>
</template>

<script>

import { date, MShadowScroll } from '@modyo/financial-commons';
import ValidationCard from './ValidationCard.vue';

export default {
  name: 'StatementsPanel',
  components: {
    'validation-card': ValidationCard,
    MShadowScroll,
  },
  filters: { date },
  props: {
    accountId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      statements: [],
      responseStatus: false,
    };
  },
  computed: {
    localCurrency() {
      return this.$store.state.localCurrency;
    },
  },
  watch: {
    accountId() {
      this.fetchAccountStatements();
    },
  },
  created() {
    this.fetchAccountStatements();
  },
  methods: {
    fetchAccountStatements() {
      this.responseStatus = 'isLoading';
      const params = {
        id: this.accountId,
      };
      this.$store.dispatch('GET_ACCOUNT_STATEMENTS', params)
        .then((data) => {
          const payload = data.data;
          if (data.response?.status >= 400) {
            this.responseStatus = 'hasError';
          } else if (payload.account.statements.length === 0) {
            this.responseStatus = 'isEmpty';
          } else {
            this.statements = payload.account.statements;
            this.responseStatus = false;
          }
        });
    },
  },
};
</script>
