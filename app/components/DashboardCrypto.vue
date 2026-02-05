<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-foreground">
        Crypto Wallets
      </h1>
      <p class="text-muted text-sm mt-1">
        Balances and prices update every 3 seconds. Demo data.
      </p>
    </div>

    <div class="grid sm:grid-cols-2 gap-6">
      <UCard
        v-for="w in wallets"
        :key="w.id"
        class="overflow-hidden"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-center gap-3">
            <span
              class="flex items-center justify-center size-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400"
            >
              <UIcon :name="w.icon" class="size-6" />
            </span>
            <div>
              <p class="font-semibold text-foreground">
                {{ w.name }}
              </p>
              <p class="text-sm text-muted">
                {{ formatBalance(w.balance) }} {{ w.symbol }}
              </p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-semibold tabular-nums text-foreground">
              {{ formatUsd(w.balance * w.priceUsd) }}
            </p>
            <p
              class="text-sm tabular-nums"
              :class="w.change24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
            >
              {{ w.change24h >= 0 ? '+' : '' }}{{ w.change24h.toFixed(2) }}% 24h
            </p>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t border-default">
          <p class="text-xs text-muted">
            {{ formatUsd(w.priceUsd) }} per {{ w.symbol }}
          </p>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const { wallets } = useCryptoWallets()

function formatBalance(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })
}

function formatUsd(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(n)
}
</script>
