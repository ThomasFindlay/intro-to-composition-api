<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-semibold mb-8">Products</h1>

    <form
      class="w-2/3 mx-auto text-left mb-16 flex space-x-6"
      autocomplete="off"
    >
      <div class="flex-grow">
        <label class="block mb-2" for="products-filter">Filter products</label>
        <input
          v-model="productQuery"
          id="products-filter"
          type="text"
          class="w-full shadow border border-gray-300 p-3 rounded"
        />
      </div>
      <div class="flex-grow">
        <label class="block mb-2" for="products-sort">Sort</label>
        <select
          v-model="sortBy"
          id="products-sort"
          class="w-full shadow border border-gray-300 p-3 rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </form>
    <div class="grid grid-cols-12 gap-8 relative">
      <div class="space-y-8 col-span-8">
        <ProductItem
          v-for="product of sortedProducts"
          :key="product.id"
          v-bind="product"
        />
      </div>
      <div class="col-span-4">
        <div class="sticky top-0">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchProducts } from '@/api/productApi.js';
import ProductItem from './components/ProductItem.vue';

export default {
  components: {
    ProductItem,
  },
  data() {
    return {
      products: [],
      sortBy: 'asc',
      productQuery: '',
    };
  },
  watch: {
    productQuery(newQuery, oldQuery) {
      console.log(`New query: ${newQuery}. Old Query: ${oldQuery}`);
    },
  },
  computed: {
    filteredProducts() {
      const { productQuery, products } = this;

      let filteredProducts = products;

      if (productQuery) {
        filteredProducts = this.filterProducts(productQuery);
      }

      return filteredProducts;
    },
    sortedProducts() {
      let products = [...this.filteredProducts];

      products.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (this.sortBy === 'asc') {
          return this.sortByAscending(titleA, titleB);
        } else {
          return this.sortByDescending(titleA, titleB);
        }
      });

      return products;
    },
  },
  methods: {
    filterProducts(productQuery) {
      const query = productQuery.toLowerCase();
      return this.products.filter(({ title }) =>
        title.toLowerCase().includes(query)
      );
    },
    sortByAscending(a, b) {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    },
    sortByDescending(a, b) {
      if (a < b) return 1;
      if (a > b) return -1;
      return 0;
    },
    async initFetchProducts() {
      this.products = await fetchProducts();
    },
  },
  mounted() {
    this.initFetchProducts();
  },
};
</script>

<style module></style>
