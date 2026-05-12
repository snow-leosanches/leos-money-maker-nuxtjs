import type { DemoCustomerId } from '~/composables/useAuth'

/**
 * Demo login / registration: persist persona, emit Snowplow Customer Identification
 * for the profile's synthetic email, then go to the dashboard.
 */
export function useDemoCustomerPortal() {
  const { loginAs, customerProfiles } = useAuth()
  const { identifyByEmail } = useCustomerIdentification()

  async function enterAsDemoCustomer(id: DemoCustomerId) {
    loginAs(id)
    const demoEmail = customerProfiles.find(p => p.id === id)?.demoEmail
    if (demoEmail) {
      identifyByEmail(demoEmail)
    }
    await nextTick()
    await navigateTo('/dashboard')
  }

  return {
    customerProfiles,
    enterAsDemoCustomer
  }
}
