<template>
  <div
    class="accounts__container container-lg text-center py-5">
    <div
      v-if="isLoading"
      class="loading">
      <div
        class="spinner-border"
        role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div
      v-else-if="hasError">
      <div class="h1">
        Custom error message on fail
      </div>
    </div>
    <div
      v-else-if="!exactData"
      class="h1 text-white">
      Data incomplete, please try again in a while.
    </div>
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
    exactData: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
