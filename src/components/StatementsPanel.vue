<template>
  <div class="mask-statements">
    <h3 class="mb-5">
      {{ $t('statements.title') }}
      <div
        class="close"
        @click.prevent="$emit('closestatementspanel')">
        <font-awesome-icon
          icon="times"
          style="cursor: pointer" />
      </div>
    </h3>

    <div class="table-statements">
      <div class="header-table-statements d-flex">
        {{ $t('statements.period') }}
      </div>
      <table class="table table-sm-block">
        <tr
          v-for="statement in statements"
          :key="statement.id">
          <td class="align-middle text-muted">
            {{ statement.period | date('MM/yyyy') }}
          </td>
          <td class="align-middle">
            {{ statement.name }}
          </td>
          <td class="text-right">
            <a
              :href="image_bl"
              target="_blank"
              class="btn btn-secondary">
              <font-awesome-icon
                icon="file-pdf" />
              {{ $t('statements.download') }}
            </a>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { date } from '../filters';

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
      const vm = this;
      this.isLoading = true;
      axios.get('https://api-bank.herokuapp.com/api/v1/AccountStatement', {
        params: {
          id: this.accountId,
        },
      })
        .then(({ data }) => {
          const dato = data.data;
          vm.statements = dato.account.statements;
          vm.isLoading = false;
        }, (err) => err);
    },
  },
};
</script>
