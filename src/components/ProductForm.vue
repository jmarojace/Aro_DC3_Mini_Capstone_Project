<script setup>
import { reactive, watch, computed } from 'vue'

const props = defineProps({ product: { type: Object, default: null } })
const emit = defineEmits(['save', 'cancel'])

const blank = () => ({ name: '', category: 'Food', price: 0, stock: 0, reorder: 5 })
const form = reactive(blank())

watch(() => props.product, p => Object.assign(form, p ? { ...p } : blank()), { immediate: true })

const valid = computed(() => form.name.trim() && form.price > 0 && form.stock >= 0)
const submit = () => valid.value && emit('save', { ...form, name: form.name.trim() })
</script>

<template>
  <form class="panel form" @submit.prevent="submit">
    <h2>{{ product ? 'Edit product' : 'Add product' }}</h2>
    <label>Name <input v-model="form.name" required /></label>
    <label>Category
      <select v-model="form.category">
        <option>Food</option><option>Drinks</option><option>Household</option><option>Other</option>
      </select>
    </label>
    <div class="row">
      <label>Price (₱) <input v-model.number="form.price" type="number" min="0" step="0.5" /></label>
      <label>Stock <input v-model.number="form.stock" type="number" min="0" /></label>
      <label>Reorder at <input v-model.number="form.reorder" type="number" min="0" /></label>
    </div>
    <div class="row">
      <button class="btn primary" :disabled="!valid">Save product</button>
      <button type="button" class="btn" @click="emit('cancel')">Cancel</button>
    </div>
  </form>
</template>
