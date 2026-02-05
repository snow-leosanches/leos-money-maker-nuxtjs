<template>
  <div class="border-b border-default">
    <UContainer class="py-16 sm:py-24">
      <!-- Has Invest (stock customer): service details -->
      <template v-if="hasProduct">
        <div class="max-w-2xl mx-auto text-center mb-12">
          <span class="inline-flex items-center justify-center size-16 rounded-2xl bg-primary-500/10 text-primary-600 dark:text-primary-400 mb-4">
            <UIcon name="i-lucide-line-chart" class="size-8" />
          </span>
          <h1 class="text-3xl sm:text-4xl font-bold text-foreground">
            Invest — Stocks & ETFs
          </h1>
          <p class="text-muted mt-3 text-lg">
            You have access to stocks and ETFs. Manage your portfolio, research, and trade from your dashboard.
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
                  <UIcon name="i-lucide-check" class="size-4 text-primary-500 shrink-0" />
                  $0 commission on US stocks & ETFs
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-primary-500 shrink-0" />
                  Real-time quotes and watchlists
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-primary-500 shrink-0" />
                  Portfolio tracking and history
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-primary-500 shrink-0" />
                  Research and screeners
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

      <!-- Does not have Invest: add-service screen -->
      <template v-else>
        <div class="max-w-2xl mx-auto text-center mb-12">
          <span class="inline-flex items-center justify-center size-16 rounded-2xl bg-primary-500/10 text-primary-600 dark:text-primary-400 mb-4">
            <UIcon name="i-lucide-line-chart" class="size-8" />
          </span>
          <h1 class="text-3xl sm:text-4xl font-bold text-foreground">
            Add Invest — Stocks & ETFs
          </h1>
          <p class="text-muted mt-3 text-lg">
            Get access to US stocks and ETFs with $0 commission. Build your portfolio with the tools you need.
          </p>
        </div>
        <div class="max-w-xl mx-auto space-y-6">
          <UCard>
            <div class="space-y-4">
              <h2 class="font-semibold text-foreground">
                Why add Invest?
              </h2>
              <ul class="space-y-2 text-muted">
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-primary-500 shrink-0" />
                  $0 commission on stocks & ETFs
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-primary-500 shrink-0" />
                  No account minimum
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-primary-500 shrink-0" />
                  Research, screeners, and watchlists
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-primary-500 shrink-0" />
                  Trade from web and mobile
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
              Log in to add Invest
            </UButton>
            <UButton to="/dashboard?added=invest" size="lg" :variant="isAuthenticated ? 'solid' : 'outline'" color="neutral">
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

const hasProduct = computed(() => currentCustomer.value === 'stock')

useSeoMeta({
  title: "Invest — Leo's Money Maker",
  description: "Stocks and ETFs with $0 commission. Add or manage your Invest account."
})
</script>
