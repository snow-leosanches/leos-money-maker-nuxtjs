<template>
  <UContainer class="py-8">
    <UAlert
      v-if="addedProductBanner"
      v-model:open="addedBannerOpen"
      color="primary"
      variant="soft"
      :title="`${addedProductBanner} has been added to your account`"
      description="It may take up to 48 hours to activate. We'll notify you when it's ready."
      icon="i-lucide-clock"
      close
      class="mb-8"
      @update:open="onAddedBannerClose"
    />

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
const route = useRoute()
const router = useRouter()

const { currentCustomer, customerProfiles } = useAuth()

const currentProfile = computed(() =>
  customerProfiles.find((p) => p.id === currentCustomer.value)
)

const addedProductLabels: Record<string, string> = {
  invest: 'Invest',
  crypto: 'Crypto',
  retirement: 'Retirement'
}

const addedProductBanner = computed(() => {
  const added = route.query.added as string
  return added && addedProductLabels[added] ? addedProductLabels[added] : null
})

const addedBannerOpen = ref(true)

function onAddedBannerClose(isOpen: boolean) {
  if (!isOpen) router.replace({ path: '/dashboard', query: {} })
}
</script>
