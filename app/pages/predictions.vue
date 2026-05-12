<template>
  <div>
    <section class="relative overflow-hidden border-b border-default">
      <div class="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
      <UContainer class="relative py-16 sm:py-20 lg:py-28">
        <div class="max-w-3xl">
          <p class="text-sm font-medium text-primary-600 dark:text-primary-400 mb-3">
            Coming soon · Demo only
          </p>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Trade on outcomes, not just tickers.
          </h1>
          <p class="mt-4 text-lg text-muted max-w-2xl">
            A mock prediction-markets experience — similar in spirit to regulated event contracts
            (<a href="https://kalshi.com" class="underline hover:text-foreground" rel="noopener noreferrer" target="_blank">Kalshi</a>)
            and information markets
            (<a href="https://polymarket.com" class="underline hover:text-foreground" rel="noopener noreferrer" target="_blank">Polymarket</a>)
            — built here to show how Snowplow ties anonymous browsing to known customers when someone shares an email.
          </p>
        </div>
      </UContainer>
    </section>

    <UPageSection
      title="What you might see someday"
      description="Illustrative only. Copy and categories are placeholders for a product that is intentionally not implemented."
      class="border-b border-default"
    >
      <div class="grid sm:grid-cols-3 gap-6 mt-10">
        <UCard v-for="item in highlights" :key="item.title" class="border-default">
          <div class="flex items-start gap-3">
            <span class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400">
              <UIcon :name="item.icon" class="size-5" />
            </span>
            <div>
              <h3 class="font-semibold text-foreground">
                {{ item.title }}
              </h3>
              <p class="text-sm text-muted mt-1">
                {{ item.body }}
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <UContainer class="py-16 sm:py-20">
      <PredictionsMarketWaitlist />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Prediction markets (demo) — Leo\'s Money Maker',
  description:
    'Join the mock waitlist for a prediction-markets feature. Subscribing emits a Snowplow Customer Identification event for Identities demos.'
})

const highlights = [
  {
    icon: 'i-lucide-scale',
    title: 'Clear rules',
    body: 'Binary and multi-outcome contracts with defined resolution sources — the kind of structure regulators and risk teams care about.'
  },
  {
    icon: 'i-lucide-users',
    title: 'Liquidity & community',
    body: 'Order books and social discovery help prices reflect collective belief — familiar from major prediction-market platforms.'
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'Identity-aware analytics',
    body: 'When you join the waitlist, we emit a Customer Identification event so Snowplow Identities can link this browser session to your email.'
  }
]
</script>
