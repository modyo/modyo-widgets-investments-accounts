<template>
  <div
    v-if="loadingStatus"
    class="loading">
    <div class="loading-ico" />
  </div>

  <div v-else>
    <div
      class="close"
      @click.prevent="$emit('closepanel')">
      <font-awesome-icon
        icon="times"
        style="cursor: pointer" />
    </div>
    <h3 class="mb-4">
      {{ $t('settings-panel.title') }}
    </h3>
    <div class="form-group mb-4">
      <label for="account-name">{{ $t('settings-panel.account-name-lbl') }}</label>
      <input
        id="account-name"
        v-model="config.name"
        type="text"
        class="form-control">
    </div>

    <div class="text-right mb-5">
      <button class="btn btn-sm btn-primary">
        {{ $t('settings-panel.update-btn') }}
      </button>
    </div>

    <p><strong>{{ $t('settings-panel.email-notifications-title') }}:</strong></p>
    <div
      v-for="input in config.notifications"
      :key="input.id"
      class="d-flex justify-content-between mb-2">
      <p class="mb-0">
        {{ input.name }}
      </p>
      <div class="custom-control custom-checkbox">
        <input
          :id="input.id"
          v-model="input.state"
          type="checkbox"
          class="custom-control-input">
        <label
          :for="input.id"
          class="custom-control-label" />
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
