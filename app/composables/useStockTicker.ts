export interface StockQuote {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  open: number
  high: number
  low: number
  volume: number
  sparkline: number[]
}

const STOCKS: { symbol: string; name: string; basePrice: number }[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', basePrice: 228.5 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', basePrice: 415.2 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', basePrice: 172.8 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', basePrice: 189.3 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', basePrice: 135.6 },
  { symbol: 'META', name: 'Meta Platforms', basePrice: 518.4 },
  { symbol: 'TSLA', name: 'Tesla Inc.', basePrice: 248.7 },
  { symbol: 'JPM', name: 'JPMorgan Chase', basePrice: 198.2 },
  { symbol: 'V', name: 'Visa Inc.', basePrice: 278.9 },
  { symbol: 'JNJ', name: 'Johnson & Johnson', basePrice: 156.3 }
]

function randomWalk(prev: number, volatility = 0.002): number {
  const change = (Math.random() - 0.48) * volatility * prev
  return Math.max(prev * 0.98, Math.min(prev * 1.02, prev + change))
}

function generateSparkline(base: number, points = 20): number[] {
  const out: number[] = [base]
  let p = base
  for (let i = 0; i < points - 1; i++) {
    p = randomWalk(p, 0.008)
    out.push(p)
  }
  return out
}

export function useStockTicker() {
  const quotes = ref<StockQuote[]>([])

  function initQuotes() {
    quotes.value = STOCKS.map((s) => {
      const open = s.basePrice
      const price = randomWalk(open, 0.015)
      const change = price - open
      const changePercent = (change / open) * 100
      return {
        symbol: s.symbol,
        name: s.name,
        price,
        change,
        changePercent,
        open,
        high: Math.max(open, price) * (1 + Math.random() * 0.01),
        low: Math.min(open, price) * (1 - Math.random() * 0.01),
        volume: Math.floor(5000000 + Math.random() * 20000000),
        sparkline: generateSparkline(open)
      }
    })
  }

  function tick() {
    quotes.value = quotes.value.map((q) => {
      const newPrice = randomWalk(q.price, 0.004)
      const change = newPrice - q.open
      const changePercent = (change / q.open) * 100
      const newSpark = [...q.sparkline.slice(1), newPrice]
      return {
        ...q,
        price: newPrice,
        change,
        changePercent,
        high: Math.max(q.high, newPrice),
        low: Math.min(q.low, newPrice),
        sparkline: newSpark
      }
    })
  }

  onMounted(() => {
    initQuotes()
    const interval = setInterval(tick, 3000)
    onUnmounted(() => clearInterval(interval))
  })

  return { quotes, tick }
}
