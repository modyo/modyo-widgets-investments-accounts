<template>
  <div>
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
      <h4 class="mb-0 mt-3 mt-lg-0 text-primary">
        {{ $t('statements.title') }}
      </h4>
    </div>
    <div class="mx-lg-1 mx-4 my-4 mt-lg-0 mb-lg-1">
      <div>
        <table class="table mb-0 mt-1 border-bottom">
          <thead class="d-none d-lg-block">
            <tr>
              <td class="pl-4 bg-white rounded-top border-left border-right d-block">
                {{ $t('statements.period') }}
              </td>
            </tr>
          </thead>
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
                  :href="image_bl"
                  target="_blank"
                  class="btn btn-secondary d-none d-lg-inline-block">
                  <font-awesome-icon
                    icon="file-pdf"
                    class="mr-2"
                    size="lg" />
                  {{ $t('statements.download') }}
                </a>
                <a
                  :href="image_bl"
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
    </div>
  </div>
</template>

<script>

import { date } from '@modyo/financial-commons';

export default {
  name: 'StatementsPanel',
  filters: { date },
  props: {
    accountId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isLoading: true,
      statements: [],
      image_bl: 'https://cloud.modyocdn.com/uploads/9dd6210d-1af4-4bce-a562-ad0fe38a214d/original/Business_letter.pdf',
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
      this.isLoading = true;
      const params = {
        id: this.accountId,
      };
      this.$store.dispatch('GET_ACCOUNT_STATEMENTS', params)
        .then(({ data }) => {
          const dato = data.data;
          this.statements = dato.account.statements;
          this.isLoading = false;
        }, (err) => err);
    },
  },
};
</script>
