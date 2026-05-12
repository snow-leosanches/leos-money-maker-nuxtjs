import { setUserId } from '@snowplow/browser-tracker'
import { trackCustomerIdentificationSpec } from '../../snowtype/snowplow'
import { SNOWPLOW_TRACKER_ID } from '~/utils/snowplow-tracker-id'

const trackers = [SNOWPLOW_TRACKER_ID]

type IdentifyInvalid = { ok: false, reason: 'invalid_email' }
type IdentifyOk = { ok: true, tracked: boolean }

export type IdentifyResult = IdentifyInvalid | IdentifyOk

/**
 * Validates email and, when Snowplow is initialised, fires the Snowtype Customer Identification
 * event (with event specification context) and sets the business user id for Identities demos.
 */
export function useCustomerIdentification() {
  const tracker = useSnowplow()

  function identifyByEmail(email: string): IdentifyResult {
    const normalized = email.trim().toLowerCase()
    if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      return { ok: false, reason: 'invalid_email' }
    }

    if (!import.meta.client || !tracker) {
      return { ok: true, tracked: false }
    }

    setUserId(normalized, trackers)
    trackCustomerIdentificationSpec({ email: normalized }, trackers)
    return { ok: true, tracked: true }
  }

  return {
    identifyByEmail,
    /** True when the Snowplow client plugin created a tracker */
    isSnowplowEnabled: computed(() => !!tracker)
  }
}
