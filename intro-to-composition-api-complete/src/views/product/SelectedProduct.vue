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
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchProductById } from '@/api/productApi.js';

export default {
  setup() {
    const product = ref(null);
    const route = useRoute();

    const initFetchProductById = async id => {
      product.value = await fetchProductById(parseInt(id));
    };

    watch(() => route.params.id, initFetchProductById);

    onMounted(() => {
      initFetchProductById(route.params.id);
    });

    return {
      product,
    };
  },
};
</script>

<style module></style>
