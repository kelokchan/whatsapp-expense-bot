# Deploy to Fly.io - Complete Guide

## Why Fly.io?

- ✅ **Truly free tier** - 3 shared VMs, 160GB bandwidth/month
- ✅ **No spin-down** - Runs 24/7 on free tier
- ✅ **Perfect for bots** - Designed for long-running apps
- ✅ **Easy deployment** - Simple CLI commands
- ✅ **Global regions** - Deploy close to you

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Fly.io CLI

**macOS:**
```bash
brew install flyctl
```

**Linux:**
```bash
curl -L https://fly.io/install.sh | sh
```

**Windows:**
```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

### Step 2: Sign Up & Login

```bash
# Sign up (free account)
fly auth signup

# Or login if you already have account
fly auth login
```

**Note**: You'll need to add a credit card for verification, but **won't be charged** on free tier.

### Step 3: Deploy Your Bot

```bash
# Navigate to project directory
cd whatsapp-expense-bot

# Launch the app (creates and deploys in one command)
fly launch --no-deploy

# When prompted:
# - App name: whatsapp-expense-bot (or choose your own)
# - Region: Choose closest to you (e.g., sin for Singapore, lax for LA)
# - PostgreSQL: NO
# - Redis: NO
# - Deploy now: NO (we'll do it manually)

# Now deploy
fly deploy
```

### Step 4: View Logs & Scan QR Code

```bash
# Watch live logs
fly logs

# You'll see:
# ✅ WhatsApp Expense Bot is ready!
# [QR CODE appears in ASCII art]
```

**Scan the QR code with WhatsApp:**
1. Open WhatsApp on your phone
2. Settings → Linked Devices
3. Link a Device
4. Scan the QR code from terminal

### Step 5: Done! 🎉

Your bot is now running 24/7 on Fly.io!

Test it:
```
Send to yourself: /help
```

---

## 📊 Useful Commands

```bash
# View logs (live)
fly logs

# View app status
fly status

# SSH into your app
fly ssh console

# Restart app
fly apps restart whatsapp-expense-bot

# Check resources
fly scale show

# Stop app (to save resources)
fly scale count 0

# Start app again
fly scale count 1

# View dashboard
fly dashboard
```

---

## 🔍 Monitoring

### Check if Bot is Running

```bash
fly status
```

You should see:
```
Machines
ID              STATE   REGION  HEALTH  ...
xyz123          started sin     passing
```

### View Real-time Logs

```bash
fly logs
```

Look for:
```
✅ WhatsApp Expense Bot is ready!
📨 Message received: "/help"
```

### Web Dashboard

```bash
fly dashboard
```

Opens your app in Fly.io web interface.

---

## 💾 Data Persistence

### Important: Volumes for Persistent Storage

By default, Fly.io containers are ephemeral (data lost on restart). To persist your WhatsApp session and expenses:

**Create a volume:**
```bash
fly volumes create whatsapp_data --size 1
```

**Update fly.toml** (already configured in your file):
```toml
[[mounts]]
  source = "whatsapp_data"
  destination = "/app/data"
```

**Update code** to save data to `/app/data/` instead of current directory.

---

## 🌍 Regions

Choose region closest to you for best performance:

| Code | Location |
|------|----------|
| sin | Singapore |
| nrt | Tokyo |
| syd | Sydney |
| lax | Los Angeles |
| ord | Chicago |
| iad | Virginia |
| lhr | London |
| fra | Frankfurt |

Change region:
```bash
fly regions set sin
```

---

## 💰 Free Tier Limits

Fly.io free tier includes:
- ✅ Up to 3 shared-cpu VMs
- ✅ 3GB persistent storage
- ✅ 160GB outbound data transfer/month
- ✅ No credit card required (but recommended for verification)

**Your WhatsApp bot uses:**
- 1 VM (512MB RAM) ✅
- Minimal bandwidth ✅
- ~100MB storage ✅

**You're well within free limits!** 🎉

---

## 🔧 Troubleshooting

### QR Code Not Showing

**Problem**: Logs don't show QR code

**Solution**:
```bash
fly logs
```
Wait for startup, QR appears once on boot.

To see it again:
```bash
fly apps restart whatsapp-expense-bot
fly logs
```

### Bot Disconnects

**Problem**: WhatsApp session closes

**Solution**:
- Re-scan QR code
- Make sure WhatsApp Web isn't open elsewhere
- Check if session data persists (add volume if needed)

### App Won't Start

**Problem**: Deployment fails or crashes

**Solutions**:
```bash
# Check logs for errors
fly logs

# Common fixes:
fly deploy --no-cache   # Rebuild from scratch
fly scale memory 1024   # Increase memory if needed
```

### Out of Memory

**Problem**: App crashes with OOM error

**Solution**:
```bash
# Upgrade to 1GB RAM (still free tier)
fly scale memory 1024
```

---

## 🔄 Updating Your Bot

When you make code changes:

```bash
# 1. Commit changes locally
git add .
git commit -m "Update bot"

# 2. Deploy to Fly.io
fly deploy

# 3. Watch deployment
fly logs
```

That's it! Fly.io rebuilds and deploys automatically.

---

## 💡 Pro Tips

### Keep Bot Running 24/7

Already configured! Your `fly.toml` has:
```toml
auto_stop_machines = false
auto_start_machines = false
min_machines_running = 1
```

This ensures your bot never stops.

### Save Costs (if needed)

Free tier is generous, but if you want to pause:
```bash
# Stop bot (saves resources)
fly scale count 0

# Start again
fly scale count 1
```

### Environment Variables

Add secrets (if needed):
```bash
fly secrets set MY_SECRET=value
```

### Multiple Environments

You can create separate apps:
```bash
fly launch --name whatsapp-bot-dev   # Development
fly launch --name whatsapp-bot-prod  # Production
```

---

## 🆚 Fly.io vs Others

| Platform | Free Tier | Always On | Easy Deploy | Bot-Friendly |
|----------|-----------|-----------|-------------|--------------|
| **Fly.io** | ✅ 3 VMs | ✅ Yes | ✅ Yes | ✅ Yes |
| Render | ✅ Yes | ❌ Sleeps | ✅ Yes | ⚠️ Limited |
| Railway | ⚠️ Credits | ✅ Yes | ✅ Yes | ✅ Yes |
| Heroku | ❌ Paid only | - | ✅ Yes | ✅ Yes |
| Vercel | ❌ Serverless | ❌ No | ✅ Yes | ❌ No |

---

## 📞 Support

**Fly.io Docs**: https://fly.io/docs
**Community**: https://community.fly.io
**Status**: https://status.flyio.net

**Your Bot Issues**: https://github.com/kelokchan/whatsapp-expense-bot/issues

---

## ✅ Checklist

After deployment, verify:

- [ ] `fly status` shows "started"
- [ ] `fly logs` shows "✅ WhatsApp Expense Bot is ready!"
- [ ] QR code appeared in logs
- [ ] Scanned QR with WhatsApp
- [ ] Bot responds to `/help`
- [ ] Can add expenses: `50 lunch`
- [ ] `/summary` works
- [ ] Bot runs 24/7 (check after a few hours)

---

## 🎯 Next Steps

1. ✅ Deploy to Fly.io (done!)
2. ✅ Scan QR code
3. ✅ Test with `/help`
4. 🎯 Start tracking expenses!
5. 📊 Check weekly/monthly reports
6. 🔧 Customize if needed

---

**Your bot is now live on Fly.io!** 🚀

No more spin-downs, no more port scanning errors, just a bot that works 24/7 for free!

---

Made with ✨ by Vibe coding with [Claude Code](https://claude.com/claude-code)
