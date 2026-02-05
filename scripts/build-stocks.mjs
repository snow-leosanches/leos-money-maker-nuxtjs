#!/usr/bin/env node
/**
 * Builds public/data/stocks.json from:
 * - Dow Jones 30 (embedded)
 * - S&P 500 (embedded subset from stockanalysis.com/list/sp-500-stocks/)
 * - NASDAQ screener CSV (data/nasdaq_screener.csv) if present
 *
 * Run: node scripts/build-stocks.mjs
 * Optional: copy your NASDAQ CSV to data/nasdaq_screener.csv first.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const DOW_30 = [
  { symbol: 'MMM', name: '3M Company' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'AXP', name: 'American Express Company' },
  { symbol: 'AMGN', name: 'Amgen Inc.' },
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'BA', name: 'The Boeing Company' },
  { symbol: 'CAT', name: 'Caterpillar Inc.' },
  { symbol: 'CVX', name: 'Chevron Corporation' },
  { symbol: 'CSCO', name: 'Cisco Systems Inc.' },
  { symbol: 'KO', name: 'The Coca-Cola Company' },
  { symbol: 'GS', name: 'Goldman Sachs Group Inc.' },
  { symbol: 'HD', name: 'The Home Depot Inc.' },
  { symbol: 'HON', name: 'Honeywell International Inc.' },
  { symbol: 'IBM', name: 'International Business Machines Corporation' },
  { symbol: 'JNJ', name: 'Johnson & Johnson' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
  { symbol: 'MCD', name: "McDonald's Corporation" },
  { symbol: 'MRK', name: 'Merck & Co. Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'NKE', name: 'NIKE Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'PG', name: 'The Procter & Gamble Company' },
  { symbol: 'CRM', name: 'Salesforce Inc.' },
  { symbol: 'SHW', name: 'The Sherwin-Williams Company' },
  { symbol: 'TRV', name: 'The Travelers Companies Inc.' },
  { symbol: 'UNH', name: 'UnitedHealth Group Incorporated' },
  { symbol: 'VZ', name: 'Verizon Communications Inc.' },
  { symbol: 'V', name: 'Visa Inc.' },
  { symbol: 'WMT', name: 'Walmart Inc.' },
  { symbol: 'DIS', name: 'The Walt Disney Company' }
]

// S&P 500 subset (from stockanalysis.com/list/sp-500-stocks/)
const SP500_SUBSET = [
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'GOOG', name: 'Alphabet Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'AVGO', name: 'Broadcom Inc.' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.' },
  { symbol: 'WMT', name: 'Walmart Inc.' },
  { symbol: 'LLY', name: 'Eli Lilly and Company' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
  { symbol: 'V', name: 'Visa Inc.' },
  { symbol: 'XOM', name: 'Exxon Mobil Corporation' },
  { symbol: 'JNJ', name: 'Johnson & Johnson' },
  { symbol: 'MA', name: 'Mastercard Incorporated' },
  { symbol: 'COST', name: 'Costco Wholesale Corporation' },
  { symbol: 'MU', name: 'Micron Technology Inc.' },
  { symbol: 'BAC', name: 'Bank of America Corporation' },
  { symbol: 'ORCL', name: 'Oracle Corporation' },
  { symbol: 'ABBV', name: 'AbbVie Inc.' },
  { symbol: 'HD', name: 'The Home Depot Inc.' },
  { symbol: 'PG', name: 'The Procter & Gamble Company' },
  { symbol: 'CVX', name: 'Chevron Corporation' },
  { symbol: 'NFLX', name: 'Netflix Inc.' },
  { symbol: 'KO', name: 'The Coca-Cola Company' },
  { symbol: 'CSCO', name: 'Cisco Systems Inc.' },
  { symbol: 'GE', name: 'GE Aerospace' },
  { symbol: 'CAT', name: 'Caterpillar Inc.' },
  { symbol: 'AMD', name: 'Advanced Micro Devices Inc.' },
  { symbol: 'PLTR', name: 'Palantir Technologies Inc.' },
  { symbol: 'MRK', name: 'Merck & Co. Inc.' },
  { symbol: 'WFC', name: 'Wells Fargo & Company' },
  { symbol: 'PM', name: 'Philip Morris International Inc.' },
  { symbol: 'GS', name: 'The Goldman Sachs Group Inc.' },
  { symbol: 'MS', name: 'Morgan Stanley' },
  { symbol: 'IBM', name: 'International Business Machines Corporation' },
  { symbol: 'LRCX', name: 'Lam Research Corporation' },
  { symbol: 'RTX', name: 'RTX Corporation' },
  { symbol: 'AXP', name: 'American Express Company' },
  { symbol: 'INTC', name: 'Intel Corporation' },
  { symbol: 'UNH', name: 'UnitedHealth Group Incorporated' },
  { symbol: 'AMAT', name: 'Applied Materials Inc.' },
  { symbol: 'MCD', name: "McDonald's Corporation" },
  { symbol: 'PEP', name: 'PepsiCo Inc.' },
  { symbol: 'TMUS', name: 'T-Mobile US Inc.' },
  { symbol: 'LIN', name: 'Linde plc' },
  { symbol: 'TMO', name: 'Thermo Fisher Scientific Inc.' },
  { symbol: 'TXN', name: 'Texas Instruments Incorporated' },
  { symbol: 'C', name: 'Citigroup Inc.' },
  { symbol: 'VZ', name: 'Verizon Communications Inc.' },
  { symbol: 'GEV', name: 'GE Vernova Inc.' },
  { symbol: 'AMGN', name: 'Amgen Inc.' },
  { symbol: 'T', name: 'AT&T Inc.' },
  { symbol: 'ABT', name: 'Abbott Laboratories' },
  { symbol: 'BA', name: 'The Boeing Company' },
  { symbol: 'DIS', name: 'The Walt Disney Company' },
  { symbol: 'GILD', name: 'Gilead Sciences Inc.' },
  { symbol: 'NEE', name: 'NextEra Energy Inc.' },
  { symbol: 'SCHW', name: 'The Charles Schwab Corporation' },
  { symbol: 'CRM', name: 'Salesforce Inc.' },
  { symbol: 'KLAC', name: 'KLA Corporation' },
  { symbol: 'TJX', name: 'The TJX Companies Inc.' },
  { symbol: 'BLK', name: 'BlackRock Inc.' },
  { symbol: 'ISRG', name: 'Intuitive Surgical Inc.' },
  { symbol: 'ANET', name: 'Arista Networks Inc.' },
  { symbol: 'ADI', name: 'Analog Devices Inc.' },
  { symbol: 'APH', name: 'Amphenol Corporation' },
  { symbol: 'UBER', name: 'Uber Technologies Inc.' },
  { symbol: 'LOW', name: "Lowe's Companies Inc." },
  { symbol: 'BX', name: 'Blackstone Inc.' },
  { symbol: 'DE', name: 'Deere & Company' },
  { symbol: 'PFE', name: 'Pfizer Inc.' },
  { symbol: 'DHR', name: 'Danaher Corporation' },
  { symbol: 'HON', name: 'Honeywell International Inc.' },
  { symbol: 'UNP', name: 'Union Pacific Corporation' },
  { symbol: 'QCOM', name: 'QUALCOMM Incorporated' },
  { symbol: 'ACN', name: 'Accenture plc' },
  { symbol: 'BKNG', name: 'Booking Holdings Inc.' },
  { symbol: 'LMT', name: 'Lockheed Martin Corporation' },
  { symbol: 'SYK', name: 'Stryker Corporation' },
  { symbol: 'ETN', name: 'Eaton Corporation plc' },
  { symbol: 'SPGI', name: 'S&P Global Inc.' },
  { symbol: 'COF', name: 'Capital One Financial Corporation' },
  { symbol: 'MDT', name: 'Medtronic plc' },
  { symbol: 'WELL', name: 'Welltower Inc.' },
  { symbol: 'CB', name: 'Chubb Limited' },
  { symbol: 'COP', name: 'ConocoPhillips' },
  { symbol: 'PLD', name: 'Prologis Inc.' },
  { symbol: 'BMY', name: 'Bristol-Myers Squibb Company' },
  { symbol: 'APP', name: 'AppLovin Corporation' },
  { symbol: 'PH', name: 'Parker-Hannifin Corporation' },
  { symbol: 'PGR', name: 'The Progressive Corporation' },
  { symbol: 'INTU', name: 'Intuit Inc.' },
  { symbol: 'MCK', name: 'McKesson Corporation' },
  { symbol: 'NEM', name: 'Newmont Corporation' },
  { symbol: 'VRTX', name: 'Vertex Pharmaceuticals Incorporated' },
  { symbol: 'HCA', name: 'HCA Healthcare Inc.' },
  { symbol: 'BSX', name: 'Boston Scientific Corporation' },
  { symbol: 'CMCSA', name: 'Comcast Corporation' },
  { symbol: 'ADBE', name: 'Adobe Inc.' },
  { symbol: 'PANW', name: 'Palo Alto Networks Inc.' },
  { symbol: 'SBUX', name: 'Starbucks Corporation' },
  { symbol: 'MO', name: 'Altria Group Inc.' },
  { symbol: 'NOW', name: 'ServiceNow Inc.' },
  { symbol: 'CME', name: 'CME Group Inc.' },
  { symbol: 'SO', name: 'The Southern Company' },
  { symbol: 'UPS', name: 'United Parcel Service Inc.' },
  { symbol: 'CRWD', name: 'CrowdStrike Holdings Inc.' },
  { symbol: 'NOC', name: 'Northrop Grumman Corporation' },
  { symbol: 'CVS', name: 'CVS Health Corporation' },
  { symbol: 'TT', name: 'Trane Technologies plc' },
  { symbol: 'ICE', name: 'Intercontinental Exchange Inc.' },
  { symbol: 'DUK', name: 'Duke Energy Corporation' },
  { symbol: 'GD', name: 'General Dynamics Corporation' },
  { symbol: 'GLW', name: 'Corning Incorporated' },
  { symbol: 'ADP', name: 'Automatic Data Processing Inc.' },
  { symbol: 'PNC', name: 'The PNC Financial Services Group Inc.' },
  { symbol: 'NKE', name: 'NIKE Inc.' },
  { symbol: 'USB', name: 'U.S. Bancorp' },
  { symbol: 'WM', name: 'Waste Management Inc.' },
  { symbol: 'CEG', name: 'Constellation Energy Corporation' },
  { symbol: 'SHW', name: 'The Sherwin-Williams Company' },
  { symbol: 'RCL', name: 'Royal Caribbean Cruises Ltd.' },
  { symbol: 'STX', name: 'Seagate Technology Holdings plc' },
  { symbol: 'WDC', name: 'Western Digital Corporation' },
  { symbol: 'KKR', name: 'KKR & Co. Inc.' },
  { symbol: 'MAR', name: 'Marriott International Inc.' },
  { symbol: 'MMM', name: '3M Company' },
  { symbol: 'FDX', name: 'FedEx Corporation' },
  { symbol: 'FCX', name: 'Freeport-McMoRan Inc.' },
  { symbol: 'EMR', name: 'Emerson Electric Co.' },
  { symbol: 'ITW', name: 'Illinois Tool Works Inc.' },
  { symbol: 'CVNA', name: 'Carvana Co.' },
  { symbol: 'HWM', name: 'Howmet Aerospace Inc.' },
  { symbol: 'BK', name: 'The Bank of New York Mellon Corporation' },
  { symbol: 'WMB', name: 'The Williams Companies Inc.' },
  { symbol: 'CRH', name: 'CRH plc' },
  { symbol: 'MCO', name: "Moody's Corporation" },
  { symbol: 'ECL', name: 'Ecolab Inc.' },
  { symbol: 'AMT', name: 'American Tower Corporation' },
  { symbol: 'JCI', name: 'Johnson Controls International plc' },
  { symbol: 'MNST', name: 'Monster Beverage Corporation' },
  { symbol: 'REGN', name: 'Regeneron Pharmaceuticals Inc.' },
  { symbol: 'DASH', name: 'DoorDash Inc.' },
  { symbol: 'EQIX', name: 'Equinix Inc.' },
  { symbol: 'SNPS', name: 'Synopsys Inc.' },
  { symbol: 'CTAS', name: 'Cintas Corporation' },
  { symbol: 'ORLY', name: "O'Reilly Automotive Inc." },
  { symbol: 'MDLZ', name: 'Mondelez International Inc.' },
  { symbol: 'DELL', name: 'Dell Technologies Inc.' },
  { symbol: 'GM', name: 'General Motors Company' },
  { symbol: 'CL', name: 'Colgate-Palmolive Company' },
  { symbol: 'CI', name: 'The Cigna Group' },
  { symbol: 'SPG', name: 'Simon Property Group Inc.' },
  { symbol: 'AON', name: 'Aon plc' },
  { symbol: 'CDNS', name: 'Cadence Design Systems Inc.' },
  { symbol: 'ELV', name: 'Elevance Health Inc.' },
  { symbol: 'CMI', name: 'Cummins Inc.' },
  { symbol: 'CSX', name: 'CSX Corporation' },
  { symbol: 'SLB', name: 'SLB N.V.' },
  { symbol: 'ABNB', name: 'Airbnb Inc.' },
  { symbol: 'APO', name: 'Apollo Global Management Inc.' },
  { symbol: 'HLT', name: 'Hilton Worldwide Holdings Inc.' },
  { symbol: 'PWR', name: 'Quanta Services Inc.' },
  { symbol: 'TDG', name: 'TransDigm Group Incorporated' },
  { symbol: 'TFC', name: 'Truist Financial Corporation' },
  { symbol: 'MSI', name: 'Motorola Solutions Inc.' },
  { symbol: 'COR', name: 'Cencora Inc.' },
  { symbol: 'NSC', name: 'Norfolk Southern Corporation' },
  { symbol: 'RSG', name: 'Republic Services Inc.' },
  { symbol: 'PCAR', name: 'PACCAR Inc' },
  { symbol: 'KMI', name: 'Kinder Morgan Inc.' },
  { symbol: 'HOOD', name: 'Robinhood Markets Inc.' },
  { symbol: 'WBD', name: 'Warner Bros. Discovery Inc.' },
  { symbol: 'TRV', name: 'The Travelers Companies Inc.' }
]

function parseCsv(path) {
  const raw = readFileSync(path, 'utf-8')
  const lines = raw.split(/\r?\n/).filter(Boolean)
  if (lines.length < 2) return []
  const header = lines[0].split(',')
  const symIdx = header.findIndex((h) => h.trim() === 'Symbol')
  const nameIdx = header.findIndex((h) => h.trim() === 'Name')
  if (symIdx === -1 || nameIdx === -1) return []
  const out = []
  const seen = new Set()
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i]
    const match = row.match(/("(?:[^"]|"")*"|[^,]*)/g)
    if (!match) continue
    const symbol = (match[symIdx] || '').replace(/^"|"$/g, '').trim()
    let name = (match[nameIdx] || '').replace(/^"|"$/g, '').replace(/""/g, '"').trim()
    if (!symbol || symbol.length > 10) continue
    if (seen.has(symbol)) continue
    seen.add(symbol)
    if (name.endsWith(' Common Stock') || name.endsWith(' Common Shares')) {
      name = name.replace(/\s+(Common Stock|Common Shares).*$/i, '').trim()
    }
    out.push({ symbol, name })
  }
  return out
}

function merge(stocks) {
  const bySymbol = new Map()
  for (const s of stocks) {
    if (!s.symbol) continue
    const key = s.symbol.toUpperCase()
    if (!bySymbol.has(key)) bySymbol.set(key, { symbol: key, name: s.name || key })
  }
  return Array.from(bySymbol.values()).sort((a, b) => a.symbol.localeCompare(b.symbol))
}

function main() {
  const csvPath = join(root, 'data', 'nasdaq_screener.csv')
  let all = [...DOW_30, ...SP500_SUBSET]
  if (existsSync(csvPath)) {
    try {
      const nasdaq = parseCsv(csvPath)
      all = [...all, ...nasdaq]
    } catch (e) {
      console.warn('Could not parse NASDAQ CSV:', e.message)
    }
  } else {
    console.warn('NASDAQ CSV not found at data/nasdaq_screener.csv — using Dow + S&P subset only.')
  }
  const merged = merge(all)
  const outDir = join(root, 'public', 'data')
  mkdirSync(outDir, { recursive: true })
  const outPath = join(outDir, 'stocks.json')
  writeFileSync(outPath, JSON.stringify(merged, null, 0), 'utf-8')
  console.log(`Wrote ${merged.length} stocks to ${outPath}`)
}

main()
