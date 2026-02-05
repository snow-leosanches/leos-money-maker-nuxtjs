<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden border-b border-default">
      <div class="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-transparent pointer-events-none" />
      <UContainer class="relative py-20 sm:py-28 lg:py-36">
        <div class="max-w-3xl mx-auto text-center space-y-8">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Invest in your future.
            <span class="text-primary-600 dark:text-primary-400">All in one place.</span>
          </h1>
          <p class="text-lg sm:text-xl text-muted max-w-2xl mx-auto">
            Stocks, crypto, 401(k)s, and 529 plans—with transparent pricing, powerful tools, and the security you expect.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <UButton
              to="/login"
              size="xl"
              trailing-icon="i-lucide-arrow-right"
              class="w-full sm:w-auto"
            >
              Open an account
            </UButton>
            <UButton
              to="#invest"
              size="xl"
              color="neutral"
              variant="outline"
              class="w-full sm:w-auto"
            >
              See how it works
            </UButton>
          </div>
          <p class="text-sm text-muted">
            No minimum to open. No account fees. $0 commission on US stocks & ETFs.
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Services: Invest, Crypto, Retirement -->
    <section id="invest" class="relative scroll-mt-20">
      <span id="crypto" class="absolute top-0 left-0 pointer-events-none" aria-hidden="true" />
      <span id="retirement" class="absolute top-0 left-0 pointer-events-none" aria-hidden="true" />
    <UPageSection
      title="One platform for every goal"
      description="Whether you're building wealth, saving for retirement, or planning for education—we've got you covered."
      class="border-b border-default"
    >
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        <UCard
          v-for="service in services"
          :key="service.id"
          class="overflow-hidden hover:border-primary-500/30 transition-colors"
          :ui="{ body: 'p-0', footer: 'p-5 pt-0' }"
        >
          <div
            class="h-32 flex items-center justify-center text-primary-500"
            :class="service.bgClass"
          >
            <UIcon :name="service.icon" class="size-12" />
          </div>
          <template #footer>
            <h3 class="font-semibold text-lg text-foreground">
              {{ service.title }}
            </h3>
            <p class="text-muted text-sm mt-1">
              {{ service.description }}
            </p>
            <UButton
              :to="service.ctaTo"
              variant="link"
              color="primary"
              size="sm"
              trailing-icon="i-lucide-arrow-right"
              class="mt-3 -ml-2 p-0 h-auto"
            >
              {{ service.ctaLabel }}
            </UButton>
          </template>
        </UCard>
      </div>
    </UPageSection>
    </section>

    <!-- Features -->
    <UPageSection
      title="Built for how you invest"
      description="Professional-grade tools and transparent pricing, without the complexity."
      :features="features"
      class="border-b border-default"
    />

    <!-- Pricing strip (E*TRADE / Robinhood style) -->
    <section id="pricing" class="bg-muted/30 border-b border-default scroll-mt-20">
      <UContainer class="py-16">
        <h2 class="text-2xl font-bold text-center text-foreground mb-2">
          Nothing to hide here
        </h2>
        <p class="text-muted text-center mb-12 max-w-xl mx-auto">
          Transparent pricing and rates you can count on.
        </p>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="rate in pricingRates"
            :key="rate.label"
            class="rounded-xl border border-default bg-background p-6 text-center"
          >
            <p class="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {{ rate.value }}
            </p>
            <p class="text-sm font-medium text-foreground mt-1">
              {{ rate.label }}
            </p>
            <p class="text-xs text-muted mt-1">
              {{ rate.note }}
            </p>
          </div>
        </div>
        <p class="text-sm text-muted text-center mt-6">
          Other fees may apply. See our full fee schedule for details.
        </p>
      </UContainer>
    </section>

    <!-- Trust / Security -->
    <section class="border-b border-default">
      <UContainer class="py-16">
        <div class="flex flex-col md:flex-row items-center justify-between gap-8">
          <div class="flex-1 max-w-xl">
            <h2 class="text-2xl font-bold text-foreground mb-3">
              Your money, protected
            </h2>
            <p class="text-muted">
              We take security seriously. SIPC protection, bank-level encryption, and a commitment to never sell your personal information. Plus 24/7 account monitoring and zero liability for unauthorized activity.
            </p>
          </div>
          <div class="flex flex-wrap gap-6 justify-center md:justify-end">
            <div class="flex items-center gap-2 text-muted">
              <UIcon name="i-lucide-shield-check" class="size-6 text-primary-500" />
              <span class="text-sm font-medium">SIPC protected</span>
            </div>
            <div class="flex items-center gap-2 text-muted">
              <UIcon name="i-lucide-lock" class="size-6 text-primary-500" />
              <span class="text-sm font-medium">Bank-level encryption</span>
            </div>
            <div class="flex items-center gap-2 text-muted">
              <UIcon name="i-lucide-fingerprint" class="size-6 text-primary-500" />
              <span class="text-sm font-medium">MFA on all accounts</span>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- CTA -->
    <UPageSection id="cta">
      <UPageCTA
        title="Ready to get started?"
        description="Open an account in minutes. No minimum balance. Start with as little as you're comfortable with."
        variant="subtle"
        :links="[{
          label: 'Open an account',
          to: '/login',
          trailingIcon: 'i-lucide-arrow-right',
          size: 'lg'
        }, {
          label: 'Contact sales',
          to: '#',
          color: 'neutral',
          variant: 'outline',
          size: 'lg'
        }]"
      />
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
const services = [
  {
    id: 'stocks',
    title: 'Stocks & ETFs',
    description: 'Trade US stocks and ETFs with $0 commission. Options, research, and intuitive platforms.',
    icon: 'i-lucide-line-chart',
    bgClass: 'bg-primary-500/10',
    ctaLabel: 'Start trading',
    ctaTo: '#cta'
  },
  {
    id: 'crypto',
    title: 'Crypto',
    description: 'Buy and sell Bitcoin, Ethereum, and other top cryptocurrencies. 24/7 trading.',
    icon: 'i-lucide-bitcoin',
    bgClass: 'bg-amber-500/10',
    ctaLabel: 'Explore crypto',
    ctaTo: '#cta'
  },
  {
    id: '401k',
    title: '401(k) & IRA',
    description: 'Roll over or start a retirement account. Traditional, Roth, and SEP IRAs available.',
    icon: 'i-lucide-piggy-bank',
    bgClass: 'bg-emerald-500/10',
    ctaLabel: 'Plan for retirement',
    ctaTo: '#cta'
  },
  {
    id: '529',
    title: '529 Education',
    description: 'Save for college and K–12 with tax-advantaged 529 education savings plans.',
    icon: 'i-lucide-graduation-cap',
    bgClass: 'bg-blue-500/10',
    ctaLabel: 'Save for education',
    ctaTo: '#cta'
  }
]

const features = [
  {
    icon: 'i-lucide-zap',
    title: 'Fast execution',
    description: 'Place trades with confidence. Our platforms are built for speed and reliability.'
  },
  {
    icon: 'i-lucide-bar-chart-3',
    title: 'Research & tools',
    description: 'Screeners, fundamentals, and charting tools to help you make informed decisions.'
  },
  {
    icon: 'i-lucide-receipt',
    title: 'Transparent pricing',
    description: 'No hidden fees. Clear rates on stocks, options, and fixed income—so you know what you pay.'
  },
  {
    icon: 'i-lucide-smartphone',
    title: 'Invest on the go',
    description: 'Full-featured mobile app. Manage your portfolio and place trades from anywhere.'
  }
]

const pricingRates = [
  { value: '$0', label: 'Commission trades', note: 'Stocks, ETFs, options' },
  { value: '$0', label: 'Account fees', note: 'No minimum balance' },
  { value: '0.50%', label: 'Options per contract', note: 'After 30+ trades/quarter' },
  { value: 'Low', label: 'Margin rates', note: 'Competitive borrowing' }
]
</script>
