<template>
  <nav class="hidden md:flex items-center gap-1">
    <UButton
      v-for="item in navItems"
      :key="item.label"
      :to="item.to"
      :label="item.label"
      variant="ghost"
      color="neutral"
      size="sm"
      class="font-medium"
    />
  </nav>
</template>

<script setup lang="ts">
const navItems = [
  { label: 'Invest', to: '#invest' },
  { label: 'Crypto', to: '#crypto' },
  { label: 'Retirement', to: '#retirement' },
  { label: 'Pricing', to: '#pricing' }
]
</script>
