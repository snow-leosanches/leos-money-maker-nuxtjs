<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="font-semibold text-foreground">
          Portfolio
        </h2>
        <div class="text-right">
          <p class="text-sm text-muted">
            Total value
          </p>
          <p class="text-xl font-bold tabular-nums text-foreground">
            {{ formatUsd(totalValue) }}
          </p>
        </div>
      </div>
    </template>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-default text-muted">
            <th class="text-left py-2 font-medium">Symbol</th>
            <th class="text-left py-2 font-medium">Quantity</th>
            <th class="text-right py-2 font-medium">Price</th>
            <th class="text-right py-2 font-medium">Value</th>
            <th class="text-right py-2 font-medium">Change</th>
            <th class="w-10" />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="pos in positionsWithPrices"
            :key="pos.symbol"
            class="border-b border-default/50 hover:bg-muted/30"
          >
            <td class="py-3">
              <NuxtLink
                :to="`/dashboard/stock/${pos.symbol}`"
                class="font-semibold text-primary-600 dark:text-primary-400 hover:underline"
              >
                {{ pos.symbol }}
              </NuxtLink>
            </td>
            <td class="tabular-nums">
              {{ pos.quantity.toLocaleString() }}
            </td>
            <td class="text-right tabular-nums">
              {{ formatUsd(pos.price) }}
            </td>
            <td class="text-right tabular-nums font-medium">
              {{ formatUsd(pos.value) }}
            </td>
            <td
              class="text-right tabular-nums font-medium"
              :class="pos.changePercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
            >
              {{ pos.changePercent >= 0 ? '+' : '' }}{{ pos.changePercent.toFixed(2) }}%
            </td>
            <td>
              <UButton
                :to="`/dashboard/stock/${pos.symbol}`"
                icon="i-lucide-chevron-right"
                color="neutral"
                variant="ghost"
                size="xs"
                aria-label="View details"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <p class="text-xs text-muted">
        Prices update every 3 seconds. Click a symbol to buy or sell.
      </p>
    </template>
  </UCard>
</template>

<script setup lang="ts">
const { positionsWithPrices, totalValue } = usePortfolio()

function formatUsd(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(n)
}
</script>
