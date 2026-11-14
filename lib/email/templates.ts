/**
 * Email template helpers for Lux.raw transactional emails.
 * Returns HTML strings suitable for SendGrid, Resend, or Nodemailer.
 *
 * Usage: Pass the returned { subject, html, text } to your email sender.
 */

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface OrderItem {
  name: string;
  sku: string;
  quantity: number;
  price: number;
  currency: string;
  imageUrl?: string;
}

export interface OrderConfirmationData {
  customerName: string;
  orderNumber: string;
  orderDate: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  shippingAddress: string;
  estimatedDelivery: string;
}

export interface ShippingNotificationData {
  customerName: string;
  orderNumber: string;
  carrier: string;
  trackingNumber: string;
  trackingUrl: string;
  estimatedDelivery: string;
  items: Pick<OrderItem, 'name' | 'quantity'>[];
}

export interface VipWelcomeData {
  customerName: string;
  memberSince: string;
  discountCode: string;
  discountPercent: number;
  expiresAt: string;
}

// ---------------------------------------------------------------------------
// Order Confirmation
// ---------------------------------------------------------------------------

export function orderConfirmationTemplate(data: OrderConfirmationData): EmailTemplate {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #f0ebe1;">${item.name} (${item.sku})</td>
        <td style="padding:8px 0;border-bottom:1px solid #f0ebe1;text-align:center;">${item.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #f0ebe1;text-align:right;">${item.currency} ${item.price.toFixed(2)}</td>
      </tr>`
    )
    .join('');

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="font-family:'Helvetica Neue',Arial,sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;">
  <div style="background:#0a0a0a;padding:24px;text-align:center;">
    <h1 style="color:#C9A86C;letter-spacing:0.2em;font-size:22px;margin:0;">LUX.RAW</h1>
  </div>
  <div style="padding:32px 24px;">
    <h2>Thank you, ${data.customerName}.</h2>
    <p>Your order <strong>#${data.orderNumber}</strong> was placed on ${data.orderDate} and is being prepared with care.</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <thead><tr>
        <th style="text-align:left;padding-bottom:8px;">Item</th>
        <th style="text-align:center;padding-bottom:8px;">Qty</th>
        <th style="text-align:right;padding-bottom:8px;">Price</th>
      </tr></thead>
      <tbody>${itemsHtml}</tbody>
    </table>
    <p style="text-align:right;">Total: <strong>${data.currency} ${data.total.toFixed(2)}</strong></p>
    <p>Estimated delivery: <strong>${data.estimatedDelivery}</strong></p>
  </div>
  <div style="background:#f9f6f0;padding:16px 24px;font-size:12px;color:#888;text-align:center;">
    &copy; Lux.raw. All rights reserved.
  </div>
</body>
</html>`;

  const text = `Thank you ${data.customerName}. Order #${data.orderNumber} confirmed. Total: ${data.currency} ${data.total.toFixed(2)}. Estimated delivery: ${data.estimatedDelivery}.`;

  return { subject: `Your Lux.raw Order #${data.orderNumber} is Confirmed`, html, text };
}

// ---------------------------------------------------------------------------
// Shipping Notification
// ---------------------------------------------------------------------------

export function shippingNotificationTemplate(data: ShippingNotificationData): EmailTemplate {
  const html = `
<!DOCTYPE html>
<html>
<body style="font-family:'Helvetica Neue',Arial,sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;">
  <div style="background:#0a0a0a;padding:24px;text-align:center;">
    <h1 style="color:#C9A86C;letter-spacing:0.2em;font-size:22px;margin:0;">LUX.RAW</h1>
  </div>
  <div style="padding:32px 24px;">
    <h2>Your order is on its way, ${data.customerName}.</h2>
    <p>Order <strong>#${data.orderNumber}</strong> has been shipped via <strong>${data.carrier}</strong>.</p>
    <p>Tracking: <a href="${data.trackingUrl}" style="color:#C9A86C;">${data.trackingNumber}</a></p>
    <p>Estimated delivery: <strong>${data.estimatedDelivery}</strong></p>
  </div>
</body>
</html>`;

  const text = `Your Lux.raw order #${data.orderNumber} has shipped via ${data.carrier}. Track it at: ${data.trackingUrl}`;

  return { subject: `Your Lux.raw Order #${data.orderNumber} Has Shipped`, html, text };
}

// ---------------------------------------------------------------------------
// VIP Welcome
// ---------------------------------------------------------------------------

export function vipWelcomeTemplate(data: VipWelcomeData): EmailTemplate {
  const html = `
<!DOCTYPE html>
<html>
<body style="font-family:'Helvetica Neue',Arial,sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;">
  <div style="background:#0a0a0a;padding:24px;text-align:center;">
    <h1 style="color:#C9A86C;letter-spacing:0.2em;font-size:22px;margin:0;">LUX.RAW</h1>
  </div>
  <div style="padding:32px 24px;text-align:center;">
    <h2 style="color:#C9A86C;">Welcome to the Inner Circle, ${data.customerName}.</h2>
    <p>As a Lux.raw VIP member since ${data.memberSince}, you're entitled to exclusive access and privileges.</p>
    <p style="font-size:28px;letter-spacing:0.3em;font-weight:bold;margin:24px 0;">${data.discountCode}</p>
    <p>Use this code for <strong>${data.discountPercent}% off</strong> your next purchase. Valid until ${data.expiresAt}.</p>
  </div>
</body>
</html>`;

  const text = `Welcome to Lux.raw VIP, ${data.customerName}. Use code ${data.discountCode} for ${data.discountPercent}% off. Expires ${data.expiresAt}.`;

  return { subject: `Welcome to Lux.raw VIP — Your Exclusive Benefit Awaits`, html, text };
}
