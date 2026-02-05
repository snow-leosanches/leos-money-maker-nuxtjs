<template>
  <UContainer class="py-8">
    <div class="mb-8">
      <UButton
        to="/dashboard"
        variant="ghost"
        color="neutral"
        size="sm"
        leading-icon="i-lucide-arrow-left"
        class="-ml-2"
      >
        Back to dashboard
      </UButton>
    </div>

    <template v-if="!resolved">
      <p class="text-muted">
        Loading…
      </p>
    </template>
    <template v-else-if="!stock">
      <p class="text-muted">
        Stock not found.
      </p>
      <UButton to="/dashboard" class="mt-4">
        Back to dashboard
      </UButton>
    </template>
    <template v-else-if="stock">
      <div class="space-y-8">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-foreground">
              {{ stock.name }}
            </h1>
            <p class="text-muted">
              {{ stock.symbol }} · Stock
            </p>
          </div>
          <div class="text-right">
            <p class="text-3xl font-bold tabular-nums text-foreground">
              {{ formatUsd(price) }}
            </p>
            <p
              class="text-sm font-medium tabular-nums"
              :class="changePercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
            >
              {{ changePercent >= 0 ? '+' : '' }}{{ changePercent.toFixed(2) }}% today
            </p>
          </div>
        </div>

        <!-- Position summary -->
        <UCard>
          <template #header>
            <h2 class="font-semibold text-foreground">
              Your position
            </h2>
          </template>
          <div class="grid sm:grid-cols-3 gap-6">
            <div>
              <p class="text-sm text-muted">Shares owned</p>
              <p class="text-xl font-semibold tabular-nums">
                {{ quantity.toLocaleString() }}
              </p>
            </div>
            <div>
              <p class="text-sm text-muted">Market value</p>
              <p class="text-xl font-semibold tabular-nums">
                {{ formatUsd(quantity * price) }}
              </p>
            </div>
            <div>
              <p class="text-sm text-muted">Avg. cost (mock)</p>
              <p class="text-xl font-semibold tabular-nums text-muted">
                {{ formatUsd(stock.basePrice) }}
              </p>
            </div>
          </div>
        </UCard>

        <!-- Buy / Sell -->
        <div class="grid sm:grid-cols-2 gap-6">
          <UCard>
            <template #header>
              <h2 class="font-semibold text-foreground flex items-center gap-2">
                <UIcon name="i-lucide-trending-up" class="size-5 text-green-500" />
                Buy
              </h2>
            </template>
            <UForm :state="buyState" @submit.prevent="onBuy">
              <UFormField label="Number of shares">
                <UInput
                  v-model.number="buyState.shares"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="0"
                  size="lg"
                />
              </UFormField>
              <p class="text-sm text-muted mt-2">
                Est. cost: {{ formatUsd((buyState.shares || 0) * price) }}
              </p>
              <UButton
                type="submit"
                class="mt-4 w-full"
                size="lg"
                :disabled="!buyState.shares || buyState.shares < 1"
              >
                Buy {{ stock.symbol }}
              </UButton>
            </UForm>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="font-semibold text-foreground flex items-center gap-2">
                <UIcon name="i-lucide-trending-down" class="size-5 text-red-500" />
                Sell
              </h2>
            </template>
            <UForm :state="sellState" @submit.prevent="onSell">
              <UFormField label="Number of shares">
                <UInput
                  v-model.number="sellState.shares"
                  type="number"
                  :min="1"
                  :max="quantity"
                  step="1"
                  placeholder="0"
                  size="lg"
                />
              </UFormField>
              <p class="text-sm text-muted mt-2">
                You own {{ quantity.toLocaleString() }} shares · Est. proceeds: {{ formatUsd((sellState.shares || 0) * price) }}
              </p>
              <UButton
                type="submit"
                color="neutral"
                variant="outline"
                class="mt-4 w-full"
                size="lg"
                :disabled="quantity === 0 || !sellState.shares || sellState.shares < 1 || sellState.shares > quantity"
              >
                Sell {{ stock.symbol }}
              </UButton>
              <UButton
                type="button"
                color="neutral"
                variant="ghost"
                class="mt-2 w-full"
                size="lg"
                :disabled="quantity === 0"
                @click="onSellAll"
              >
                Sell All
              </UButton>
            </UForm>
          </UCard>
        </div>

        <p v-if="message" class="text-sm" :class="messageSuccess ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
          {{ message }}
        </p>
      </div>
    </template>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const symbol = computed(() => (route.params.symbol as string)?.toUpperCase() ?? '')

