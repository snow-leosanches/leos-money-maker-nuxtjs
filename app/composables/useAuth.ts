export type DemoCustomerId = 'stock' | 'crypto' | 'retirement'
export type CustomerType = DemoCustomerId | null

export interface CustomerProfile {
  id: DemoCustomerId
  name: string
  description: string
  icon: string
  /** Synthetic inbox for Snowplow Customer Identification demos (not a real mailbox). */
  demoEmail: string
}

export const customerProfiles: CustomerProfile[] = [
  {
    id: 'stock',
    name: 'Traditional Stock Investor',
    description: 'Stocks, ETFs, and options',
    icon: 'i-lucide-line-chart',
    demoEmail: 'buffett-would-tap-this-row@leos-demo.test'
  },
  {
    id: 'crypto',
    name: 'Crypto Customer',
    description: 'Bitcoin, Ethereum, and more',
    icon: 'i-lucide-bitcoin',
    demoEmail: 'wen-moon-gas-fees-ate-my-snack@leos-demo.test'
  },
  {
    id: 'retirement',
    name: '401(k) & 529 Investor',
    description: 'Retirement and education savings',
    icon: 'i-lucide-piggy-bank',
    demoEmail: 'max-the-match-or-we-riot-peacefully@leos-demo.test'
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

  function loginAs(customer: DemoCustomerId) {
    currentCustomer.value = customer
    if (import.meta.client && typeof localStorage !== 'undefined') {
      localStorage.setItem(AUTH_KEY, customer)
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
