<script setup>
import { ref, computed } from 'vue'
import { useStore } from '../stores/store'
import ProductIllustration from '../components/ProductIllustration.vue'

const store = useStore()
const search = ref('')
const cash = ref(0)
const receipt = ref(null)
const hoveredProduct = ref(null)

const items = computed(() =>
  store.products.filter(p => p.name.toLowerCase().includes(search.value.toLowerCase())))
const change = computed(() => cash.value - store.cartTotal)
const canPay = computed(() => store.cart.length && cash.value >= store.cartTotal)

function pay() {
  const total = store.cartTotal
  if (store.checkout(cash.value)) {
    receipt.value = { total, cash: cash.value, change: cash.value - total }
    cash.value = 0
  }
}
</script>

<template>
  <div class="pos">
    <section class="panel">
      <h2>Products</h2>
      <input v-model="search" placeholder="Search products" />
      <div class="grid">
        <button v-for="p in items" :key="p.id" class="item" :disabled="p.stock === 0"
                @click="store.addToCart(p)"
                @mouseenter="hoveredProduct = p.id"
                @mouseleave="hoveredProduct = null">
          <ProductIllustration :product="p" />
          <b>{{ p.name }}</b>
          <span>₱{{ p.price.toFixed(2) }}</span>
          <small :class="{ bad: p.stock === 0 }">{{ p.stock === 0 ? 'Out of stock' : p.stock + ' in stock' }}</small>
          <small v-if="hoveredProduct === p.id && p.stock > 0" class="hover-hint">Click to add this product</small>
        </button>
      </div>
    </section>

    <section class="panel cart">
      <h2>Current order</h2>
      <p v-if="!store.cart.length" class="muted">Tap a product to add it to the order.</p>
      <ul v-else class="list">
        <li v-for="i in store.cart" :key="i.id">
          <span>{{ i.name }}</span>
          <span class="qty">
            <button class="btn" @click="store.setQty(i.id, i.qty - 1)">−</button>
            {{ i.qty }}
            <button class="btn" @click="store.setQty(i.id, i.qty + 1)">+</button>
          </span>
          <span>₱{{ (i.price * i.qty).toFixed(2) }}</span>
        </li>
      </ul>

      <div class="total">Total <b>₱{{ store.cartTotal.toFixed(2) }}</b></div>
      <label>Cash received <input v-model.number="cash" type="number" min="0" /></label>
      <p v-if="store.cart.length" :class="change < 0 ? 'bad' : 'ok'">
        {{ change < 0 ? `Short by ₱${(-change).toFixed(2)}` : `Change: ₱${change.toFixed(2)}` }}
      </p>
      <button class="btn primary wide" :disabled="!canPay" @click="pay">Complete sale</button>

      <p v-if="receipt" class="receipt">
        Sale complete. Total ₱{{ receipt.total.toFixed(2) }}, change ₱{{ receipt.change.toFixed(2) }}.
      </p>
    </section>
  </div>
</template>
