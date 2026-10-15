<script setup>
import { onMounted } from 'vue'
import { useAuth } from '../stores/auth'
import FeatureCard from '../components/FeatureCard.vue'

const auth = useAuth()

const features = [
  { icon: '📦', title: 'Inventory', text: 'Find products fast, organize them by category, and keep quantities up to date.' },
  { icon: '🧾', title: 'Point of sale', text: 'Build a sale, take payment, calculate change, and update stock in one flow.' },
  { icon: '📈', title: 'Sales history', text: 'Look back at completed sales and keep an eye on your revenue.' },
  { icon: '🔔', title: 'Restock alerts', text: 'See what is running low before it catches you by surprise.' }
]
onMounted(() => { document.title = 'Mini Store | Home' })
</script>

<template>
  <header class="top landing-top">
    <RouterLink class="brand" to="/" aria-label="Mini Store home">Mini Store</RouterLink>
    <nav></nav>
    <RouterLink v-if="auth.isLoggedIn" class="btn ghost" to="/dashboard">Open dashboard <span aria-hidden="true">→</span></RouterLink>
    <RouterLink v-else class="btn ghost" to="/login">Sign in <span aria-hidden="true">→</span></RouterLink>
  </header>

  <main>
    <section class="hero">
      <div class="hero-copy">
        <span class="eyebrow"><i></i> YOUR STORE, IN GOOD ORDER</span>
        <h2>Know your stock.<br><span>Ring up sales.</span><br>Restock on time.</h2>
        <p>A simpler way to keep your shelves organized, checkout moving, and business on track.</p>
        <div class="hero-actions">
          <RouterLink class="btn primary" :to="auth.isLoggedIn ? '/dashboard' : '/login'">{{ auth.isLoggedIn ? 'Go to dashboard' : 'Get started' }} <span aria-hidden="true">→</span></RouterLink>
          <span class="hero-note">Made for the day-to-day of small stores</span>
        </div>
      </div>
      <div class="hero-art" aria-label="Store overview preview" role="img">
        <div class="art-glow"></div>
        <div class="mini-window">
          <div class="window-top"><span class="window-mark">M</span><b>Store overview</b><span class="live"><i></i> LIVE</span></div>
          <div class="overview-label">TODAY'S SALES</div>
          <div class="overview-total">$248.50 <span>↗ 12%</span></div>
          <div class="chart" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <div class="window-divider"></div>
          <div class="stock-row"><span class="stock-icon">📦</span><span><b>Stock status</b><small>Everything in one place</small></span><span class="stock-count">24 <small>items</small></span></div>
          <div class="restock-tag"><span>!</span> 3 items running low <b>View</b></div>
        </div>
        <div class="floating-receipt"><span>✓</span><div><b>Sale complete</b><small>Stock updated automatically</small></div></div>
      </div>
    </section>

    <section class="feature-section">
      <div class="section-heading"><div><span class="section-kicker">LESS GUESSWORK, MORE GOOD DAYS</span><h2>Everything your shop needs to stay in sync.</h2></div><p>One simple workspace for the essentials of running your store.</p></div>
      <div class="features">
      <FeatureCard v-for="f in features" :key="f.title" :title="f.title">
        <template #icon>{{ f.icon }}</template>
        <p class="muted">{{ f.text }}</p>
      </FeatureCard>
      </div>
    </section>

  </main>
</template>
