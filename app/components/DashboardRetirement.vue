<template>
  <div class="space-y-8">
    <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-foreground">
          Retirement & Education
        </h1>
        <p class="text-muted text-sm mt-1">
          Portfolio composition for your 401(k) and 529 accounts.
        </p>
      </div>
      <UButton
        to="/dashboard/retirement/funds"
        label="Modify fund selection"
        trailing-icon="i-lucide-arrow-right"
      />
    </div>

    <div class="grid lg:grid-cols-2 gap-8">
      <!-- 401(k) -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <span class="flex items-center justify-center size-10 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400">
              <UIcon name="i-lucide-piggy-bank" class="size-5" />
            </span>
            <div>
              <h2 class="font-semibold text-foreground">
                401(k) Plan
              </h2>
              <p class="text-sm text-muted">
                Balance: {{ formatUsd(total401k) }}
              </p>
            </div>
          </div>
        </template>
        <div class="space-y-4">
          <div
            v-for="item in allocation401kWithNames"
            :key="item.fundId + item.percent"
            class="flex items-center gap-4"
          >
            <div class="flex-1 min-w-0">
              <div class="flex justify-between text-sm mb-1">
                <span class="font-medium text-foreground">{{ item.label }}</span>
                <span class="tabular-nums text-muted">{{ item.percent }}%</span>
              </div>
              <div class="h-3 rounded-full bg-muted overflow-hidden">
                <div
                  class="h-full rounded-full bg-primary-500 transition-all duration-500"
                  :style="{ width: `${item.percent}%` }"
                />
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- 529 -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <span class="flex items-center justify-center size-10 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <UIcon name="i-lucide-graduation-cap" class="size-5" />
            </span>
            <div>
              <h2 class="font-semibold text-foreground">
                529 Education Savings
              </h2>
              <p class="text-sm text-muted">
                Balance: {{ formatUsd(total529) }}
              </p>
            </div>
          </div>
        </template>
        <div class="space-y-4">
          <div
            v-for="item in allocation529WithNames"
            :key="item.fundId + item.percent"
            class="flex items-center gap-4"
          >
            <div class="flex-1 min-w-0">
              <div class="flex justify-between text-sm mb-1">
                <span class="font-medium text-foreground">{{ item.label }}</span>
                <span class="tabular-nums text-muted">{{ item.percent }}%</span>
              </div>
              <div class="h-3 rounded-full bg-muted overflow-hidden">
                <div
                  class="h-full rounded-full bg-blue-500 transition-all duration-500"
                  :style="{ width: `${item.percent}%` }"
                />
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  allocation401kWithNames,
  allocation529WithNames,
  total401k,
  total529
} = useRetirementAllocation()

function formatUsd(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(n)
}
</script>
