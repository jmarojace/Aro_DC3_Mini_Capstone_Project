import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const KEY = 'mini-store-v1'
const seed = () => [
  // Food
  { id: 1, name: 'Instant Noodles', category: 'Food', price: 15, stock: 40, reorder: 10 },
  { id: 2, name: 'Cooking Oil 1L', category: 'Food', price: 95, stock: 3, reorder: 5 },
  { id: 3, name: 'White Rice 1kg', category: 'Food', price: 58, stock: 30, reorder: 10 },
  { id: 4, name: 'Canned Sardines', category: 'Food', price: 24, stock: 35, reorder: 12 },
  { id: 5, name: 'Corned Beef 150g', category: 'Food', price: 42, stock: 6, reorder: 8 },
  { id: 6, name: 'Egg (per piece)', category: 'Food', price: 9, stock: 60, reorder: 20 },
  { id: 7, name: 'Pandesal Pack', category: 'Food', price: 30, stock: 12, reorder: 5 },
  { id: 8, name: 'Sugar 1kg', category: 'Food', price: 75, stock: 18, reorder: 6 },
  { id: 9, name: 'Soy Sauce 385ml', category: 'Food', price: 22, stock: 20, reorder: 8 },
  // Drinks
  { id: 10, name: 'Bottled Water 500ml', category: 'Drinks', price: 20, stock: 8, reorder: 12 },
  { id: 11, name: 'Softdrink 1.5L', category: 'Drinks', price: 75, stock: 24, reorder: 10 },
  { id: 12, name: '3-in-1 Coffee Sachet', category: 'Drinks', price: 8, stock: 100, reorder: 30 },
  { id: 13, name: 'Powdered Juice Sachet', category: 'Drinks', price: 10, stock: 50, reorder: 15 },
  { id: 14, name: 'Evaporated Milk 410ml', category: 'Drinks', price: 38, stock: 0, reorder: 6 },
  // Household
  { id: 15, name: 'Laundry Soap', category: 'Household', price: 12, stock: 25, reorder: 8 },
  { id: 16, name: 'Dishwashing Liquid', category: 'Household', price: 28, stock: 14, reorder: 6 },
  { id: 17, name: 'Shampoo Sachet', category: 'Household', price: 7, stock: 80, reorder: 25 },
  { id: 18, name: 'Bath Soap', category: 'Household', price: 25, stock: 4, reorder: 8 },
  // Other
  { id: 19, name: 'Candle', category: 'Other', price: 10, stock: 22, reorder: 8 },
  { id: 20, name: 'Lighter', category: 'Other', price: 20, stock: 15, reorder: 5 }
]

export const useStore = defineStore('store', () => {
  const saved = JSON.parse(localStorage.getItem(KEY) || 'null')
  const products = ref(saved?.products ?? seed())
  const sales = ref(saved?.sales ?? [])
  const cart = ref([])

  // persist everything except the cart
  watch([products, sales], () => {
    localStorage.setItem(KEY, JSON.stringify({ products: products.value, sales: sales.value }))
  }, { deep: true })

  const lowStock = computed(() => products.value.filter(p => p.stock <= p.reorder))
  const inventoryValue = computed(() => products.value.reduce((s, p) => s + p.price * p.stock, 0))
  const cartTotal = computed(() => cart.value.reduce((s, i) => s + i.price * i.qty, 0))
  const revenue = computed(() => sales.value.reduce((s, x) => s + x.total, 0))
  const todaySales = computed(() => {
    const d = new Date().toDateString()
    return sales.value.filter(s => new Date(s.date).toDateString() === d)
  })

  function saveProduct(p) {
    if (p.id) {
      const i = products.value.findIndex(x => x.id === p.id)
      products.value[i] = { ...p }
    } else {
      products.value.push({ ...p, id: Date.now() })
    }
  }
  function deleteProduct(id) {
    products.value = products.value.filter(p => p.id !== id)
    cart.value = cart.value.filter(i => i.id !== id)
  }
  function addToCart(p) {
    const line = cart.value.find(i => i.id === p.id)
    if (line) {
      if (line.qty < p.stock) line.qty++
    } else if (p.stock > 0) {
      cart.value.push({ id: p.id, name: p.name, price: p.price, qty: 1 })
    }
  }
  function setQty(id, qty) {
    const p = products.value.find(x => x.id === id)
    const line = cart.value.find(i => i.id === id)
    if (!line) return
    if (qty <= 0) cart.value = cart.value.filter(i => i.id !== id)
    else line.qty = Math.min(qty, p.stock)
  }
  function checkout(cash) {
    if (!cart.value.length || cash < cartTotal.value) return false
    cart.value.forEach(i => { products.value.find(p => p.id === i.id).stock -= i.qty })
    sales.value.unshift({
      id: Date.now(),
      date: new Date().toISOString(),
      items: cart.value.map(i => ({ ...i })),
      total: cartTotal.value,
      cash,
      change: cash - cartTotal.value
    })
    cart.value = []
    return true
  }

  return { products, sales, cart, lowStock, inventoryValue, cartTotal, revenue, todaySales,
           saveProduct, deleteProduct, addToCart, setQty, checkout }
})
