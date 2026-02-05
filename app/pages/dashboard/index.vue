<template>
  <UContainer class="py-8">
    <p class="text-sm text-muted mb-8">
      Logged in as
      <span class="font-medium text-foreground">{{ currentProfile?.name }}</span>
    </p>

    <DashboardStock v-if="currentCustomer === 'stock'" />
    <DashboardCrypto v-else-if="currentCustomer === 'crypto'" />
    <DashboardRetirement v-else-if="currentCustomer === 'retirement'" />
  </UContainer>
</template>

<script setup lang="ts">
const { currentCustomer, customerProfiles } = useAuth()

const currentProfile = computed(() =>
  customerProfiles.find((p) => p.id === currentCustomer.value)
)
</script>
