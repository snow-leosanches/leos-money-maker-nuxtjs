export interface CryptoWallet {
  id: string
  name: string
  symbol: string
  balance: number
  priceUsd: number
  change24h: number
  icon: string
}

const WALLETS: Omit<CryptoWallet, 'priceUsd' | 'change24h'>[] = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', balance: 0.42, icon: 'i-lucide-bitcoin' },
  { id: 'bch', name: 'Bitcoin Cash', symbol: 'BCH', balance: 5.2, icon: 'i-lucide-circle-dollar-sign' },
  { id: 'ltc', name: 'Litecoin', symbol: 'LTC', balance: 18.5, icon: 'i-lucide-coins' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', balance: 2.1, icon: 'i-lucide-sparkles' }
]

const BASE_PRICES: Record<string, number> = {
  btc: 97200,
  bch: 420,
  ltc: 98,
  eth: 3480
}

function randomPercent() {
  return (Math.random() - 0.45) * 6
}

export function useCryptoWallets() {
  const wallets = ref<CryptoWallet[]>([])

  function init() {
    wallets.value = WALLETS.map((w) => {
      const base = BASE_PRICES[w.id] ?? 0
      const change24h = randomPercent()
      const priceUsd = base * (1 + change24h / 100)
      return {
        ...w,
        priceUsd,
        change24h
      }
    })
  }

  function tick() {
    wallets.value = wallets.value.map((w) => {
      const base = BASE_PRICES[w.id] ?? 0
      const change24h = randomPercent()
      const priceUsd = base * (1 + change24h / 100)
      return { ...w, priceUsd, change24h }
    })
  }

  onMounted(() => {
    init()
    const interval = setInterval(tick, 3000)
    onUnmounted(() => clearInterval(interval))
  })

  return { wallets }
}
