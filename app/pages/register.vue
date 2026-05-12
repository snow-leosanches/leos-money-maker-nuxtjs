<template>
  <div class="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4">
    <UContainer class="max-w-lg w-full">
      <div class="text-center mb-10">
        <p class="text-sm font-medium text-primary-600 dark:text-primary-400 mb-2">
          Instant onboarding · Zero paperwork
        </p>
        <h1 class="text-2xl font-bold text-foreground mb-2">
          Open your demo account
        </h1>
        <p class="text-muted">
          Pick a vibe. We mint a ridiculous synthetic email, stash your persona, and ping Snowplow Identities—then drop you on the dashboard.
        </p>
      </div>

      <div class="space-y-4">
        <UButton
          v-for="profile in customerProfiles"
          :key="profile.id"
          size="xl"
          variant="outline"
          class="w-full justify-start gap-4 h-auto py-4 px-5 border-dashed"
          @click="enterAsDemoCustomer(profile.id)"
        >
          <span
            class="flex items-center justify-center size-12 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 shrink-0"
          >
            <UIcon :name="profile.icon" class="size-6" />
          </span>
          <span class="text-left flex-1 min-w-0">
            <span class="font-semibold block text-foreground">
              Register as {{ profile.name }}
            </span>
            <span class="text-sm text-muted font-normal block">
              {{ profile.description }}
            </span>
            <span class="text-xs text-muted/90 font-mono mt-1.5 block truncate" :title="profile.demoEmail">
              Your demo identity: {{ profile.demoEmail }}
            </span>
          </span>
          <UIcon name="i-lucide-party-popper" class="size-5 text-muted shrink-0" />
        </UButton>
      </div>

      <p class="text-sm text-muted text-center mt-6">
        Same flow as login—registration is a label swap for the demo. One Customer Identification event per choice so you can watch identities attach in the pipeline.
      </p>

      <p class="text-sm text-muted text-center mt-4">
        Already “registered”?
        <NuxtLink to="/login" class="text-primary-600 dark:text-primary-400 font-medium hover:underline">
          Head to login
        </NuxtLink>
      </p>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const { customerProfiles, isAuthenticated } = useAuth()
const { enterAsDemoCustomer } = useDemoCustomerPortal()
const router = useRouter()

useSeoMeta({
  title: 'Open demo account — Leo\'s Money Maker',
  description: 'Demo registration with Snowplow Customer Identification for each synthetic persona email.'
})

onMounted(() => {
  if (isAuthenticated.value) {
    router.replace('/dashboard')
  }
})
</script>
