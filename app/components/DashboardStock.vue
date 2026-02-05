<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-foreground">
        Today's Markets
      </h1>
      <p class="text-muted text-sm mt-1">
        Live prices update every 3 seconds. Demo data.
      </p>
    </div>

    <!-- Ticker strip (duplicated for seamless loop) -->
    <div class="overflow-hidden rounded-xl border border-default bg-muted/20 py-3 px-4">
      <div class="flex gap-8 animate-ticker items-center w-max">
        <template v-for="(q, idx) in [...quotes, ...quotes]" :key="`${q.symbol}-${idx}`">
          <span class="flex items-center gap-2 shrink-0">
            <span class="font-semibold text-foreground">{{ q.symbol }}</span>
            <span class="tabular-nums">{{ formatPrice(q.price) }}</span>
            <span
              class="text-sm font-medium tabular-nums"
              :class="q.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
            >
              {{ q.change >= 0 ? '+' : '' }}{{ q.changePercent.toFixed(2) }}%
            </span>
          </span>
        </template>
      </div>
    </div>

    <!-- Stock table with sparklines -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="font-semibold text-foreground">
            Watchlist
          </h2>
          <span class="text-xs text-muted">Updated every 3s</span>
        </div>
      </template>
      <UTable
        :data="tableRows"
        :columns="columns"
        class="w-full"
      >
        <template #price-cell="{ row }">
          <span class="tabular-nums font-medium">
            {{ formatPrice(row.original.price) }}
          </span>
        </template>
        <template #change-cell="{ row }">
          <span
            class="tabular-nums text-sm font-medium"
            :class="row.original.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
          >
            {{ row.original.change >= 0 ? '+' : '' }}{{ row.original.change.toFixed(2) }} ({{ row.original.changePercent >= 0 ? '+' : '' }}{{ row.original.changePercent.toFixed(2) }}%)
          </span>
        </template>
        <template #sparkline-cell="{ row }">
          <div class="h-8 w-24 min-w-[6rem]">
            <svg
              :viewBox="`0 0 ${row.original.sparkline.length} 20`"
              class="w-full h-full text-primary-500"
              preserveAspectRatio="none"
            >
              <polyline
                fill="none"
                stroke="currentColor"
                stroke-width="0.5"
                :points="row.original.sparkline.map((y: number, i: number) => `${i},${20 - scaleY(y, row.original.sparkline)}`).join(' ')"
              />
            </svg>
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const { quotes } = useStockTicker()

function formatPrice(p: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(p)
}

function scaleY(value: number, series: number[]) {
  const min = Math.min(...series)
  const max = Math.max(...series)
  const range = max - min || 1
  return ((value - min) / range) * 18
}

const columns = [
  { accessorKey: 'symbol', header: 'Symbol', meta: { class: { th: 'font-semibold' } } },
  { accessorKey: 'name', header: 'Company' },
  { accessorKey: 'price', header: 'Price' },
  { accessorKey: 'change', header: 'Change' },
  { accessorKey: 'sparkline', header: 'Today' }
]

const tableRows = computed(() =>
  quotes.value.map((q) => ({
    symbol: q.symbol,
    name: q.name,
    price: q.price,
    change: q.change,
    changePercent: q.changePercent,
    sparkline: q.sparkline
  }))
)
</script>
