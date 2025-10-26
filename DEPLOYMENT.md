# Deployment Guide - WhatsApp Expense Bot

This bot needs to run continuously (24/7) to work. Here are your hosting options:

## Why Not Vercel/Netlify?

**These platforms don't work** because:
- They're designed for serverless functions (short-lived)
- WhatsApp bot needs persistent connection (always running)
- No support for QR code scanning interaction

---

## Option 1: Railway.app (Recommended - Easiest)

### Why Railway?
- ✅ Free tier ($5 credit/month, ~500 hours free)
- ✅ Easy deployment from GitHub
- ✅ Supports Docker & persistent processes
- ✅ Automatic restarts
- ✅ Can view logs to see QR code

### Setup Steps:

**1. Initialize Git (if not already done):**
```bash
cd whatsapp-expense-bot
git init
git add .
git commit -m "Initial commit"
```

**2. Push to GitHub:**
```bash
# Create a new repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/whatsapp-expense-bot.git
git branch -M main
git push -u origin main
```

**3. Deploy to Railway:**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `whatsapp-expense-bot` repository
6. Railway will auto-detect the Dockerfile and deploy

**4. Scan QR Code:**
1. Once deployed, click on your project
2. Go to "Deployments" → Click latest deployment
3. Click "View Logs"
4. You'll see the QR code in ASCII format
5. Scan it with WhatsApp (Settings → Linked Devices)

**Done!** Your bot is now running 24/7 on Railway.

### Important Notes:
- Railway free tier gives ~500 hours/month (enough for 20 days continuous)
- Upgrade to Hobby plan ($5/month) for unlimited usage
- Your WhatsApp session persists between restarts

---

## Option 2: Render.com (Free Alternative)

### Setup:

**1. Push code to GitHub** (same as Railway step 1-2)

**2. Deploy to Render:**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Configure:
   - **Name**: whatsapp-expense-bot
   - **Environment**: Docker
   - **Plan**: Free
6. Click "Create Web Service"

**3. View QR Code:**
- Go to "Logs" tab
- Scan the QR code displayed

### Limitations:
- Free tier spins down after 15 minutes of inactivity
- Bot will disconnect when inactive
- Not ideal for 24/7 usage

---

## Option 3: DigitalOcean App Platform

### Cost: $5/month (most reliable)

**1. Push to GitHub** (same as above)

**2. Deploy:**
1. Go to [digitalocean.com](https://www.digitalocean.com/products/app-platform)
2. Create account
3. Click "Create App" → "GitHub"
4. Select repository
5. DigitalOcean auto-detects Dockerfile
6. Choose $5/month Basic plan
7. Deploy

**3. View Logs for QR:**
- Go to app → "Runtime Logs"
- Scan QR code

### Benefits:
- Very reliable 24/7 uptime
- Automatic SSL/HTTPS
- Easy scaling
- $5/month flat rate

---

## Option 4: AWS EC2 / Google Cloud Compute

### Cost: ~$5-10/month
### Difficulty: Advanced

**Best for:** Production apps with high reliability needs

**Steps:**
1. Create a small VM instance (t2.micro on AWS)
2. SSH into the server
3. Install Node.js and npm
4. Clone your repository
5. Run `npm install && npm start`
6. Use `pm2` to keep bot running
7. Scan QR code from terminal

---

## Option 5: Run on Your Computer (Free!)

### Easiest but requires your computer to be on 24/7

**Option 5a: Your Main Computer**
```bash
npm install
npm start
# Scan QR code
# Keep terminal open
```

**Option 5b: Raspberry Pi (Best Free Option!)**
- Buy a Raspberry Pi (~$35)
- Install Node.js
- Run the bot 24/7
- Very low power consumption (~$2/year electricity)
- No ongoing costs

---

## Recommended Path

**For testing:** Run locally on your computer

**For real use:**
1. **Budget option**: Railway.app free tier (or Raspberry Pi)
2. **Reliable option**: DigitalOcean App Platform ($5/month)

---

## QR Code Scanning Tips

Since you're deploying remotely, you can't scan the QR directly. Here's how:

**Method 1: View in logs** (Railway/Render/DO)
- QR code displays as ASCII art in logs
- Scan directly from your screen

**Method 2: Export QR to image** (optional enhancement)
- Modify bot to save QR as image
- Upload to cloud storage
- Download and scan

**Method 3: Session persistence**
- Once scanned, session is saved in `.wwebjs_auth/`
- Bot reconnects automatically on restart
- Only need to scan once!

---

## Monitoring Your Bot

After deployment:

**Check if running:**
- Railway: View logs in dashboard
- Check for "✅ WhatsApp Expense Bot is ready!"

**Test it:**
- Send yourself a message: `/help`
- Should get instant reply

**View expenses data:**
- Data stored in `expenses.json`
- Persists between restarts (on Railway/DO/Render)

---

## Troubleshooting

**Bot disconnects frequently:**
- Use paid tier on Railway/Render
- Or switch to DigitalOcean

**QR code not showing:**
- Check logs
- Make sure Chromium installed (Dockerfile handles this)

**"Session closed" errors:**
- Re-scan QR code
- Check WhatsApp Web isn't open elsewhere

---

## Next Steps

1. Choose a hosting platform
2. Push code to GitHub
3. Deploy
4. Scan QR code from logs
5. Start tracking expenses!

Need help? Check the logs for error messages.
