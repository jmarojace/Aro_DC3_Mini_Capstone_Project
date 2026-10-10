<script setup>
import { useStore } from '../stores/store'
const store = useStore()
const fmt = d => new Date(d).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' })
</script>

<template>
  <section class="panel">
    <h2>Sales history</h2>
    <p class="muted">Total revenue: <b>₱{{ store.revenue.toFixed(2) }}</b> from {{ store.sales.length }} sales</p>
    <p v-if="!store.sales.length" class="muted">No sales yet. Complete an order in Point of Sale.</p>
    <ul v-else class="list">
      <li v-for="s in store.sales" :key="s.id" class="sale">
        <div>
          <b>{{ fmt(s.date) }}</b>
          <small>{{ s.items.map(i => `${i.qty}× ${i.name}`).join(', ') }}</small>
        </div>
        <b>₱{{ s.total.toFixed(2) }}</b>
      </li>
    </ul>
  </section>
</template>
