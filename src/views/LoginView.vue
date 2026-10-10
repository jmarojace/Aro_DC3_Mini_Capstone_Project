<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../stores/auth'

const auth = useAuth()
const router = useRouter()

const mode = ref('login') // 'login' | 'register'
const name = ref('')
const username = ref('')
const password = ref('')
const error = ref('')
const show = ref(false)

const isRegister = computed(() => mode.value === 'register')
const valid = computed(() =>
  username.value.trim() && password.value.length >= 6 && (!isRegister.value || name.value.trim()))

function submit() {
  error.value = isRegister.value
    ? auth.register(name.value, username.value, password.value)
    : auth.login(username.value, password.value)
  if (!error.value) router.push('/')
}
function switchMode() {
  mode.value = isRegister.value ? 'login' : 'register'
  error.value = ''
}
</script>

<template>
  <div class="auth">
    <aside class="auth-side">
      <div class="shelf" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
      <h1>Mini Store</h1>
      <p>Track your stock, ring up sales, and know what to restock before it runs out.</p>
    </aside>

    <form class="auth-card" @submit.prevent="submit">
      <h2>{{ isRegister ? 'Create your account' : 'Welcome back' }}</h2>
      <p class="muted">{{ isRegister ? 'Set up a login for your store.' : 'Sign in to manage your store.' }}</p>

      <label v-if="isRegister">Full name
        <input v-model="name" autocomplete="name" placeholder="Enter your full name" />
      </label>
      <label>Username
        <input v-model="username" autocomplete="username" placeholder="Enter your email" />
      </label>
      <label>Password
        <span class="pw">
          <input v-model="password" :type="show ? 'text' : 'password'" autocomplete="current-password"
                 placeholder="Enter your password" />
          <button type="button" class="link" @click="show = !show">{{ show ? 'Hide' : 'Show' }}</button>
        </span>
      </label>

      <p v-if="error" class="error" role="alert">{{ error }}</p>
      <button class="btn primary wide" :disabled="!valid">{{ isRegister ? 'Create account' : 'Sign in' }}</button>

      <p class="switch">
        {{ isRegister ? 'Already have an account?' : 'New here?' }}
        <button type="button" class="link" @click="switchMode">{{ isRegister ? 'Sign in' : 'Create an account' }}</button>
      </p>
    </form>
  </div>
</template>