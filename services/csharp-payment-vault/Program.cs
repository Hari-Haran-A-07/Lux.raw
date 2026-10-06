using LuxRaw.PaymentVault.Models;
using LuxRaw.PaymentVault.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddSingleton<FraudEngine>();
builder.Services.AddSingleton<PaymentGateway>();

var app = builder.Build();

app.UseCors();

app.MapGet("/api/v1/payments/health", () => Results.Ok(new
{
    service = "luxury.Raw C# .NET 8 Enterprise Payment & Fraud Vault",
    language = "C# / .NET 8 Core",
    status = "HEALTHY",
    pciComplianceLevel = "PCI-DSS Level 1 Tier A",
    cryptographicEngine = "HMAC-SHA256 ISO 20022",
    timestamp = DateTime.UtcNow
}));

app.MapPost("/api/v1/payments/process", (PaymentRequest req, PaymentGateway gateway) =>
{
    var result = gateway.ProcessPayment(req);
    return Results.Ok(result);
});

app.MapPost("/api/v1/payments/fraud-check", (PaymentRequest req, FraudEngine fraudEngine) =>
{
    var assessment = fraudEngine.EvaluateRisk(req);
    return Results.Ok(assessment);
});

Console.WriteLine("🔷 [C# Payment Vault] luxury.Raw Payment & Fraud Ledger active on port 8083");
app.Run("http://0.0.0.0:8083");
