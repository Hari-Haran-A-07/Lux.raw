export type LuxuryCurrency = "EUR" | "USD" | "GBP" | "JPY" | "CHF" | "AED";

export function formatLuxuryPrice(
  amountInCents: number,
  currency: LuxuryCurrency = "EUR",
  locale = "en-US"
): string {
  const value = amountInCents / 100;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: currency === "JPY" ? 0 : 2,
    maximumFractionDigits: currency === "JPY" ? 0 : 2,
  }).format(value);
}
