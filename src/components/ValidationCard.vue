<template>
  <div>
    <slot
      v-if="isLoading"
      name="loading">
      <div
        class="loading spinner-border"
        role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </slot>
    <slot
      v-if="hasError"
      name="error">
      <h3>
        Custom error message on fail
      </h3>
    </slot>
    <slot
      v-if="isEmpty"
      name="empty">
      <h3>
        Data incomplete, please try again in a while.
      </h3>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'ValidationCard',
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
    hasError: {
      type: Boolean,
      required: true,
    },
    isEmpty: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      name: 'Johann',
    };
  },
};
</script>
