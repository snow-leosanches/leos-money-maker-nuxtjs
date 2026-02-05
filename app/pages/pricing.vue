<template>
  <div class="border-b border-default">
    <UContainer class="py-16 sm:py-24">
      <div class="max-w-4xl mx-auto text-center mb-14">
        <h1 class="text-3xl sm:text-4xl font-bold text-foreground">
          Leo's Money Maker — Pricing
        </h1>
        <p class="text-muted mt-3 text-lg">
          Transparent pricing for every service. No hidden fees.
        </p>
      </div>

      <div class="grid gap-10">
        <!-- Stocks & ETFs -->
        <section class="rounded-2xl border border-default bg-default/50 overflow-hidden">
          <div class="flex items-center gap-3 p-6 border-b border-default bg-primary-500/5">
            <span class="flex items-center justify-center size-12 rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400">
              <UIcon name="i-lucide-line-chart" class="size-6" />
            </span>
            <div>
              <h2 class="text-xl font-semibold text-foreground">
                Stocks & ETFs (Invest)
              </h2>
              <p class="text-sm text-muted">
                US stocks, ETFs, and options
              </p>
            </div>
          </div>
          <div class="p-6 grid sm:grid-cols-3 gap-6">
            <div
              v-for="plan in plansInvest"
              :key="plan.id"
              class="rounded-xl border border-default p-5 flex flex-col"
              :class="{ 'ring-2 ring-primary-500': plan.featured }"
            >
              <p class="font-semibold text-foreground">{{ plan.name }}</p>
              <p class="text-2xl font-bold text-primary-600 dark:text-primary-400 mt-1">{{ plan.price }}</p>
              <p class="text-xs text-muted mt-0.5">{{ plan.note }}</p>
              <ul class="mt-4 space-y-2 text-sm text-muted flex-1">
                <li v-for="f in plan.features" :key="f" class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-primary-500 shrink-0" />
                  {{ f }}
                </li>
              </ul>
              <UButton
                v-if="plan.cta"
                :to="plan.cta"
                size="sm"
                class="mt-4 w-full"
                :variant="plan.featured ? 'solid' : 'outline'"
              >
                {{ plan.ctaLabel }}
              </UButton>
            </div>
          </div>
        </section>

        <!-- Crypto -->
        <section class="rounded-2xl border border-default bg-default/50 overflow-hidden">
          <div class="flex items-center gap-3 p-6 border-b border-default bg-amber-500/5">
            <span class="flex items-center justify-center size-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <UIcon name="i-lucide-bitcoin" class="size-6" />
            </span>
            <div>
              <h2 class="text-xl font-semibold text-foreground">
                Crypto
              </h2>
              <p class="text-sm text-muted">
                Bitcoin, Ethereum, and more — 24/7
              </p>
            </div>
          </div>
          <div class="p-6 grid sm:grid-cols-3 gap-6">
            <div
              v-for="plan in plansCrypto"
              :key="plan.id"
              class="rounded-xl border border-default p-5 flex flex-col"
              :class="{ 'ring-2 ring-amber-500': plan.featured }"
            >
              <p class="font-semibold text-foreground">{{ plan.name }}</p>
              <p class="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{{ plan.price }}</p>
              <p class="text-xs text-muted mt-0.5">{{ plan.note }}</p>
              <ul class="mt-4 space-y-2 text-sm text-muted flex-1">
                <li v-for="f in plan.features" :key="f" class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-amber-500 shrink-0" />
                  {{ f }}
                </li>
              </ul>
              <UButton
                v-if="plan.cta"
                :to="plan.cta"
                size="sm"
                class="mt-4 w-full"
                :variant="plan.featured ? 'solid' : 'outline'"
              >
                {{ plan.ctaLabel }}
              </UButton>
            </div>
          </div>
        </section>

        <!-- 401(k) & 529 (Retirement) -->
        <section class="rounded-2xl border border-default bg-default/50 overflow-hidden">
          <div class="flex items-center gap-3 p-6 border-b border-default bg-emerald-500/5">
            <span class="flex items-center justify-center size-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <UIcon name="i-lucide-piggy-bank" class="size-6" />
            </span>
            <div>
              <h2 class="text-xl font-semibold text-foreground">
                401(k) & IRA
              </h2>
              <p class="text-sm text-muted">
                Retirement accounts and rollovers
              </p>
            </div>
          </div>
          <div class="p-6 grid sm:grid-cols-3 gap-6">
            <div
              v-for="plan in plans401k"
              :key="plan.id"
              class="rounded-xl border border-default p-5 flex flex-col"
              :class="{ 'ring-2 ring-emerald-500': plan.featured }"
            >
              <p class="font-semibold text-foreground">{{ plan.name }}</p>
              <p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{{ plan.price }}</p>
              <p class="text-xs text-muted mt-0.5">{{ plan.note }}</p>
              <ul class="mt-4 space-y-2 text-sm text-muted flex-1">
                <li v-for="f in plan.features" :key="f" class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-emerald-500 shrink-0" />
                  {{ f }}
                </li>
              </ul>
              <UButton
                v-if="plan.cta"
                :to="plan.cta"
                size="sm"
                class="mt-4 w-full"
                :variant="plan.featured ? 'solid' : 'outline'"
              >
                {{ plan.ctaLabel }}
              </UButton>
            </div>
          </div>
        </section>

        <section class="rounded-2xl border border-default bg-default/50 overflow-hidden">
          <div class="flex items-center gap-3 p-6 border-b border-default bg-blue-500/5">
            <span class="flex items-center justify-center size-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <UIcon name="i-lucide-graduation-cap" class="size-6" />
            </span>
            <div>
              <h2 class="text-xl font-semibold text-foreground">
                529 Education Savings
              </h2>
              <p class="text-sm text-muted">
                Tax-advantaged college and K–12 savings
              </p>
            </div>
          </div>
          <div class="p-6 grid sm:grid-cols-3 gap-6">
            <div
              v-for="plan in plans529"
              :key="plan.id"
              class="rounded-xl border border-default p-5 flex flex-col"
              :class="{ 'ring-2 ring-blue-500': plan.featured }"
            >
              <p class="font-semibold text-foreground">{{ plan.name }}</p>
              <p class="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{{ plan.price }}</p>
              <p class="text-xs text-muted mt-0.5">{{ plan.note }}</p>
              <ul class="mt-4 space-y-2 text-sm text-muted flex-1">
                <li v-for="f in plan.features" :key="f" class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="size-4 text-blue-500 shrink-0" />
                  {{ f }}
                </li>
              </ul>
              <UButton
                v-if="plan.cta"
                :to="plan.cta"
                size="sm"
                class="mt-4 w-full"
                :variant="plan.featured ? 'solid' : 'outline'"
              >
                {{ plan.ctaLabel }}
              </UButton>
            </div>
          </div>
        </section>
      </div>

      <p class="text-sm text-muted text-center mt-10">
        All plans subject to terms. Other fees may apply. See our fee schedule for details.
      </p>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Pricing — Leo's Money Maker",
  description: "Transparent pricing for stocks, crypto, 401(k), and 529 plans. No hidden fees."
})

