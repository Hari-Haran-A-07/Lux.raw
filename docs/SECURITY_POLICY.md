# Security Policy — Lux.raw

## Overview

The Lux.raw security team takes all security vulnerabilities seriously. We appreciate your efforts to responsibly disclose your findings, and we will make every effort to acknowledge your contributions.

---

## Supported Versions

The following versions of Lux.raw currently receive security updates:

| Version | Supported |
|---------|-----------|
| `main` (latest) | ✅ Active support |
| Last minor release | ✅ Security patches only |
| Older releases | ❌ No longer supported |

---

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities via public GitHub Issues.**

Instead, report them through one of these channels:

### Option A — GitHub Private Security Advisory (Preferred)

1. Navigate to the repository's **Security** tab
2. Click **"Report a vulnerability"**
3. Fill in the advisory form with as much detail as possible

### Option B — Email

Send a detailed report to: **security@luxraw.com**

Encrypt sensitive reports using our PGP key (available at `/.well-known/security.txt`).

---

## What to Include in Your Report

Please provide:

- A description of the vulnerability and its potential impact
- Steps to reproduce the issue (PoC code, curl commands, screenshots)
- Affected component(s) and version(s)
- Suggested remediation (if known)
- Your name/handle for acknowledgement (optional)

---

## Our Commitment

After receiving your report, we commit to:

| Timeline | Action |
|----------|--------|
| **Within 48 hours** | Acknowledge receipt of your report |
| **Within 7 days** | Assess severity and provide an initial response |
| **Within 30 days** | Provide a remediation plan or patch timeline |
| **Upon resolution** | Notify you and credit your disclosure (if desired) |

---

## Responsible Disclosure Guidelines

We kindly ask that you:

- Give us reasonable time to address the issue before public disclosure
- Avoid accessing, modifying, or deleting user data beyond what is necessary to demonstrate the vulnerability
- Do not perform DoS attacks, spam, or social engineering against our users or infrastructure
- Do not exploit the vulnerability for personal gain

---

## Scope

**In-scope:**
- `luxraw.com` and all subdomains
- Lux.raw API (`api.luxraw.com`)
- Authentication and session management
- Payment and checkout flows
- User data exposure

**Out-of-scope:**
- Third-party services (Stripe, Algolia, Vercel infrastructure)
- Social engineering or phishing attacks
- Physical security
- Automated scanner results without proof of exploitability

---

## Acknowledgements

We maintain a **Hall of Fame** for responsible disclosure contributors at `https://luxraw.com/security/hall-of-fame`. Researchers who report critical or high-severity vulnerabilities may be eligible for our bug bounty program (details shared privately upon confirmed report).
