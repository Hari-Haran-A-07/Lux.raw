using System;

namespace LuxRaw.PaymentVault.Services
{
    public record EscrowSettlement(
        decimal NetItemTotal,
        decimal WhiteGloveCourierFee,
        decimal BespokeCustomizationFee,
        decimal HighValueInsuranceSurcharge,
        decimal EstimatedTax,
        decimal FinalSettlementTotal,
        string SettlementCurrency
    );

    public class EscrowCalculator
    {
        private const decimal WhiteGloveThreshold = 1000.00m;
        private const decimal BaseWhiteGloveFee = 85.00m;
        private const decimal InsuranceRateHighValue = 0.015m; // 1.5% for goods > 5000
        private const decimal DefaultVatRate = 0.20m; // 20% European luxury VAT

        public EscrowSettlement CalculateEscrow(
            decimal itemSubtotal,
            bool hasBespokeMonogram,
            string currency = "EUR"
        )
        {
            if (itemSubtotal < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(itemSubtotal), "Item subtotal cannot be negative.");
            }

            // Complimentary white glove above threshold
            decimal courierFee = itemSubtotal >= WhiteGloveThreshold ? 0.00m : BaseWhiteGloveFee;

            // Bespoke monogramming flat atelier setup fee if applied
            decimal monogramFee = hasBespokeMonogram ? 45.00m : 0.00m;

            // High-value jewel and fur insurance surcharge
            decimal insurance = itemSubtotal > 5000.00m ? Math.Round(itemSubtotal * InsuranceRateHighValue, 2) : 0.00m;

            // VAT calculation
            decimal taxableBase = itemSubtotal + monogramFee;
            decimal estimatedTax = Math.Round(taxableBase * DefaultVatRate, 2);

            decimal total = itemSubtotal + courierFee + monogramFee + insurance + estimatedTax;

            return new EscrowSettlement(
                NetItemTotal: itemSubtotal,
                WhiteGloveCourierFee: courierFee,
                BespokeCustomizationFee: monogramFee,
                HighValueInsuranceSurcharge: insurance,
                EstimatedTax: estimatedTax,
                FinalSettlementTotal: total,
                SettlementCurrency: currency
            );
        }
    }
}
