/**
 * Currency formatter utility for multi-currency support
 * Handles formatting for luxury fashion e-commerce across global markets
 */

export type SupportedCurrency =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'AED'
  | 'CHF'
  | 'CNY'
  | 'HKD'
  | 'SGD'
  | 'KRW';

export type SupportedLocale =
  | 'en-US'
  | 'en-GB'
  | 'fr-FR'
  | 'de-DE'
  | 'ja-JP'
  | 'zh-CN'
  | 'ar-AE'
  | 'ko-KR';

export interface FormatOptions {
  showSymbol?: boolean;
  showCode?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  compact?: boolean;
}

/**
 * Format a numeric amount into a localized currency string.
 *
 * @param amount - The numeric value to format
 * @param currency - ISO 4217 currency code (e.g. 'USD', 'EUR')
 * @param locale - BCP 47 locale string (e.g. 'en-US', 'fr-FR')
 * @param options - Additional formatting options
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(1250.5, 'USD', 'en-US') // '$1,250.50'
 * formatCurrency(99000, 'JPY', 'ja-JP')  // '¥99,000'
 */
export function formatCurrency(
  amount: number,
  currency: SupportedCurrency = 'USD',
  locale: SupportedLocale = 'en-US',
  options: FormatOptions = {}
): string {
  const {
    showSymbol = true,
    showCode = false,
    minimumFractionDigits,
    maximumFractionDigits,
    compact = false,
  } = options;

  const intlOptions: Intl.NumberFormatOptions = {
    style: showSymbol ? 'currency' : 'decimal',
    currency: showSymbol ? currency : undefined,
    currencyDisplay: showCode ? 'code' : 'symbol',
    notation: compact ? 'compact' : 'standard',
    minimumFractionDigits,
    maximumFractionDigits,
  };

  try {
    return new Intl.NumberFormat(locale, intlOptions).format(amount);
  } catch {
    // Fallback for unsupported locale/currency combinations
    return `${currency} ${amount.toFixed(2)}`;
  }
}

/**
 * Convert amount between currencies using provided exchange rates.
 * Note: Fetch live rates from your exchange rate service before calling this.
 */
export function convertCurrency(
  amount: number,
  fromCurrency: SupportedCurrency,
  toCurrency: SupportedCurrency,
  rates: Record<string, number>
): number {
  if (fromCurrency === toCurrency) return amount;
  const fromRate = rates[fromCurrency] ?? 1;
  const toRate = rates[toCurrency] ?? 1;
  return (amount / fromRate) * toRate;
}

/**
 * Returns the minor unit (decimal places) for a given currency.
 * JPY and KRW have no decimal places; most others have 2.
 */
export function getCurrencyDecimalPlaces(currency: SupportedCurrency): number {
  const zeroDemical: SupportedCurrency[] = ['JPY', 'KRW'];
  return zeroDemical.includes(currency) ? 0 : 2;
}
