<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const is404 = computed(() => props.error?.statusCode === 404)

const title = computed(() =>
  is404.value ? "Page not found" : "Something went wrong"
)

const message = computed(() =>
  is404.value
    ? "The page you're looking for doesn't exist or has been moved."
    : (props.error?.message || "An unexpected error occurred.")
)

function clearAndGo(to: string) {
  clearError({ redirect: to })
}
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/" class="flex items-center">
          <AppLogo class="w-auto h-8 shrink-0" />
        </NuxtLink>
        <SiteNav />
      </template>

      <template #right>
        <UColorModeButton />
        <UButton
          to="/"
          label="Home"
          color="neutral"
          variant="ghost"
          size="sm"
          class="font-medium"
        />
        <UButton
          to="/login"
          label="Log in"
          color="neutral"
          variant="outline"
          size="sm"
          class="font-medium"
        />
      </template>
    </UHeader>

    <UMain>
      <div class="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div class="max-w-md w-full text-center space-y-6">
          <div
            class="inline-flex items-center justify-center size-20 rounded-2xl bg-primary-500/10 text-primary-600 dark:text-primary-400"
          >
            <UIcon
              :name="is404 ? 'i-lucide-file-question' : 'i-lucide-alert-circle'"
              class="size-10"
            />
          </div>
          <div class="space-y-2">
            <p class="text-4xl font-bold tabular-nums text-foreground">
              {{ error?.statusCode ?? 500 }}
            </p>
            <h1 class="text-2xl font-semibold text-foreground">
              {{ title }}
            </h1>
            <p class="text-muted">
              {{ message }}
            </p>
          </div>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <UButton
              size="lg"
              trailing-icon="i-lucide-arrow-right"
              @click="clearAndGo('/')"
            >
              Back to home
            </UButton>
            <UButton
              v-if="is404"
              size="lg"
              color="neutral"
              variant="outline"
              @click="clearAndGo('/dashboard')"
            >
              Go to dashboard
            </UButton>
          </div>
        </div>
      </div>
    </UMain>

    <UFooter>
      <template #left>
        <AppLogo class="h-6 w-auto opacity-90" />
        <p class="text-sm text-muted mt-2">
          © {{ new Date().getFullYear() }} Leo's Money Maker. Demo for event analytics.
        </p>
      </template>
      <template #right>
        <div class="flex flex-col sm:flex-row gap-4 text-sm text-muted">
          <NuxtLink to="/#invest" class="hover:text-foreground transition-colors">Invest</NuxtLink>
          <NuxtLink to="/#crypto" class="hover:text-foreground transition-colors">Crypto</NuxtLink>
          <NuxtLink to="/#retirement" class="hover:text-foreground transition-colors">Retirement</NuxtLink>
          <NuxtLink to="/#pricing" class="hover:text-foreground transition-colors">Pricing</NuxtLink>
        </div>
      </template>
    </UFooter>
  </UApp>
</template>
