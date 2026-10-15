<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: { type: Object, required: true },
  compact: { type: Boolean, default: false }
})

const colors = ['#e6a63a', '#73a9a1', '#d47a5f', '#8c9fc4', '#92a85d', '#c883a5', '#d18b43', '#61a3be']
const color = computed(() => colors[Math.abs(Number(props.product.id) || 0) % colors.length])
const name = computed(() => props.product.name.toLowerCase())
const kind = computed(() => {
  if (name.value.includes('egg')) return 'eggs'
  if (name.value.includes('candle')) return 'candle'
  if (name.value.includes('pandesal')) return 'bread'
  if (name.value.includes('soap') && !name.value.includes('liquid')) return 'soap'
  if (name.value.includes('sardine') || name.value.includes('corned beef') || name.value.includes('evaporated milk')) return 'can'
  if (/oil|water|softdrink|soy sauce|dishwashing|shampoo|lighter/.test(name.value)) return 'bottle'
  return 'bag'
})
const label = computed(() => props.product.name.split(/\s+/).slice(0, 2).join(' '))
</script>

<template>
  <span class="product-art" :class="{ compact }" aria-hidden="true" :style="{ '--pack-color': color }">
    <svg viewBox="0 0 120 100" role="presentation">
      <ellipse cx="60" cy="87" rx="34" ry="6" fill="#173e43" fill-opacity=".12" />

      <g v-if="kind === 'bottle'" stroke="#183d43" stroke-width="2.5" stroke-linejoin="round">
        <path d="M50 17h20v11l8 8v42a6 6 0 0 1-6 6H48a6 6 0 0 1-6-6V36l8-8z" fill="var(--pack-color)" />
        <path d="M50 17h20v8H50z" fill="#f5e8c9" />
        <path d="M43 49h34v19H43z" fill="#fffaf0" />
        <path d="M50 37h20" stroke="#fff" stroke-opacity=".7" stroke-width="3" />
        <text x="60" y="61" text-anchor="middle" fill="#183d43" stroke="none" font-size="7" font-weight="700">{{ label }}</text>
      </g>

      <g v-else-if="kind === 'can'" stroke="#183d43" stroke-width="2.5" stroke-linejoin="round">
        <path d="M39 29q21-9 42 0v47q-21 9-42 0z" fill="var(--pack-color)" />
        <ellipse cx="60" cy="29" rx="21" ry="7" fill="#f7ead0" />
        <path d="M39 42h42v22H39z" fill="#fffaf0" />
        <text x="60" y="55" text-anchor="middle" fill="#183d43" stroke="none" font-size="7" font-weight="700">{{ label }}</text>
        <path d="M43 77q17 7 34 0" fill="none" />
      </g>

      <g v-else-if="kind === 'eggs'" stroke="#183d43" stroke-width="2.5" stroke-linejoin="round">
        <path d="M34 48h52l-5 29H39z" fill="var(--pack-color)" />
        <ellipse cx="47" cy="46" rx="9" ry="14" fill="#fff5d9" />
        <ellipse cx="61" cy="43" rx="9" ry="15" fill="#f3dfad" />
        <ellipse cx="74" cy="46" rx="9" ry="14" fill="#fff5d9" />
        <path d="M42 66h36" stroke="#fff" stroke-opacity=".7" />
      </g>

      <g v-else-if="kind === 'candle'" stroke="#183d43" stroke-width="2.5" stroke-linejoin="round">
        <path d="M59 25c-10 12-7 16 1 19 7-5 9-11-1-19z" fill="#f0b429" />
        <path d="M60 42v7" />
        <path d="M43 49q17 5 34 0v27q-17 7-34 0z" fill="var(--pack-color)" />
        <ellipse cx="60" cy="49" rx="17" ry="6" fill="#fff4d7" />
        <path d="M60 49v8" />
      </g>

      <g v-else-if="kind === 'bread'" stroke="#183d43" stroke-width="2.5" stroke-linejoin="round">
        <path d="M35 68q-4-7 2-13-2-12 10-15 7-13 19-5 14-6 19 8 10 9 2 25z" fill="var(--pack-color)" />
        <path d="M45 49q7-9 14 0m2-4q7-9 13 0" fill="none" stroke="#ffe8ba" stroke-width="4" />
        <path d="M38 68h47" stroke="#fff4d7" stroke-width="5" />
      </g>

      <g v-else-if="kind === 'soap'" stroke="#183d43" stroke-width="2.5" stroke-linejoin="round">
        <rect x="35" y="39" width="50" height="36" rx="13" fill="var(--pack-color)" />
        <path d="M45 49q15-9 30 0" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="3" />
        <text x="60" y="63" text-anchor="middle" fill="#fffaf0" stroke="none" font-size="7" font-weight="700">{{ label }}</text>
      </g>

      <g v-else stroke="#183d43" stroke-width="2.5" stroke-linejoin="round">
        <path d="M40 27h40l5 11v39q-25 10-50 0V38z" fill="var(--pack-color)" />
        <path d="M40 27h40v11H40z" fill="#f6e9c9" />
        <path d="M39 49h43v17H39z" fill="#fffaf0" />
        <text x="60" y="60" text-anchor="middle" fill="#183d43" stroke="none" font-size="7" font-weight="700">{{ label }}</text>
        <path d="M48 76h24" stroke="#fff" stroke-opacity=".7" />
      </g>
    </svg>
  </span>
</template>
