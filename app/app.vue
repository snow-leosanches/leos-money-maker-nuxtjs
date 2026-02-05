<script setup>
const { isAuthenticated, logout } = useAuth()
const router = useRouter()

function logoutAndGoHome() {
  logout()
  router.push('/')
}

const title = "Leo's Money Maker"
const description = "Invest in stocks, crypto, 401(k)s, and 529 plans—all in one place. Transparent pricing, powerful tools, and the security you expect."

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})
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
        <template v-if="isAuthenticated">
          <UButton
            to="/dashboard"
            label="Dashboard"
            color="neutral"
            variant="ghost"
            size="sm"
            class="font-medium"
          />
          <UButton
            label="Log out"
            color="neutral"
            variant="outline"
            size="sm"
            class="font-medium"
            @click="logoutAndGoHome"
          />
        </template>
        <template v-else>
          <UButton
            to="/login"
            label="Log in"
            color="neutral"
            variant="ghost"
            size="sm"
            class="font-medium"
          />
          <UButton
            to="/login"
            label="Open account"
            size="sm"
            class="font-medium"
          />
        </template>
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
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
          <NuxtLink to="/invest" class="hover:text-foreground transition-colors">Invest</NuxtLink>
          <NuxtLink to="/crypto" class="hover:text-foreground transition-colors">Crypto</NuxtLink>
          <NuxtLink to="/retirement" class="hover:text-foreground transition-colors">Retirement</NuxtLink>
          <NuxtLink to="/pricing" class="hover:text-foreground transition-colors">Pricing</NuxtLink>
        </div>
      </template>
    </UFooter>
  </UApp>
</template>
