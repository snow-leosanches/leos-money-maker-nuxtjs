<template>
  <UContainer class="py-8">
    <div class="space-y-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <NuxtLink
            to="/dashboard"
            class="text-sm text-muted hover:text-foreground flex items-center gap-1.5 mb-2"
          >
            <UIcon name="i-lucide-arrow-left" class="size-4" />
            Back to dashboard
          </NuxtLink>
          <h1 class="text-2xl font-bold text-foreground">
            Modify fund selection
          </h1>
          <p class="text-muted text-sm mt-1">
            Choose funds and allocation for your 401(k) and 529. Add or remove funds; percentages per account should total 100%.
          </p>
        </div>
      </div>

      <form @submit.prevent="save" class="space-y-10">
        <!-- 401(k) -->
        <UCard>
          <template #header>
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h2 class="text-lg font-semibold text-foreground flex items-center gap-2">
                <UIcon name="i-lucide-piggy-bank" class="size-5 text-primary-500" />
                401(k) allocation
              </h2>
              <UButton
                type="button"
                size="sm"
                variant="outline"
                leading-icon="i-lucide-plus"
                label="Add fund"
                @click="add401kSlot"
              />
            </div>
          </template>
          <div class="space-y-3">
            <div
              v-for="(slot, i) in edit401k"
              :key="'401k-' + i"
              class="grid grid-cols-[1fr_5rem_auto] gap-3 items-center"
            >
              <USelectMenu
                :model-value="slot.fundId"
                value-key="id"
                label-key="name"
                :items="available401kForSlot(i)"
                placeholder="Select fund"
                class="w-full"
                @update:model-value="(v) => setEdit401kSlot(i, v as string, slot.percent)"
              />
              <UInput
                :model-value="slot.percent"
                type="number"
                min="0"
                max="100"
                step="1"
                class="tabular-nums"
                @update:model-value="(v) => setEdit401kSlot(i, slot.fundId, clampPercent(v))"
              />
              <UButton
                type="button"
                color="neutral"
                variant="ghost"
                icon="i-lucide-trash-2"
                class="shrink-0 text-muted hover:text-error"
                :disabled="edit401k.length <= 1"
                aria-label="Remove fund"
                @click="remove401kSlot(i)"
              />
            </div>
            <p class="text-xs text-muted pt-1">
              401(k) total: <span :class="total401kEdit === 100 ? 'text-green-600 dark:text-green-400 font-medium' : 'text-amber-600 dark:text-amber-400'">{{ total401kEdit }}%</span>
            </p>
          </div>
        </UCard>

        <!-- 529 -->
        <UCard>
          <template #header>
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h2 class="text-lg font-semibold text-foreground flex items-center gap-2">
                <UIcon name="i-lucide-graduation-cap" class="size-5 text-blue-500" />
                529 allocation
              </h2>
              <UButton
                type="button"
                size="sm"
                variant="outline"
                leading-icon="i-lucide-plus"
                label="Add fund"
                @click="add529Slot"
              />
            </div>
          </template>
          <div class="space-y-3">
            <div
              v-for="(slot, i) in edit529"
              :key="'529-' + i"
              class="grid grid-cols-[1fr_5rem_auto] gap-3 items-center"
            >
              <USelectMenu
                :model-value="slot.fundId"
                value-key="id"
                label-key="name"
                :items="available529ForSlot(i)"
                placeholder="Select fund"
                class="w-full"
                @update:model-value="(v) => setEdit529Slot(i, v as string, slot.percent)"
              />
              <UInput
                :model-value="slot.percent"
                type="number"
                min="0"
                max="100"
                step="1"
                class="tabular-nums"
                @update:model-value="(v) => setEdit529Slot(i, slot.fundId, clampPercent(v))"
              />
              <UButton
                type="button"
                color="neutral"
                variant="ghost"
                icon="i-lucide-trash-2"
                class="shrink-0 text-muted hover:text-error"
                :disabled="edit529.length <= 1"
                aria-label="Remove fund"
                @click="remove529Slot(i)"
              />
            </div>
            <p class="text-xs text-muted pt-1">
              529 total: <span :class="total529Edit === 100 ? 'text-green-600 dark:text-green-400 font-medium' : 'text-amber-600 dark:text-amber-400'">{{ total529Edit }}%</span>
            </p>
          </div>
        </UCard>

        <div class="flex flex-wrap items-center gap-3">
          <UButton
            type="submit"
            label="Save changes"
            :disabled="total401kEdit !== 100 || total529Edit !== 100"
          />
          <NuxtLink to="/dashboard">
            <UButton
              type="button"
              color="neutral"
              variant="ghost"
              label="Cancel"
            />
          </NuxtLink>
        </div>
      </form>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { AllocationSlot } from '../../composables/useRetirementAllocation'

