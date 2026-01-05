# Setup Instructions for TripRex Booking System

This guide will help you set up the real booking functionality with Supabase and Stripe.

## Quick Start (5 minutes)

### 1. Set Up Supabase Database

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Click **"New Project"**
3. Fill in:
   - Project name: `triprex-bookings`
   - Database password: (choose a strong password - save it!)
   - Region: Choose closest to you
4. Wait for project to finish setting up (~2 minutes)
5. Go to **Settings** → **Database**
6. Copy the **Connection string (URI)** 
7. Replace `[YOUR-PASSWORD]` in the connection string with your database password
8. Add to your `.env.local` file:
   ```
   DATABASE_URL=postgresql://postgres:your_password@db.xxxxx.supabase.co:5432/postgres
   ```

### 2. Initialize Database

Run these commands in your terminal:

```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma db push

# Optional: Open Prisma Studio to view your database
npx prisma studio
```

### 3. Set Up Stripe (Test Mode)

1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Sign up for a free account
3. Skip the "Activate payments" step for now (we'll use test mode)
4. Go to **Developers** → **API keys**
5. Copy your **test mode** keys:
   - Publishable key (starts with `pk_test_...`)
   - Secret key (starts with `sk_test_...`) - click **Reveal** to see it
6. Add to `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_xxxxx
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
   ```

### 4. Test the Setup

```bash
# Restart your dev server
npm run dev
```

The booking system is now ready! You can test with:
- Stripe test card: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC

## Optional: Email Notifications

### Option 1: Resend (Recommended - Simplest)

1. Go to [https://resend.com/signup](https://resend.com/signup)
2. Verify your email
3. Go to **API Keys** and create a new key
4. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxx
   EMAIL_FROM=bookings@yourdomain.com
   ```

### Option 2: SendGrid

1. Go to [https://signup.sendgrid.com/](https://signup.sendgrid.com/)
2. Complete verification
3. Create an API key under **Settings** → **API Keys**
4. Add to `.env.local`:
   ```
   SENDGRID_API_KEY=SG.xxxxx
   EMAIL_FROM=bookings@yourdomain.com
   ```

## Production Checklist

Before going live with real bookings:

- [ ] Switch to Amadeus **production** credentials
- [ ] Switch to Stripe **live mode** keys (remove `_test_` keys)
- [ ] Set up proper email domain verification
- [ ] Enable Supabase row-level security policies
- [ ] Add booking confirmation emails
- [ ] Test full booking flow end-to-end
- [ ] Set up webhooks for payment confirmations
- [ ] Implement proper error handling and logging
- [ ] Add terms & conditions acceptance
- [ ] Configure cancellation policies

## Troubleshooting

**Database connection fails:**
- Check your Supabase password is correct
- Ensure you're using the IPv4 connection string
- Check your IP is allowed (Supabase allows all by default)

**Stripe test payments fail:**
- Make sure you're using test mode keys (not live)
- Use test card `4242 4242 4242 4242`
- Check console for error messages

**Booking creation fails:**
- Check Amadeus credentials are correct
- Ensure you ran `npx prisma generate` and `npx prisma db push`
- Check Next.js console and terminal for error messages

## Need Help?

Check the implementation plan document for detailed architecture information.
