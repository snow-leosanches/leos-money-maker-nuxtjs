import { newTracker } from '@snowplow/browser-tracker'
import { SnowplowEcommercePlugin } from '@snowplow/browser-plugin-snowplow-ecommerce'
import { PerformanceNavigationTimingPlugin } from '@snowplow/browser-plugin-performance-navigation-timing'
import { SiteTrackingPlugin } from '@snowplow/browser-plugin-site-tracking'
import { SignalsPlugin } from '@snowplow/signals-browser-plugin'

const APP_ID = 'leos-money-maker-nuxtjs'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const collectorUrl = config.public.snowplowCollectorUrl as string

  if (!collectorUrl || typeof collectorUrl !== 'string' || collectorUrl.length === 0) {
    return
  }

  const tracker = newTracker(APP_ID, collectorUrl, {
    appId: APP_ID,
    contexts: {
      session: true,
      browser: true
    },
    plugins: [
      PerformanceNavigationTimingPlugin(),
      SnowplowEcommercePlugin(),
      SiteTrackingPlugin(),
      SignalsPlugin()
    ]
  })

  if (tracker) {
    const router = useRouter()
    const snowplowTracker = tracker

    function trackPageView() {
      const route = router.currentRoute.value
      const title = (route.meta.title as string) ?? (typeof document !== 'undefined' ? document.title : '')
      snowplowTracker.trackPageView({ title })
    }

    router.afterEach(() => {
      nuxtApp.runWithContext(() => {
        nextTick(trackPageView)
      })
    })

    nextTick(trackPageView)
  }

  return {
    provide: {
      snowplow: tracker
    }
  }
})
