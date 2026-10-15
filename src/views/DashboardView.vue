<script setup>
import { computed } from 'vue'
import { useStore } from '../stores/store'
import ProductIllustration from '../components/ProductIllustration.vue'
const store = useStore()
const peso = n => '₱' + n.toLocaleString('en-PH', { minimumFractionDigits: 2 })
const todayTotal = computed(() => store.todaySales.reduce((s, x) => s + x.total, 0))
</script>

<template>
  <section class="stats">
    <div class="stat"><span>Sales today</span><b>{{ peso(todayTotal) }}</b><span class="stat-icon" aria-hidden="true">💰</span></div>
    <div class="stat"><span>Transactions today</span><b>{{ store.todaySales.length }}</b><span class="stat-icon" aria-hidden="true">🧾</span></div>
    <div class="stat"><span>Products</span><b>{{ store.products.length }}</b><span class="stat-icon" aria-hidden="true">📦</span></div>
    <div class="stat"><span>Stock value</span><b>{{ peso(store.inventoryValue) }}</b><span class="stat-icon" aria-hidden="true">🏪</span></div>
  </section>

  <section class="panel">
    <h2>Needs restocking</h2>
    <p v-if="!store.lowStock.length" class="muted">Everything is stocked. Nothing to reorder.</p>
    <ul v-else class="list">
      <li v-for="p in store.lowStock" :key="p.id">
        <span class="product-name"><ProductIllustration :product="p" compact />{{ p.name }}</span>
        <span :class="p.stock === 0 ? 'bad' : 'warn'">{{ p.stock }} left (reorder at {{ p.reorder }})</span>
      </li>
    </ul>
    <RouterLink class="btn" to="/inventory">Update stock</RouterLink>
  </section>
</template>
