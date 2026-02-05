<template>
  <div class="space-y-8">
    <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-foreground">
          Crypto Wallets
        </h1>
        <p class="text-muted text-sm mt-1">
          {{ binanceConnected ? 'Live prices via Binance WebSocket.' : 'Connecting to live prices…' }}
        </p>
      </div>
      <div
        v-if="binanceConnected"
        class="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400"
      >
        <span class="size-2 rounded-full bg-emerald-500 animate-pulse" />
        Live
      </div>
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
        <div v-if="w.sparkline && w.sparkline.length > 1" class="mt-4 h-14 w-full">
          <svg
            :viewBox="`0 0 ${w.sparkline.length} 40`"
            class="w-full h-full text-amber-500"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient :id="`grad-${w.id}`" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="currentColor" stop-opacity="0.4" />
                <stop offset="100%" stop-color="currentColor" stop-opacity="0" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              :points="sparklinePoints(w.sparkline)"
            />
            <polygon
              :fill="'url(#grad-' + w.id + ')'"
              stroke="none"
              :points="sparklineFillPoints(w.sparkline)"
            />
          </svg>
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
const { wallets, binanceConnected } = useCryptoWallets()

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

function sparklinePoints(series: number[]): string {
  if (series.length < 2) return ''
  const min = Math.min(...series)
  const max = Math.max(...series)
  const range = max - min || 1
  return series
    .map((y, i) => `${i},${40 - ((y - min) / range) * 36}`)
    .join(' ')
}

function sparklineFillPoints(series: number[]): string {
  if (series.length < 2) return ''
  const min = Math.min(...series)
  const max = Math.max(...series)
  const range = max - min || 1
  const line = series
    .map((y, i) => `${i},${40 - ((y - min) / range) * 36}`)
    .join(' ')
  const last = series.length - 1
  return `0,40 ${line} ${last},40`
}
</script>
