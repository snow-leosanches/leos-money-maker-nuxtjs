/**
 * Mock crypto ticker stream (same shape as Binance 24hr ticker).
 * No WebSocket; updates prices on an interval with a small random walk.
 */

export interface BinanceTickerData {
  priceUsd: number
  change24h: number
  sparkline: number[]
}

const MAX_SPARKLINE = 60
const INITIAL_SPARKLINE_POINTS = 50

const MOCK_BASE: Record<string, number> = {
  btc: 97200,
  eth: 3480,
  bch: 420,
  ltc: 98
}

function randomWalk(prev: number, volatility = 0.002): number {
  const change = (Math.random() - 0.5) * 2 * volatility * prev
  return Math.max(prev + change, prev * 0.99)
}

function randomChange24h(): number {
  return (Math.random() - 0.45) * 6
}

/** Build a sparkline of `length` points ending at `currentPrice` (walk backwards in time). */
function buildInitialSparkline(basePrice: number, length: number): number[] {
  const out: number[] = [basePrice]
  let p = basePrice
  for (let i = 0; i < length - 1; i++) {
    p = randomWalk(p)
    out.unshift(p)
  }
  return out
}

function getInitialTicker(id: keyof typeof MOCK_BASE): BinanceTickerData {
  const base = MOCK_BASE[id]
  const sparkline = buildInitialSparkline(base, INITIAL_SPARKLINE_POINTS)
  const priceUsd = sparkline[sparkline.length - 1]!
  return {
    priceUsd,
    change24h: randomChange24h(),
    sparkline
  }
}

export function useBinanceCryptoStream() {
  const tickerBySymbol = useState<Record<string, BinanceTickerData>>('binance-ticker', () => ({
    btc: getInitialTicker('btc'),
    eth: getInitialTicker('eth'),
    bch: getInitialTicker('bch'),
    ltc: getInitialTicker('ltc')
  }))

  const connected = useState('binance-ws-connected', () => false)

  onMounted(() => {
    if (import.meta.server) return
    connected.value = true

    const interval = setInterval(() => {
      tickerBySymbol.value = Object.fromEntries(
        (['btc', 'eth', 'bch', 'ltc'] as const).map((id) => {
          const prev = tickerBySymbol.value[id]
          const price = randomWalk(prev.priceUsd)
          const sparkline = [...(prev.sparkline ?? []), price].slice(-MAX_SPARKLINE)
          return [
            id,
            {
              priceUsd: price,
              change24h: randomChange24h(),
              sparkline
            }
          ]
        })
      )
    }, 2000)

    onUnmounted(() => clearInterval(interval))
  })

  return { tickerBySymbol, connected }
}
