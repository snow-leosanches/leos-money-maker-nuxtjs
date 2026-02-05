import {
  FUNDS_401K,
  FUNDS_529,
  getFund401k,
  getFund529
} from '../data/retirement-funds'

export interface AllocationSlot {
  fundId: string
  percent: number
}

const STORAGE_KEY = 'leos-money-maker-retirement-allocation'

const DEFAULT_401K: AllocationSlot[] = [
  { fundId: 'fid-500', percent: 45 },
  { fundId: 'fid-intl', percent: 20 },
  { fundId: 'fid-bond', percent: 25 },
  { fundId: 'fid-govt', percent: 10 }
]

const DEFAULT_529: AllocationSlot[] = [
  { fundId: '529-age-11', percent: 55 },
  { fundId: '529-vng-stk', percent: 25 },
  { fundId: '529-vng-bond', percent: 15 },
  { fundId: '529-mm', percent: 5 }
]

function loadStored(): { allocation401k: AllocationSlot[]; allocation529: AllocationSlot[] } | null {
  if (import.meta.server || typeof localStorage === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { allocation401k: AllocationSlot[]; allocation529: AllocationSlot[] }
    if (Array.isArray(parsed.allocation401k) && Array.isArray(parsed.allocation529)) {
      return parsed
    }
  } catch {
    // ignore
  }
  return null
}

function save(allocation401k: AllocationSlot[], allocation529: AllocationSlot[]) {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ allocation401k, allocation529 }))
  }
}

export function useRetirementAllocation() {
  const stored = loadStored()
  const allocation401k = useState<AllocationSlot[]>('retirement-401k', () =>
    stored?.allocation401k ?? DEFAULT_401K.map((s) => ({ ...s }))
  )
  const allocation529 = useState<AllocationSlot[]>('retirement-529', () =>
    stored?.allocation529 ?? DEFAULT_529.map((s) => ({ ...s }))
  )

  const total401k = 247500
  const total529 = 42800

  const allocation401kWithNames = computed(() =>
    allocation401k.value.map((slot) => {
      const fund = getFund401k(slot.fundId)
      return {
        fundId: slot.fundId,
        label: fund?.name ?? slot.fundId,
        percent: slot.percent,
        category: fund?.category
      }
    })
  )

  const allocation529WithNames = computed(() =>
    allocation529.value.map((slot) => {
      const fund = getFund529(slot.fundId)
      return {
        fundId: slot.fundId,
        label: fund?.name ?? slot.fundId,
        percent: slot.percent,
        category: fund?.category
      }
    })
  )

  function set401kSlot(index: number, fundId: string, percent: number) {
    const next = [...allocation401k.value]
    if (index >= 0 && index < next.length) {
      next[index] = { fundId, percent }
      allocation401k.value = next
      save(allocation401k.value, allocation529.value)
    }
  }

  function set529Slot(index: number, fundId: string, percent: number) {
    const next = [...allocation529.value]
    if (index >= 0 && index < next.length) {
      next[index] = { fundId, percent }
      allocation529.value = next
      save(allocation401k.value, allocation529.value)
    }
  }

  function set401kAllocation(slots: AllocationSlot[]) {
    allocation401k.value = slots.map((s) => ({ ...s }))
    save(allocation401k.value, allocation529.value)
  }

  function set529Allocation(slots: AllocationSlot[]) {
    allocation529.value = slots.map((s) => ({ ...s }))
    save(allocation401k.value, allocation529.value)
  }

  return {
    allocation401k,
    allocation529,
    allocation401kWithNames,
    allocation529WithNames,
    total401k,
    total529,
    set401kSlot,
    set529Slot,
    set401kAllocation,
    set529Allocation,
    FUNDS_401K,
    FUNDS_529,
    getFund401k,
    getFund529
  }
}