const {
  set401kAllocation,
  set529Allocation,
  allocation401k,
  allocation529,
  FUNDS_401K,
  FUNDS_529
} = useRetirementAllocation()

const router = useRouter()

const edit401k = ref<AllocationSlot[]>([])
const edit529 = ref<AllocationSlot[]>([])

onMounted(() => {
  edit401k.value = allocation401k.value.map((s) => ({ ...s }))
  edit529.value = allocation529.value.map((s) => ({ ...s }))
})

const total401kEdit = computed(() =>
  edit401k.value.reduce((sum, s) => sum + (Number(s.percent) || 0), 0)
)
const total529Edit = computed(() =>
  edit529.value.reduce((sum, s) => sum + (Number(s.percent) || 0), 0)
)

function clampPercent(v: string | number): number {
  const n = typeof v === 'string' ? parseFloat(v) : v
  if (!Number.isFinite(n)) return 0
  return Math.min(100, Math.max(0, Math.round(n)))
}

function setEdit401kSlot(index: number, fundId: string, percent: number) {
  const next = [...edit401k.value]
  if (index >= 0 && index < next.length) next[index] = { fundId, percent }
  edit401k.value = next
}

function setEdit529Slot(index: number, fundId: string, percent: number) {
  const next = [...edit529.value]
  if (index >= 0 && index < next.length) next[index] = { fundId, percent }
  edit529.value = next
}

/** 401(k) funds available for this slot: exclude funds already used in other slots. */
function available401kForSlot(slotIndex: number) {
  const currentFundId = edit401k.value[slotIndex]?.fundId
  const usedByOtherSlots = edit401k.value
    .map((s, j) => (j !== slotIndex ? s.fundId : null))
    .filter(Boolean) as string[]
  return FUNDS_401K.filter(
    (f) => f.id === currentFundId || !usedByOtherSlots.includes(f.id)
  )
}

/** 529 funds available for this slot: exclude funds already used in other slots. */
function available529ForSlot(slotIndex: number) {
  const currentFundId = edit529.value[slotIndex]?.fundId
  const usedByOtherSlots = edit529.value
    .map((s, j) => (j !== slotIndex ? s.fundId : null))
    .filter(Boolean) as string[]
  return FUNDS_529.filter(
    (f) => f.id === currentFundId || !usedByOtherSlots.includes(f.id)
  )
}

function add401kSlot() {
  const used = edit401k.value.map((s) => s.fundId)
  const firstUnused = FUNDS_401K.find((f) => !used.includes(f.id))
  const firstId = firstUnused?.id ?? FUNDS_401K[0]?.id ?? 'fid-500'
  edit401k.value = [...edit401k.value, { fundId: firstId, percent: 0 }]
}

function remove401kSlot(index: number) {
  if (edit401k.value.length <= 1) return
  edit401k.value = edit401k.value.filter((_, i) => i !== index)
}

function add529Slot() {
  const used = edit529.value.map((s) => s.fundId)
  const firstUnused = FUNDS_529.find((f) => !used.includes(f.id))
  const firstId = firstUnused?.id ?? FUNDS_529[0]?.id ?? '529-age-0'
  edit529.value = [...edit529.value, { fundId: firstId, percent: 0 }]
}

function remove529Slot(index: number) {
  if (edit529.value.length <= 1) return
  edit529.value = edit529.value.filter((_, i) => i !== index)
}

function save() {
  if (total401kEdit.value !== 100 || total529Edit.value !== 100) return
  set401kAllocation(edit401k.value)
  set529Allocation(edit529.value)
  router.push('/dashboard')
}
</script>
