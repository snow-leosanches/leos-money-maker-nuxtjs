<template>
  <div class="border-b border-default">
    <UContainer class="py-16 sm:py-24">
      <!-- Has Retirement: service details -->
      <template v-if="hasProduct">
        <div class="max-w-2xl mx-auto text-center mb-12">
          <span class="inline-flex items-center justify-center size-16 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
            <UIcon name="i-lucide-piggy-bank" class="size-8" />
          </span>
          <h1 class="text-3xl sm:text-4xl font-bold text-foreground">
            Retirement & Education
          </h1>
          <p class="text-muted mt-3 text-lg">
            You have access to 401(k) and 529 accounts. View allocation, modify fund selection, and track your progress.
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
                  <UIcon name="i-lucide-check" class="size-4 text-emerald-500 shrink-0" />
                  401(k) and IRA accounts
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-emerald-500 shrink-0" />
                  529 education savings plans
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-emerald-500 shrink-0" />
                  Custom fund selection (Fidelity, Vanguard, Morningstar-style)
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-emerald-500 shrink-0" />
                  Portfolio composition and allocation view
                </li>
              </ul>
            </div>
          </UCard>
          <div class="flex flex-col sm:flex-row justify-center gap-3">
            <UButton to="/dashboard" size="lg" trailing-icon="i-lucide-arrow-right">
              Go to dashboard
            </UButton>
            <UButton to="/dashboard/retirement/funds" size="lg" color="neutral" variant="outline">
              Modify fund selection
            </UButton>
          </div>
        </div>
      </template>

      <!-- Does not have Retirement: add-service screen -->
      <template v-else>
        <div class="max-w-2xl mx-auto text-center mb-12">
          <span class="inline-flex items-center justify-center size-16 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
            <UIcon name="i-lucide-piggy-bank" class="size-8" />
          </span>
          <h1 class="text-3xl sm:text-4xl font-bold text-foreground">
            Add Retirement & Education
          </h1>
          <p class="text-muted mt-3 text-lg">
            Get 401(k), IRA, and 529 accounts in one place. Choose your funds and save for retirement and education with tax-advantaged plans.
          </p>
        </div>
        <div class="max-w-xl mx-auto space-y-6">
          <UCard>
            <div class="space-y-4">
              <h2 class="font-semibold text-foreground">
                Why add Retirement?
              </h2>
              <ul class="space-y-2 text-muted">
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-emerald-500 shrink-0" />
                  401(k), Traditional & Roth IRA
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-emerald-500 shrink-0" />
                  529 education savings
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-emerald-500 shrink-0" />
                  Broad fund lineup (Fidelity, Vanguard, Morningstar-style)
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-emerald-500 shrink-0" />
                  Rollover and transfer support
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
              Log in to add Retirement
            </UButton>
            <UButton to="/dashboard?added=retirement" size="lg" :variant="isAuthenticated ? 'solid' : 'outline'" color="neutral">
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

const hasProduct = computed(() => currentCustomer.value === 'retirement')

useSeoMeta({
  title: "Retirement & Education — Leo's Money Maker",
  description: "401(k), IRA, and 529 plans. Add or manage your Retirement account."
})
</script>
