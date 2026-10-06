using System.Security.Cryptography;
using System.Text;
using LuxRaw.PaymentVault.Models;

namespace LuxRaw.PaymentVault.Services;

public class PaymentGateway
{
    private readonly FraudEngine _fraudEngine;
    private const string HmacSecret = "luxury_raw_pci_dss_master_key_2026";

    public PaymentGateway(FraudEngine fraudEngine)
    {
        _fraudEngine = fraudEngine;
    }

    public PaymentResult ProcessPayment(PaymentRequest request)
    {
        var fraud = _fraudEngine.EvaluateRisk(request);

        string status;
        if (fraud.RiskLevel == "BLOCKED")
        {
            status = "DECLINED";
        }
        else if (fraud.RiskLevel == "HIGH")
        {
            status = "REVIEW_REQUIRED";
        }
        else
        {
            status = "AUTHORIZED";
        }

        var transactionId = $"TXN-LUX-{Guid.NewGuid().ToString("N")[..12].ToUpper()}";
        var authorizedAt = DateTime.UtcNow;

        // Generate HMAC-SHA256 Cryptographic Signature for ISO 20022 Compliance
        var rawPayload = $"{transactionId}|{request.OrderId}|{request.Amount:F2}|{request.Currency}|{authorizedAt:O}";
        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(HmacSecret));
        var hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(rawPayload));
        var signature = Convert.ToHexString(hashBytes);

        return new PaymentResult(
            transactionId,
            request.OrderId,
            status,
            request.Amount,
            request.Currency,
            authorizedAt,
            signature,
            fraud,
            "pacs.008.001.09_LUXURY_DIRECT_SETTLEMENT"
        );
    }
}
