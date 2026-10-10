<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '../stores/auth'
import FeatureCard from '../components/FeatureCard.vue'

const auth = useAuth()
const showReq = ref(false)

const features = [
  { title: 'Inventory (CRUD)', text: 'Create, read, update and delete products, with search and category filter.' },
  { title: 'Point of Sale', text: 'Build an order, take cash, compute change, and deduct stock automatically.' },
  { title: 'Sales History', text: 'See every completed sale and your total revenue.' },
  { title: 'Dashboard', text: 'Daily sales, stock value, and a list of items that need restocking.' }
]
const requirements = [
  'Node.js (LTS) and npm',
  'Visual Studio Code',
  'Vue 3 with Vite',
  'Vue Router for page navigation',
  'Pinia for shared state',
  'A modern web browser'
]

onMounted(() => { document.title = 'Mini Store | Home' })
</script>

<template>
  <header class="top">
    <h1 class="brand">Mini Store</h1>
    <nav></nav>
    <RouterLink v-if="auth.isLoggedIn" class="btn ghost" to="/dashboard">Open dashboard</RouterLink>
    <RouterLink v-else class="btn ghost" to="/login">Sign in</RouterLink>
  </header>

  <main>
    <section class="hero">
      <h2>Know your stock. Ring up sales. Restock on time.</h2>
      <p>A simple inventory and point of sale system for small stores, built with Vue mwehehe</p>
      <RouterLink class="btn primary" :to="auth.isLoggedIn ? '/dashboard' : '/login'">Get started</RouterLink>
    </section>

    <section class="features">
      <FeatureCard v-for="f in features" :key="f.title" :title="f.title">
        <p class="muted">{{ f.text }}</p>
      </FeatureCard>
    </section>

    <section class="panel">
      <div class="row between">
        <h2>Project requirements</h2>
        <button class="btn" @click="showReq = !showReq">{{ showReq ? 'Hide' : 'Show' }}</button>
      </div>
      <ul v-show="showReq" class="list">
        <li v-for="r in requirements" :key="r">{{ r }}</li>
      </ul>
    </section>
  </main>
</template>