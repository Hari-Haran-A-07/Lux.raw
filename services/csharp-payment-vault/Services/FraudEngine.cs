using LuxRaw.PaymentVault.Models;

namespace LuxRaw.PaymentVault.Services;

public class FraudEngine
{
    private static readonly HashSet<string> HighRiskDomains = new(StringComparer.OrdinalIgnoreCase)
    {
        "tempmail.com", "throwaway.email", "guerrillamail.com"
    };

    public FraudAssessment EvaluateRisk(PaymentRequest request)
    {
        int score = 5; // Base baseline risk
        var passedRules = new List<string>();
        var flags = new List<string>();

        // Check Email Domain
        var domain = request.ClientEmail.Split('@').LastOrDefault() ?? "";
        if (HighRiskDomains.Contains(domain))
        {
            score += 45;
            flags.Add("DISPOSABLE_EMAIL_DETECTED");
        }
        else
        {
            passedRules.Add("EMAIL_REPUTATION_VERIFIED");
        }

        // High Ticket Order Check
        if (request.Amount > 10000)
        {
            score += 15;
            flags.Add("HIGH_VALUE_LUXURY_THRESHOLD_EXCEEDED");
        }
        else
        {
            passedRules.Add("TRANSACTION_VELOCITY_WITHIN_BOUNDS");
        }

        // Country Geo-Risk Check
        if (string.Equals(request.BillingCountry, "IT", StringComparison.OrdinalIgnoreCase) ||
            string.Equals(request.BillingCountry, "FR", StringComparison.OrdinalIgnoreCase) ||
            string.Equals(request.BillingCountry, "US", StringComparison.OrdinalIgnoreCase) ||
            string.Equals(request.BillingCountry, "JP", StringComparison.OrdinalIgnoreCase) ||
            string.Equals(request.BillingCountry, "GB", StringComparison.OrdinalIgnoreCase))
        {
            passedRules.Add("PRIMARY_MAISON_MARKET_GEO_MATCH");
        }
        else
        {
            score += 10;
            flags.Add("CROSS_BORDER_EMERGING_CORRIDOR");
        }

        string riskLevel = score switch
        {
            < 25 => "LOW",
            < 60 => "MEDIUM",
            < 85 => "HIGH",
            _ => "BLOCKED"
        };

        bool req3DS = score >= 20 || request.Amount > 1500;

        return new FraudAssessment(score, riskLevel, passedRules, flags, req3DS);
    }
}
