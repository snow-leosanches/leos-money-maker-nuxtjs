<template>
  <div
    class="rounded-2xl border border-default bg-muted/40 dark:bg-muted/20 px-6 py-10 sm:px-10 sm:py-12"
    role="region"
    aria-labelledby="waitlist-heading"
  >
    <div class="max-w-xl mx-auto text-center space-y-2">
      <h2 id="waitlist-heading" class="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
        Stay in the loop
      </h2>
      <p class="text-muted text-sm sm:text-base">
        Get one email when prediction markets go live on Leo's Money Maker. No spam — this is a demo waitlist only.
      </p>
    </div>

    <form
      class="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3"
      @submit.prevent="onSubmit"
    >
      <UInput
        v-model="email"
        type="email"
        name="email"
        autocomplete="email"
        placeholder="you@example.com"
        size="lg"
        class="flex-1"
        :disabled="submitted"
        required
        aria-label="Email for waitlist updates"
      />
      <UButton
        type="submit"
        size="lg"
        class="sm:shrink-0 justify-center"
        :loading="pending"
        :disabled="submitted"
      >
        Subscribe
      </UButton>
    </form>

    <p v-if="errorMessage" class="mt-4 text-center text-sm text-error">
      {{ errorMessage }}
    </p>
    <p v-else-if="submitted" class="mt-4 text-center text-sm text-success">
      {{ successMessage }}
    </p>

    <p class="mt-6 text-center text-xs text-muted max-w-lg mx-auto leading-relaxed">
      Prediction markets are inspired by platforms like
      <a href="https://kalshi.com" class="underline hover:text-foreground" rel="noopener noreferrer" target="_blank">Kalshi</a>
      and
      <a href="https://polymarket.com" class="underline hover:text-foreground" rel="noopener noreferrer" target="_blank">Polymarket</a>.
      This feature is a mock for analytics demonstration only — it will not launch as a real product.
    </p>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const pending = ref(false)
const submitted = ref(false)
const errorMessage = ref('')

const { identifyByEmail, isSnowplowEnabled } = useCustomerIdentification()

const successMessage = computed(() =>
  isSnowplowEnabled.value
    ? 'You\'re on the list. We recorded a Customer Identification event for Snowplow Identities.'
    : 'You\'re on the list. (Snowplow is not configured — no event was sent.)'
)

function onSubmit() {
  errorMessage.value = ''
  pending.value = true

  const result = identifyByEmail(email.value)
  pending.value = false

  if (!result.ok) {
    errorMessage.value = 'Please enter a valid email address.'
    return
  }

  submitted.value = true
}
</script>
