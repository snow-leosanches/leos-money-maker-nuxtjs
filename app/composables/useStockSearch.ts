export interface StockSearchResult {
  symbol: string
  name: string
}

const STOCKS_KEY = 'leos-money-maker-stocks'
const MAX_RESULTS = 10

export function useStockSearch() {
  const stocks = useState<StockSearchResult[] | null>(STOCKS_KEY, () => null)

  async function loadStocks() {
    if (stocks.value && stocks.value.length > 0) return
    try {
      const data = await $fetch<StockSearchResult[]>('/data/stocks.json')
      stocks.value = data ?? []
    } catch {
      stocks.value = []
    }
  }

  function search(query: string): StockSearchResult[] {
    const list = stocks.value
    if (!list || !query || query.length < 1) return []
    const q = query.trim().toUpperCase()
    const bySymbol = list.filter((s) => s.symbol.toUpperCase().startsWith(q))
    const byName = list.filter(
      (s) =>
        !s.symbol.toUpperCase().startsWith(q) &&
        s.name.toUpperCase().includes(q)
    )
    const combined = [...bySymbol, ...byName].slice(0, MAX_RESULTS)
    return combined
  }

  return {
    stocks: readonly(stocks),
    loadStocks,
    search
  }
}
