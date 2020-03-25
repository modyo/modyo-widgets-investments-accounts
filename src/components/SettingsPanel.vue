<template>
  <div
    v-if="loadingStatus"
    class="spinner-border"
    role="status">
    <span class="sr-only">Loading...</span>
  </div>

  <div v-else>
    <div
      class="d-flex flex-column flex-lg-row justify-content-between
      px-4 py-lg-3 pt-0 pb-3 border-bottom bg-white">
      <a
        href="#"
        class="mr-3"
        @click.prevent="$emit('closepanel')">
        <font-awesome-icon
          icon="chevron-left"
          size="sm"
          class="mr-2" /> {{ $t('commons.back') }}</a>
      <h4 class="mb-0 text-primary mt-3 mt-lg-0">
        {{ $t('settings-panel.title') }}
      </h4>
    </div>

    <div class="p-4">
      <div class="form-group mb-4">
        <label
          for="account-name"
          class="text-primary mb-2">
          <strong>{{ $t('settings-panel.account-name-lbl') }}</strong>
        </label>
        <input
          id="account-name"
          v-model="config.name"
          type="text"
          class="form-control">
      </div>
      <p class="text-primary mb-2">
        <strong>{{ $t('settings-panel.email-notifications-title') }}:</strong>
      </p>
      <div
        v-for="input in config.notifications"
        :key="input.id"
        class="mb-2">
        <div class="settings__checkbox custom-control custom-checkbox">
          <input
            :id="input.id"
            v-model="input.state"
            type="checkbox"
            class="custom-control-input">
          <label
            :for="input.id"
            class="custom-control-label d-block pr-4">
            {{ input.name }}
          </label>
        </div>
      </div>
      <div class="text-right mt-4">
        <button class="btn btn-primary btn-block">
          {{ $t('settings-panel.update-btn') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsPanel',
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loadingStatus: false,
      config: {
        name: '',
        notifications: [],
      },
    };
  },
  watch: {
    account: {
      handler() {
        this.config.name = this.account.name;
        this.config.notifications = this.account.settings.notifications;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.settings__checkbox {
  padding-left: 0;
  .custom-control-label {
    &:before, &:after {
      left: auto;
      right: 0;
    }
  }
}
</style>
