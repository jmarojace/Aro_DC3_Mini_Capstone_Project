<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from './stores/store'
import { useAuth } from './stores/auth'

const store = useStore()
const auth = useAuth()
const route = useRoute()
const router = useRouter()

const logout = () => { auth.logout(); router.push('/') }
</script>

<template>
  <RouterView v-if="route.meta.public" />

  <template v-else>
    <header class="top">
      <h1 class="brand">Mini Store</h1>
      <nav>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/inventory">
          Inventory <span v-if="store.lowStock.length" class="badge">{{ store.lowStock.length }}</span>
        </RouterLink>
        <RouterLink to="/pos">Point of Sale</RouterLink>
        <RouterLink to="/sales">Sales</RouterLink>
      </nav>
      <div class="user">
        <span>{{ auth.current?.name }}</span>
        <button class="btn ghost" @click="logout">Log out</button>
      </div>
    </header>
    <main><RouterView /></main>
  </template>
</template>