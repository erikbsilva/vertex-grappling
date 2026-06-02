# Vertex Grappling — Landing Page

Private grappling coaching landing page with lead capture, Supabase storage, and WhatsApp notifications.

**Stack:** Next.js 14 · Tailwind CSS · Supabase · CallMeBot WhatsApp API · Vercel

---

## Setup (step by step)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Go to [supabase.com](https://supabase.com) and create a free project
2. In Supabase dashboard → **SQL Editor** → paste and run `supabase_schema.sql`
3. Go to **Project Settings → API** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role (secret)** → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Configure WhatsApp notifications (CallMeBot — free)

1. Save this number in your WhatsApp contacts: **+34 644 54 53 62**
2. Send this exact message to that contact: `I allow callmebot to send me messages`
3. You'll receive your **API key** back via WhatsApp
4. Copy that key → `CALLMEBOT_APIKEY`

> CallMeBot is free and requires no approval. The API key is tied to your WhatsApp number.

### 4. Create your .env.local

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
COACH_WHATSAPP_NUMBER=15615527276
CALLMEBOT_APIKEY=your-callmebot-key
```

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

1. Push the project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/vertex-grappling.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → **New Project** → import your GitHub repo

3. In Vercel project settings → **Environment Variables**, add all four variables from your `.env.local`:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `COACH_WHATSAPP_NUMBER`
   - `CALLMEBOT_APIKEY`

4. Click **Deploy**. Done.

> On every future `git push`, Vercel redeploys automatically.

---

## Viewing leads

In Supabase dashboard → **Table Editor → leads**. All form submissions appear here with name, WhatsApp, email, training background, and timestamp.

---

## Switching to Twilio (optional upgrade)

If you need higher reliability or volume, replace CallMeBot with Twilio WhatsApp:

1. Create a Twilio account and activate the WhatsApp sandbox (or apply for a business number)
2. Install: `npm install twilio`
3. Replace the `sendWhatsAppNotification` function in `app/api/leads/route.ts` with:

```ts
import twilio from 'twilio'

async function sendWhatsAppNotification(lead: {...}) {
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)
  await client.messages.create({
    from: 'whatsapp:+14155238886', // Twilio sandbox number
    to: `whatsapp:+${COACH_WHATSAPP}`,
    body: `New lead...(your message)`,
  })
}
```

Add `TWILIO_SID` and `TWILIO_AUTH_TOKEN` to your env variables.
