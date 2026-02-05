export const PORTFOLIO_STORAGE_KEY = 'leos-money-maker-portfolio'

export interface PortfolioStock {
  symbol: string
  name: string
  basePrice: number
}

export const PORTFOLIO_STOCKS: PortfolioStock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', basePrice: 228.5 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', basePrice: 415.2 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', basePrice: 172.8 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', basePrice: 189.3 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', basePrice: 135.6 },
  { symbol: 'META', name: 'Meta Platforms', basePrice: 518.4 },
  { symbol: 'TSLA', name: 'Tesla Inc.', basePrice: 248.7 },
  { symbol: 'JPM', name: 'JPMorgan Chase', basePrice: 198.2 },
  { symbol: 'V', name: 'Visa Inc.', basePrice: 278.9 },
  { symbol: 'JNJ', name: 'Johnson & Johnson', basePrice: 156.3 },
  { symbol: 'UNH', name: 'UnitedHealth Group', basePrice: 548.2 },
  { symbol: 'HD', name: 'Home Depot', basePrice: 382.5 },
  { symbol: 'PG', name: 'Procter & Gamble', basePrice: 168.9 },
  { symbol: 'MA', name: 'Mastercard Inc.', basePrice: 485.1 },
  { symbol: 'DIS', name: 'Walt Disney Co.', basePrice: 112.4 }
]

/** Mock initial quantities (shares) for first load */
const DEFAULT_QUANTITIES: Record<string, number> = {
  AAPL: 45,
  MSFT: 22,
  GOOGL: 58,
  AMZN: 38,
  NVDA: 30,
  META: 18,
  TSLA: 42,
  JPM: 55,
  V: 28,
  JNJ: 62,
  UNH: 15,
  HD: 24,
  PG: 48,
  MA: 20,
  DIS: 88
}

function randomWalk(prev: number, volatility = 0.002): number {
  const change = (Math.random() - 0.48) * volatility * prev
  return Math.max(prev * 0.98, Math.min(prev * 1.02, prev + change))
}

function loadQuantities(): Record<string, number> {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(PORTFOLIO_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, number>
        return { ...DEFAULT_QUANTITIES, ...parsed }
      }
    } catch {
      // ignore
    }
  }
  return { ...DEFAULT_QUANTITIES }
}

function saveQuantities(qty: Record<string, number>) {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(qty))
  }
}

export interface PositionWithPrice {
  symbol: string
  name: string
  quantity: number
  price: number
  value: number
  changePercent: number
  basePrice: number
}

function initPricesState(): Record<string, { price: number; changePercent: number }> {
  const next: Record<string, { price: number; changePercent: number }> = {}
  for (const s of PORTFOLIO_STOCKS) {
    const price = randomWalk(s.basePrice, 0.015)
    const changePercent = ((price - s.basePrice) / s.basePrice) * 100
    next[s.symbol] = { price, changePercent }
  }
  return next
}

export function usePortfolio() {
  const quantities = useState<Record<string, number>>('portfolio-quantities', () => loadQuantities())
  const prices = useState<Record<string, { price: number; changePercent: number }>>(
    'portfolio-prices',
    () => initPricesState()
  )

  onMounted(() => {
    const interval = setInterval(tickPrices, 3000)
    onUnmounted(() => clearInterval(interval))
  })

  const positionsWithPrices = computed<PositionWithPrice[]>(() => {
    return PORTFOLIO_STOCKS.map((s) => {
      const qty = quantities.value[s.symbol] ?? 0
      const { price, changePercent } = prices.value[s.symbol] ?? { price: s.basePrice, changePercent: 0 }
      return {
        symbol: s.symbol,
        name: s.name,
        quantity: qty,
        price,
        value: qty * price,
        changePercent,
        basePrice: s.basePrice
      }
    }).filter((p) => p.quantity > 0)
  })

  const totalValue = computed(() =>
    positionsWithPrices.value.reduce((sum, p) => sum + p.value, 0)
  )

  function ensurePrice(symbol: string, basePrice: number) {
    if (!prices.value[symbol]) {
      const price = randomWalk(basePrice, 0.015)
      const changePercent = ((price - basePrice) / basePrice) * 100
      prices.value = { ...prices.value, [symbol]: { price, changePercent } }
    }
  }

  function tickPrices() {
    const current = prices.value
    const next = { ...current }
    for (const s of PORTFOLIO_STOCKS) {
      const prev = next[s.symbol]?.price ?? s.basePrice
      const price = randomWalk(prev, 0.004)
      const changePercent = ((price - s.basePrice) / s.basePrice) * 100
      next[s.symbol] = { price, changePercent }
    }
    for (const sym of Object.keys(next)) {
      if (PORTFOLIO_STOCKS.some((s) => s.symbol === sym)) continue
      const prev = next[sym]?.price ?? 100
      const price = randomWalk(prev, 0.004)
      const base = 100
      next[sym] = { price, changePercent: ((price - base) / base) * 100 }
    }
    prices.value = next
  }

  function getPosition(
    symbol: string,
    fallback?: { name: string; basePrice: number }
  ): { quantity: number; price: number; name: string; basePrice: number } | null {
    const stock = PORTFOLIO_STOCKS.find((s) => s.symbol === symbol)
    if (stock) {
      const qty = quantities.value[symbol] ?? 0
      const { price } = prices.value[symbol] ?? { price: stock.basePrice }
      return { quantity: qty, price, name: stock.name, basePrice: stock.basePrice }
    }
    if (fallback && fallback.name) {
      ensurePrice(symbol, fallback.basePrice)
      const qty = quantities.value[symbol] ?? 0
      const { price } = prices.value[symbol] ?? { price: fallback.basePrice }
      return { quantity: qty, price, name: fallback.name, basePrice: fallback.basePrice }
    }
    return null
  }

  function buy(symbol: string, shares: number): boolean {
    if (shares <= 0) return false
    const next = { ...quantities.value }
    next[symbol] = (next[symbol] ?? 0) + shares
    quantities.value = next
    saveQuantities(next)
    return true
  }

  function sell(symbol: string, shares: number): boolean {
    const current = quantities.value[symbol] ?? 0
    if (shares <= 0 || shares > current) return false
    const next = { ...quantities.value }
    next[symbol] = current - shares
    if (next[symbol] === 0) delete next[symbol]
    quantities.value = next
    saveQuantities(next)
    return true
  }

  /** Sync from localStorage on client (e.g. after navigation) */
  function hydrate() {
    quantities.value = loadQuantities()
  }

  return {
    positionsWithPrices,
    totalValue,
    getPosition,
    buy,
    sell,
    hydrate,
    PORTFOLIO_STOCKS
  }
}
