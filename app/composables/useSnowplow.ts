import type { BrowserTracker } from '@snowplow/browser-tracker'
import { trackSelfDescribingEvent } from '@snowplow/browser-tracker'

declare module '#app' {
  interface NuxtApp {
    $snowplow?: BrowserTracker
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $snowplow?: BrowserTracker
  }
}

const CUSTOM_EVENT_SCHEMA = 'iglu:com.snowplowanalytics.snowplow/custom_event/jsonschema/1-0-0'

/** Numeric value for product (schema requires value to be number 0–9999999). */
const PRODUCT_VALUE: Record<string, number> = {
  invest: 1,
  crypto: 2,
  retirement: 3
}

/**
 * Access the Snowplow browser tracker (client-only).
 * Returns undefined if Snowplow is not configured (e.g. missing NUXT_PUBLIC_SNOWPLOW_COLLECTOR_URL).
 */
export function useSnowplow(): BrowserTracker | undefined {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$snowplow
}

/**
 * Track a product signup with the Snowplow custom_event schema.
 * Fires when a user signs up for a product they don't have.
 * Schema: https://github.com/snowplow/iglu-central/blob/master/schemas/com.snowplowanalytics.snowplow/custom_event/jsonschema/1-0-0
 */
export function useTrackProductSignup() {
  const tracker = useSnowplow()

  function trackProductSignup(path: string, productKey: string, productName: string) {
    if (!tracker) return
    const value = PRODUCT_VALUE[productKey] ?? 0
    // Schema value must be numeric (0–9999999); we use 1=Invest, 2=Crypto, 3=Retirement.
    trackSelfDescribingEvent({
      event: {
        schema: CUSTOM_EVENT_SCHEMA,
        data: {
          category: 'New Products',
          action: 'Signup',
          label: path,
          value
        }
      }
    })
  }

  return { trackProductSignup }
}
