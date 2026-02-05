<template>
  <div class="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4">
    <UContainer class="max-w-lg w-full">
      <div class="text-center mb-10">
        <h1 class="text-2xl font-bold text-foreground mb-2">
          Customer Portal Login
        </h1>
        <p class="text-muted">
          Select a customer to authenticate as a demo user
        </p>
      </div>

      <div class="space-y-4">
        <UButton
          v-for="profile in customerProfiles"
          :key="profile.id ?? 'n'"
          size="xl"
          variant="outline"
          class="w-full justify-start gap-4 h-auto py-4 px-5"
          @click="profile.id && authenticate(profile.id)"
        >
          <span
            class="flex items-center justify-center size-12 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 shrink-0"
          >
            <UIcon :name="profile.icon" class="size-6" />
          </span>
          <span class="text-left flex-1">
            <span class="font-semibold block text-foreground">
              {{ profile.name }}
            </span>
            <span class="text-sm text-muted font-normal">
              {{ profile.description }}
            </span>
          </span>
          <UIcon name="i-lucide-chevron-right" class="size-5 text-muted shrink-0" />
        </UButton>
      </div>

      <p class="text-sm text-muted text-center mt-8">
        This is a demo. No password required.
      </p>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const { customerProfiles, loginAs, isAuthenticated } = useAuth()
const router = useRouter()

onMounted(() => {
  if (isAuthenticated.value) {
    router.replace('/dashboard')
  }
})

function authenticate(id: 'stock' | 'crypto' | 'retirement') {
  loginAs(id)
  router.push('/dashboard')
}
</script>
