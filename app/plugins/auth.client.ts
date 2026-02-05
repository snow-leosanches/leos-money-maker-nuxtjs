export default defineNuxtPlugin(() => {
  const customer = useState<import('~/composables/useAuth').CustomerType>('auth-customer')
  const stored = localStorage.getItem('leos-money-maker-customer')
  if (stored === 'stock' || stored === 'crypto' || stored === 'retirement') {
    customer.value = stored
  }
})
