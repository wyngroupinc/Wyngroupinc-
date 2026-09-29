// Cloudflare Pages Function: receives the buyer intake form and forwards it to a GoHighLevel
// Inbound Webhook, then sends the visitor to the calendar page with their details prefilled.
//
// SETUP (one time):
// 1. In GHL: Automation → Workflows → Create Workflow → Add Trigger → "Inbound Webhook". Copy the URL it shows.
// 2. Paste that URL between the quotes on the next line and commit this file at  functions/api/lead.js  in the repo root.
// 3. In the same workflow add: "Create / Update Contact" (map first_name, last_name, email, phone, company),
//    "Add Tag" (e.g. buyer-test-request), then your no-booking SMS/email sequence.
//    The three answers arrive as custom values: shop_type, buys_now, leads_per_day.

const GHL_WEBHOOK_URL = "PASTE_YOUR_GHL_INBOUND_WEBHOOK_URL_HERE";

export async function onRequestPost({ request }) {
  let data = {};
  const type = request.headers.get("content-type") || "";
  try {
    if (type.includes("application/json")) {
      data = await request.json();
    } else {
      const fd = await request.formData();
      for (const [k, v] of fd.entries()) data[k] = v;
    }
  } catch (e) {
    data = {};
  }

  // Honeypot: real people never fill this hidden field.
  if (data.website_url) {
    return Response.redirect(new URL("/book-call", request.url), 302);
  }

  const payload = {
    first_name: data.first_name || "",
    last_name: data.last_name || "",
    email: data.email || "",
    phone: data.phone || "",
    company: data.company || "",
    shop_type: data.shop_type || "",
    buys_now: data.buys_now || "",
    leads_per_day: data.leads_per_day || "",
    consent: data.consent === "yes" ? "yes" : "no",
    source: data.source || "start-test",
    submitted_at: new Date().toISOString(),
    page: request.headers.get("referer") || "",
  };

  if (GHL_WEBHOOK_URL.startsWith("https://")) {
    try {
      await fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      // If GHL is unreachable the calendar booking still captures the contact, so we carry on.
    }
  }

  // JSON callers (the page's script) get a 200; plain form posts (no JavaScript) get redirected.
  if (type.includes("application/json")) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  const next = new URL("/book-call", request.url);
  next.searchParams.set("first_name", payload.first_name);
  next.searchParams.set("last_name", payload.last_name);
  next.searchParams.set("email", payload.email);
  next.searchParams.set("phone", payload.phone);
  return Response.redirect(next.toString(), 302);
}

export async function onRequestGet({ request }) {
  return Response.redirect(new URL("/start-test", request.url), 302);
}
