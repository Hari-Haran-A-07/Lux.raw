using System.Text.Json.Serialization;

namespace LuxRaw.PaymentVault.Models;

public record PaymentRequest(
    [property: JsonPropertyName("orderId")] string OrderId,
    [property: JsonPropertyName("amount")] decimal Amount,
    [property: JsonPropertyName("currency")] string Currency,
    [property: JsonPropertyName("clientEmail")] string ClientEmail,
    [property: JsonPropertyName("paymentMethod")] string PaymentMethod, // CARD, APPLE_PAY, CRYPTO_USDC, WIRE_TRANSFER
    [property: JsonPropertyName("billingCountry")] string BillingCountry,
    [property: JsonPropertyName("cardLast4")] string? CardLast4,
    [property: JsonPropertyName("ipAddress")] string? IpAddress
);

public record FraudAssessment(
    [property: JsonPropertyName("riskScore")] int RiskScore, // 0 - 100
    [property: JsonPropertyName("riskLevel")] string RiskLevel, // LOW, MEDIUM, HIGH, BLOCKED
    [property: JsonPropertyName("fraudCheckRulesPassed")] List<string> RulesPassed,
    [property: JsonPropertyName("fraudFlags")] List<string> Flags,
    [property: JsonPropertyName("requires3DSecure")] bool Requires3DSecure
);

public record PaymentResult(
    [property: JsonPropertyName("transactionId")] string TransactionId,
    [property: JsonPropertyName("orderId")] string OrderId,
    [property: JsonPropertyName("status")] string Status, // AUTHORIZED, SETTLED, DECLINED, REVIEW_REQUIRED
    [property: JsonPropertyName("amount")] decimal Amount,
    [property: JsonPropertyName("currency")] string Currency,
    [property: JsonPropertyName("authorizedAt")] DateTime AuthorizedAt,
    [property: JsonPropertyName("cryptographicSignature")] string CryptographicSignature,
    [property: JsonPropertyName("fraudAssessment")] FraudAssessment FraudAssessment,
    [property: JsonPropertyName("iso20022Standard")] string Iso20022Standard
);
