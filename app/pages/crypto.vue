<template>
  <div class="border-b border-default">
    <UContainer class="py-16 sm:py-24">
      <!-- Has Crypto: service details -->
      <template v-if="hasProduct">
        <div class="max-w-2xl mx-auto text-center mb-12">
          <span class="inline-flex items-center justify-center size-16 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4">
            <UIcon name="i-lucide-bitcoin" class="size-8" />
          </span>
          <h1 class="text-3xl sm:text-4xl font-bold text-foreground">
            Crypto
          </h1>
          <p class="text-muted mt-3 text-lg">
            You have access to crypto. View balances, prices, and manage your wallets from your dashboard.
          </p>
        </div>
        <div class="max-w-xl mx-auto space-y-6">
          <UCard>
            <div class="space-y-4">
              <h2 class="font-semibold text-foreground">
                What's included
              </h2>
              <ul class="space-y-2 text-muted">
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-amber-500 shrink-0" />
                  Bitcoin, Ethereum, Litecoin, Bitcoin Cash & more
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-amber-500 shrink-0" />
                  24/7 trading and live prices
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-amber-500 shrink-0" />
                  Secure wallets and balance tracking
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-amber-500 shrink-0" />
                  Transparent pricing and spreads
                </li>
              </ul>
            </div>
          </UCard>
          <div class="flex justify-center">
            <UButton to="/dashboard" size="lg" trailing-icon="i-lucide-arrow-right">
              Go to dashboard
            </UButton>
          </div>
        </div>
      </template>

      <!-- Does not have Crypto: add-service screen -->
      <template v-else>
        <div class="max-w-2xl mx-auto text-center mb-12">
          <span class="inline-flex items-center justify-center size-16 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4">
            <UIcon name="i-lucide-bitcoin" class="size-8" />
          </span>
          <h1 class="text-3xl sm:text-4xl font-bold text-foreground">
            Add Crypto
          </h1>
          <p class="text-muted mt-3 text-lg">
            Buy and sell Bitcoin, Ethereum, and other top cryptocurrencies. 24/7 trading with transparent pricing.
          </p>
        </div>
        <div class="max-w-xl mx-auto space-y-6">
          <UCard>
            <div class="space-y-4">
              <h2 class="font-semibold text-foreground">
                Why add Crypto?
              </h2>
              <ul class="space-y-2 text-muted">
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-amber-500 shrink-0" />
                  BTC, ETH, LTC, BCH and more
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-amber-500 shrink-0" />
                  Trade 24/7 with live prices
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-amber-500 shrink-0" />
                  Secure custody and wallets
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-amber-500 shrink-0" />
                  No hidden fees — clear spreads
                </li>
              </ul>
            </div>
          </UCard>
          <div class="flex flex-col sm:flex-row justify-center gap-3">
            <UButton
              v-if="!isAuthenticated"
              to="/login"
              size="lg"
              trailing-icon="i-lucide-arrow-right"
            >
              Log in to add Crypto
            </UButton>
            <UButton to="/dashboard?added=crypto" size="lg" :variant="isAuthenticated ? 'solid' : 'outline'" color="neutral">
              Sign up
            </UButton>
          </div>
        </div>
      </template>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const { currentCustomer, isAuthenticated } = useAuth()

const hasProduct = computed(() => currentCustomer.value === 'crypto')

useSeoMeta({
  title: "Crypto — Leo's Money Maker",
  description: "Buy and sell Bitcoin, Ethereum, and more. Add or manage your Crypto account."
})
</script>