const { getPosition, buy, sell, PORTFOLIO_STOCKS, hydrate } = usePortfolio()
const { loadStocks, stocks: searchStocks } = useStockSearch()

const stockFromSearch = ref<{ symbol: string; name: string; basePrice: number } | null>(null)
const resolved = ref(false)

const stock = computed(() =>
  PORTFOLIO_STOCKS.find((s) => s.symbol === symbol.value) ?? stockFromSearch.value
)

const position = computed(() => {
  const s = stock.value
  if (PORTFOLIO_STOCKS.some((p) => p.symbol === symbol.value)) return getPosition(symbol.value)
  if (s) return getPosition(symbol.value, { name: s.name, basePrice: s.basePrice })
  return null
})

watch(symbol, async (sym) => {
  stockFromSearch.value = null
  resolved.value = false
  if (!sym) {
    resolved.value = true
    return
  }
  if (PORTFOLIO_STOCKS.some((s) => s.symbol === sym)) {
    resolved.value = true
    return
  }
  await loadStocks()
  const list = searchStocks.value
  if (list) {
    const found = list.find((s) => s.symbol.toUpperCase() === sym)
    if (found) stockFromSearch.value = { symbol: found.symbol, name: found.name, basePrice: 100 }
  }
  resolved.value = true
}, { immediate: true })

const price = computed(() => position.value?.price ?? stock.value?.basePrice ?? 0)
const changePercent = computed(() => {
  const pos = position.value
  const s = stock.value
  if (!pos || !s) return 0
  return ((pos.price - s.basePrice) / s.basePrice) * 100
})
const quantity = computed(() => position.value?.quantity ?? 0)

const buyState = reactive({ shares: undefined as number | undefined })
const sellState = reactive({ shares: undefined as number | undefined })
const message = ref('')
const messageSuccess = ref(true)

onMounted(() => {
  hydrate()
})

function formatUsd(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(n)
}

function onBuy() {
  const shares = buyState.shares ?? 0
  if (shares < 1) return
  const ok = buy(symbol.value, shares)
  if (ok) {
    message.value = `Bought ${shares} share(s) of ${symbol.value}.`
    messageSuccess.value = true
    buyState.shares = undefined
  } else {
    message.value = 'Could not complete buy.'
    messageSuccess.value = false
  }
  setTimeout(() => { message.value = '' }, 4000)
}

function onSell() {
  const shares = sellState.shares ?? 0
  if (shares < 1 || shares > quantity.value) return
  const ok = sell(symbol.value, shares)
  if (ok) {
    message.value = `Sold ${shares} share(s) of ${symbol.value}.`
    messageSuccess.value = true
    sellState.shares = undefined
  } else {
    message.value = 'Could not complete sell (check quantity).'
    messageSuccess.value = false
  }
  setTimeout(() => { message.value = '' }, 4000)
}

function onSellAll() {
  const qty = quantity.value
  if (qty === 0) return
  const ok = sell(symbol.value, qty)
  if (ok) {
    message.value = `Sold all ${qty.toLocaleString()} share(s) of ${symbol.value}.`
    messageSuccess.value = true
    sellState.shares = undefined
  } else {
    message.value = 'Could not complete sell.'
    messageSuccess.value = false
  }
  setTimeout(() => { message.value = '' }, 4000)
}
</script>
