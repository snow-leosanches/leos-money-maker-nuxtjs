<template>
  <div class="relative w-full max-w-md">
    <UInput
      v-model="query"
      type="search"
      placeholder="Search stocks by symbol or name..."
      size="md"
      class="w-full"
      autocomplete="off"
      @focus="loadAndOpen"
      @blur="onBlur"
    >
      <template #leading>
        <UIcon name="i-lucide-search" class="size-4 text-muted" />
      </template>
    </UInput>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open && query.length >= 1"
        class="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg border border-default bg-background shadow-lg overflow-hidden"
      >
        <ul class="max-h-72 overflow-y-auto py-1">
          <template v-if="results.length > 0">
            <li
              v-for="item in results"
              :key="item.symbol"
              class="flex items-center justify-between gap-2 px-3 py-2 cursor-pointer hover:bg-muted/50"
              @mousedown.prevent="select(item)"
            >
              <span class="font-semibold text-foreground">{{ item.symbol }}</span>
              <span class="text-sm text-muted truncate flex-1 text-right">{{ item.name }}</span>
            </li>
          </template>
          <li
            v-else-if="query.length >= 1"
            class="px-3 py-4 text-sm text-muted text-center"
          >
            No stocks found for "{{ query }}"
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { StockSearchResult } from '~/composables/useStockSearch'

const router = useRouter()
const { loadStocks, search } = useStockSearch()

const query = ref('')
const open = ref(false)

const results = computed(() => {
  const q = query.value.trim()
  if (q.length < 1) return []
  return search(q)
})

let blurTimer: ReturnType<typeof setTimeout> | null = null

async function loadAndOpen() {
  await loadStocks()
  open.value = true
}

function onBlur() {
  blurTimer = setTimeout(() => {
    open.value = false
    blurTimer = null
  }, 150)
}

function select(item: StockSearchResult) {
  if (blurTimer) clearTimeout(blurTimer)
  open.value = false
  query.value = ''
  router.push(`/dashboard/stock/${item.symbol}`)
}
</script>
