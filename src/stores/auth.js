import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const USERS_KEY = 'mini-store-users'
const SESSION_KEY = 'mini-store-session'


const OWNER = { username: 'aroko@gmail.com', password: 'aro0123', name: 'Store Owner' }

function loadUsers() {
  const saved = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
 
  const others = saved.filter(u => u.username !== OWNER.username && u.username !== 'admin')
  return [OWNER, ...others]
}

export const useAuth = defineStore('auth', () => {
  const users = ref(loadUsers())
  const current = ref(JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'))
  const isLoggedIn = computed(() => !!current.value)

  const persist = () => localStorage.setItem(USERS_KEY, JSON.stringify(users.value))

  function login(username, password) {
    const u = users.value.find(x => x.username === username.trim().toLowerCase() && x.password === password)
    if (!u) return 'Wrong username or password.'
    current.value = { username: u.username, name: u.name }
    localStorage.setItem(SESSION_KEY, JSON.stringify(current.value))
    return ''
  }

  function register(name, username, password) {
    const uname = username.trim().toLowerCase()
    if (users.value.some(x => x.username === uname)) return 'That username is already taken.'
    users.value.push({ username: uname, password, name: name.trim() })
    persist()
    return login(uname, password)
  }

  function logout() {
    current.value = null
    localStorage.removeItem(SESSION_KEY)
  }

  return { current, isLoggedIn, login, register, logout }
})