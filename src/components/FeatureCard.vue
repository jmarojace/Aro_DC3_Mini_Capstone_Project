<script setup>
defineProps({ title: { type: String, required: true } })
</script>

<template>
  <article class="feature">
    <h3>{{ title }}</h3>
    <slot />
  </article>
</template>