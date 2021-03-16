<template>
  <div class="text-left pt-4">
    <h2 class="text-xl font-semibold mb-4">Selected product</h2>
    <div v-if="product">
      <h3 class="text-lg mb-4 border-b pb-3">{{ product.title }}</h3>
      <div>{{ product.description }}</div>
    </div>
    <p v-else>No product selected</p>
  </div>
</template>

<script>
import { fetchProductById } from '@/api/productApi.js';

export default {
  data() {
    return {
      product: null,
    };
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler: 'initFetchProductById',
    },
  },
  methods: {
    async initFetchProductById(id) {
      if (!id) return;
      this.product = await fetchProductById(parseInt(id));
    },
  },
};
</script>

<style module></style>
