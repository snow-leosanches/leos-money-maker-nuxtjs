/**
 * Fund options inspired by typical 401(k) and 529 lineups from
 * Fidelity, Vanguard, and Morningstar-style plans.
 * @see https://www.fidelityworkplace.com/s/401ksmallbusiness-investments
 * @see https://ownyourfuture.vanguard.com (funds-chart)
 * @see https://www.morningstar.com/funds/these-are-funds-morningstars-401k
 */

export interface RetirementFundOption {
  id: string
  name: string
  category: string
}

/** 401(k) fund options (Fidelity, Vanguard, Morningstar style) */
export const FUNDS_401K: RetirementFundOption[] = [
  { id: 'fid-500', name: 'Fidelity 500 Index', category: 'US Large Cap' },
  { id: 'vng-500', name: 'Vanguard 500 Index', category: 'US Large Cap' },
  { id: 'vng-tsm', name: 'Vanguard Total Stock Market Index', category: 'US Large Cap' },
  { id: 'fid-ext', name: 'Fidelity Extended Market Index', category: 'US Mid/Small Cap' },
  { id: 'fid-intl', name: 'Fidelity International Index', category: 'International Stock' },
  { id: 'vng-intl', name: 'Vanguard Total International Stock Index', category: 'International Stock' },
  { id: 'fid-glb', name: 'Fidelity Global ex-US Index', category: 'International Stock' },
  { id: 'ss-glb', name: 'State Street Global All Cap ex-US Index', category: 'International Stock' },
  { id: 'fid-bond', name: 'Fidelity US Bond Index', category: 'US Bonds' },
  { id: 'vng-bond', name: 'Vanguard Total Bond Market Index', category: 'US Bonds' },
  { id: 'ss-bond', name: 'State Street Aggregate Bond Index', category: 'US Bonds' },
  { id: 'fid-tips', name: 'Fidelity Inflation-Protected Bond Index', category: 'US Bonds' },
  { id: 'fid-free-2050', name: 'Fidelity Freedom 2050', category: 'Target Date' },
  { id: 'vng-tgt-2050', name: 'Vanguard Target Retirement 2050', category: 'Target Date' },
  { id: 'vng-tgt-2040', name: 'Vanguard Target Retirement 2040', category: 'Target Date' },
  { id: 'fid-free-2040', name: 'Fidelity Freedom 2040', category: 'Target Date' },
  { id: 'fid-govt', name: 'Fidelity Government Money Market', category: 'Short-term / Cash' },
  { id: 'vng-mm', name: 'Vanguard Federal Money Market', category: 'Short-term / Cash' }
]

/** 529 education savings fund options */
export const FUNDS_529: RetirementFundOption[] = [
  { id: '529-age-0', name: 'Age-based 0–5 Equity', category: 'Age-based' },
  { id: '529-age-6', name: 'Age-based 6–10 Equity', category: 'Age-based' },
  { id: '529-age-11', name: 'Age-based 11–15 Equity', category: 'Age-based' },
  { id: '529-age-16', name: 'Age-based 16+ Equity', category: 'Age-based' },
  { id: '529-vng-stk', name: 'Vanguard US Stock Index', category: 'US Stock' },
  { id: '529-fid-stk', name: 'Fidelity US Stock Index', category: 'US Stock' },
  { id: '529-vng-intl', name: 'Vanguard International Stock Index', category: 'International' },
  { id: '529-vng-bond', name: 'Vanguard Bond Index', category: 'Bond' },
  { id: '529-fid-bond', name: 'Fidelity Bond Index', category: 'Bond' },
  { id: '529-mm', name: 'Money Market / Stable Value', category: 'Cash' }
]

export function getFund401k(id: string): RetirementFundOption | undefined {
  return FUNDS_401K.find((f) => f.id === id)
}

export function getFund529(id: string): RetirementFundOption | undefined {
  return FUNDS_529.find((f) => f.id === id)
}
