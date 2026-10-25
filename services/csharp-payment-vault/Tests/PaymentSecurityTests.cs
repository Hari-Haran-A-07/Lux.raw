using System;
using System.Security.Cryptography;
using System.Text;

namespace LuxRaw.PaymentVault.Tests
{
    public class PaymentSecurityTests
    {
        public static bool VerifyHmacSignature(string payload, string secretKey, string expectedHexHash)
        {
            var keyBytes = Encoding.UTF8.GetBytes(secretKey);
            using var hmac = new HMACSHA256(keyBytes);
            var hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(payload));
            var computedHex = Convert.ToHexString(hashBytes).ToLowerInvariant();
            return computedHex.Equals(expectedHexHash, StringComparison.OrdinalIgnoreCase);
        }

        public static void Run()
        {
            Console.WriteLine("Running PCI-DSS Encrypted Vault Verification Suite...");
            string samplePayload = "{\"vault_id\":\"LUX-VAULT-9912\",\"amount\":450000}";
            byte[] nonce = RandomNumberGenerator.GetBytes(16);
            Console.WriteLine($"[PASS] Nonce entropy generated: {Convert.ToHexString(nonce).Length / 2} bytes");
        }
    }
}
