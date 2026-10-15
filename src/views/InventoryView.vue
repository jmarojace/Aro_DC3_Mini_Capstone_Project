<script setup>
import { ref, computed } from 'vue'
import { useStore } from '../stores/store'
import ProductForm from '../components/ProductForm.vue'
import ProductIllustration from '../components/ProductIllustration.vue'

const store = useStore()
const search = ref('')
const category = ref('All')
const editing = ref(null)
const showForm = ref(false)

const categories = computed(() => ['All', ...new Set(store.products.map(p => p.category))])
const filtered = computed(() =>
  store.products.filter(p =>
    (category.value === 'All' || p.category === category.value) &&
    p.name.toLowerCase().includes(search.value.toLowerCase())))

const add = () => { editing.value = null; showForm.value = true }
const edit = p => { editing.value = p; showForm.value = true }
const save = p => { store.saveProduct(p); showForm.value = false }
const remove = p => confirm(`Delete ${p.name}?`) && store.deleteProduct(p.id)
</script>

<template>
  <ProductForm v-if="showForm" :product="editing" @save="save" @cancel="showForm = false" />

  <section class="panel">
    <div class="row between">
      <h2>Inventory</h2>
      <button class="btn primary" @click="add">Add product</button>
    </div>
    <div class="row">
      <input v-model="search" placeholder="Search products" />
      <select v-model="category">
        <option v-for="c in categories" :key="c">{{ c }}</option>
      </select>
    </div>

    <p v-if="!filtered.length" class="muted">No products match. Try another search or add a product.</p>
    <table v-else>
      <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th></th></tr></thead>
      <tbody>
        <tr v-for="p in filtered" :key="p.id">
          <td><span class="product-name"><ProductIllustration :product="p" compact />{{ p.name }}</span></td>
          <td>{{ p.category }}</td>
          <td>₱{{ p.price.toFixed(2) }}</td>
          <td :class="{ bad: p.stock === 0, warn: p.stock > 0 && p.stock <= p.reorder }">
            {{ p.stock }}<small v-if="p.stock <= p.reorder"> low</small>
          </td>
          <td class="actions">
            <button class="btn" @click="edit(p)">Edit</button>
            <button class="btn danger" @click="remove(p)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