interface Plan {
  id: string
  name: string
  price: string
  note: string
  features: string[]
  featured?: boolean
  cta?: string
  ctaLabel?: string
}

const plansInvest: Plan[] = [
  {
    id: 'free',
    name: 'Starter',
    price: '$0',
    note: 'No account minimum',
    features: ['$0 commission on stocks & ETFs', 'Basic research & charts', 'Mobile & web'],
    cta: '/invest',
    ctaLabel: 'Learn more'
  },
  {
    id: 'plus',
    name: 'Growth',
    price: '$4.99/mo',
    note: 'Billed monthly',
    features: ['Everything in Starter', 'Options at $0.50/contract', 'Advanced screeners', 'Priority support'],
    featured: true,
    cta: '/invest',
    ctaLabel: 'Learn more'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19.99/mo',
    note: 'For active traders',
    features: ['Everything in Growth', 'Unlimited options contracts', 'Real-time L2 data', 'Dedicated support'],
    cta: '/invest',
    ctaLabel: 'Learn more'
  }
]

const plansCrypto: Plan[] = [
  {
    id: 'standard',
    name: 'Standard',
    price: '1% spread',
    note: 'On buy/sell',
    features: ['BTC, ETH, LTC, BCH & more', '24/7 trading', 'Secure custody'],
    cta: '/crypto',
    ctaLabel: 'Learn more'
  },
  {
    id: 'plus',
    name: 'Plus',
    price: '0.5% spread',
    note: 'With $10k+ volume/mo',
    features: ['Lower spreads', 'All Standard features', 'Staking rewards'],
    featured: true,
    cta: '/crypto',
    ctaLabel: 'Learn more'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '0.25% spread',
    note: 'Institutional',
    features: ['Lowest spreads', 'API access', 'Dedicated account manager'],
    cta: '/crypto',
    ctaLabel: 'Contact sales'
  }
]

const plans401k: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$0',
    note: 'Under $10k balance',
    features: ['Traditional & Roth IRA', 'Rollover support', 'Basic fund lineup'],
    cta: '/retirement',
    ctaLabel: 'Learn more'
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$2/mo',
    note: '$10k+ balance',
    features: ['Full fund selection', 'Target-date funds', 'Rebalancing tools'],
    featured: true,
    cta: '/retirement',
    ctaLabel: 'Learn more'
  },
  {
    id: 'plan',
    name: 'Employer Plan',
    price: 'Custom',
    note: '401(k) for businesses',
    features: ['Custom lineup', 'Admin dashboard', 'Compliance support'],
    cta: '/retirement',
    ctaLabel: 'Contact sales'
  }
]

const plans529: Plan[] = [
  {
    id: 'direct',
    name: 'Direct',
    price: '$0',
    note: 'No LMM fee',
    features: ['State plan options', 'Tax-advantaged growth', 'K–12 & college'],
    cta: '/retirement',
    ctaLabel: 'Learn more'
  },
  {
    id: 'managed',
    name: 'Managed',
    price: '0.25% AUM',
    note: 'Annual',
    features: ['Age-based portfolios', 'Auto-rebalancing', 'Advisor access'],
    featured: true,
    cta: '/retirement',
    ctaLabel: 'Learn more'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '0.15% AUM',
    note: '$100k+ invested',
    features: ['Lowest fee tier', 'All Managed features', 'Priority support'],
    cta: '/retirement',
    ctaLabel: 'Learn more'
  }
]
</script>
