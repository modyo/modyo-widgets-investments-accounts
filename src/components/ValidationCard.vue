<template>
  <div>
    <slot
      v-if="status === 'isLoading'"
      name="loading">
      <h3>Loading...</h3>
    </slot>
    <slot
      v-if="status === 'hasError'"
      name="error">
      <h3>
        Custom error message on fail
      </h3>
    </slot>
    <slot
      v-if=" status === 'isEmpty'"
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
    status: {
      type: [String, Boolean],
      required: true,
      validator: (prop) => [
        'isLoading',
        'hasError',
        'isEmpty',
      ].includes(prop),
    },
  },
};
</script>
