<template>
  <div>
    <div class="d-flex justify-content-between px-4 py-3 border-bottom bg-white">
      <a
        href="#"
        class="mr-3"
        @click.prevent="$emit('closestatementspanel')">
        <font-awesome-icon
          icon="chevron-left"
          size="sm"
          class="mr-2" /> Volver</a>
      <h4 class="mb-0 text-primary">
        {{ $t('statements.title') }}
      </h4>
    </div>
    <div class="mx-1 mb-1">
      <div>
        <table class="table mb-0 mt-1">
          <thead>
            <tr>
              <td class="pl-4 bg-white rounded-top border-left border-right d-block">
                {{ $t('statements.period') }}
              </td>
            </tr>
          </thead>
          <tr
            v-for="statement in statements"
            :key="statement.id">
            <td class="align-middle text-muted pl-4 bg-white border-left">
              {{ statement.period | date('MM/yyyy') }}
            </td>
            <td class="align-middle bg-white">
              {{ statement.name }}
            </td>
            <td class="text-right pr-4 bg-white border-right">
              <a
                :href="image_bl"
                target="_blank"
                class="btn btn-secondary">
                <font-awesome-icon
                  icon="file-pdf"
                  class="mr-2" />
                {{ $t('statements.download') }}
              </a>
            </td>
          </tr>
        </table>
      </div>
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
