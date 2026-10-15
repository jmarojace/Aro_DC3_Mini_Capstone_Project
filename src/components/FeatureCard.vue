<script setup>
defineProps({ title: { type: String, required: true } })
</script>

<template>
  <article class="feature">
    <div class="feature-icon"><slot name="icon" /></div>
    <h3>{{ title }}</h3>
    <slot />
  </article>
</template>
