<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from './stores/store'
import { useAuth } from './stores/auth'

const store = useStore()
const auth = useAuth()
const route = useRoute()
const router = useRouter()
const settingsOpen = ref(false)
const darkMode = ref(localStorage.getItem('mini-store-dark-mode') === 'true')

watch(darkMode, value => {
  localStorage.setItem('mini-store-dark-mode', String(value))
}, { immediate: true })

const logout = () => { auth.logout(); router.push('/') }
</script>

<template>
  <RouterView v-if="route.meta.public" />

  <div v-else class="app-shell" :class="{ 'dark-mode': darkMode }">
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
        <button class="btn ghost" @click="settingsOpen = true">Settings</button>
      </div>
    </header>
    <main><RouterView /></main>

    <div v-if="settingsOpen" class="settings-overlay" @click.self="settingsOpen = false">
      <section class="settings-panel" role="dialog" aria-modal="true" aria-labelledby="settings-title">
        <div class="row between">
          <h2 id="settings-title">Settings</h2>
          <button class="btn" @click="settingsOpen = false">Close</button>
        </div>
        <section class="account-card" aria-label="Account profile">
          <div class="profile-avatar" aria-hidden="true">{{ auth.current?.name?.charAt(0).toUpperCase() || 'U' }}</div>
          <div class="profile-details">
            <b>{{ auth.current?.name }}</b>
            <small>{{ auth.current?.username }}</small>
          </div>
        </section>
        <div class="setting-option">
          <span>
            <b>Dark mode</b>
            <small>{{ darkMode ? 'On — click the sun to switch it off.' : 'Off — click the moon to switch it on.' }}</small>
          </span>
          <button
            type="button"
            class="theme-toggle"
            :aria-label="darkMode ? 'Turn off dark mode' : 'Turn on dark mode'"
            @click="darkMode = !darkMode"
          >{{ darkMode ? '☀️' : '🌙' }}</button>
        </div>
        <button class="btn danger wide" @click="logout">Log out</button>
      </section>
    </div>
  </div>
</template>
