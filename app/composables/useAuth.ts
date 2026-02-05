export type CustomerType = 'stock' | 'crypto' | 'retirement' | null

export interface CustomerProfile {
  id: CustomerType
  name: string
  description: string
  icon: string
}

export const customerProfiles: CustomerProfile[] = [
  {
    id: 'stock',
    name: 'Traditional Stock Investor',
    description: 'Stocks, ETFs, and options',
    icon: 'i-lucide-line-chart'
  },
  {
    id: 'crypto',
    name: 'Crypto Customer',
    description: 'Bitcoin, Ethereum, and more',
    icon: 'i-lucide-bitcoin'
  },
  {
    id: 'retirement',
    name: '401(k) & 529 Investor',
    description: 'Retirement and education savings',
    icon: 'i-lucide-piggy-bank'
  }
]

const AUTH_KEY = 'leos-money-maker-customer'

function getStored(): CustomerType {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    const v = localStorage.getItem(AUTH_KEY)
    if (v === 'stock' || v === 'crypto' || v === 'retirement') return v
  }
  return null
}

export function useAuth() {
  const currentCustomer = useState<CustomerType>('auth-customer', () => getStored())

  function loginAs(customer: CustomerType) {
    if (customer) {
      currentCustomer.value = customer
      if (import.meta.client && typeof localStorage !== 'undefined') {
        localStorage.setItem(AUTH_KEY, customer)
      }
    }
  }

  function logout() {
    currentCustomer.value = null
    if (import.meta.client && typeof localStorage !== 'undefined') {
      localStorage.removeItem(AUTH_KEY)
    }
  }

  const isAuthenticated = computed(() => currentCustomer.value !== null)

  return {
    currentCustomer,
    isAuthenticated,
    loginAs,
    logout,
    customerProfiles
  }
}
