# Deploy to Render - Quick Guide

## Why Render?

- ✅ Free tier available
- ✅ Auto-deploy from GitHub
- ✅ Simple setup (5 minutes)
- ✅ Docker support
- ✅ Easy to view logs for QR code

## ⚠️ Important Free Tier Note

Render's free tier **spins down after 15 minutes of inactivity**. This means:
- Your bot will stop responding when inactive
- It takes ~30 seconds to spin back up when you message it
- **Not ideal for 24/7 usage**, but great for testing!

For 24/7 usage, consider:
- Upgrade to Render's paid plan ($7/month)
- Use Railway.app instead (has free credits)
- Or DigitalOcean App Platform ($5/month)

---

## 🚀 Deployment Steps

### 1. Push to GitHub (Already Done! ✅)

Your code is already on GitHub at:
https://github.com/kelokchan/whatsapp-expense-bot

### 2. Sign Up for Render

Go to: https://render.com

Click **"Get Started for Free"** and sign up with GitHub

### 3. Create New Web Service

1. Click **"New +"** (top right)
2. Select **"Web Service"**
3. Connect your GitHub account if prompted
4. Find and select: `kelokchan/whatsapp-expense-bot`

### 4. Configure Service

Render will auto-detect your Dockerfile. Configure:

**Name**: `whatsapp-expense-bot` (or any name you want)

**Environment**: Docker (should be auto-selected)

**Branch**: `main`

**Plan**: **Free**

Leave other settings as default.

### 5. Deploy!

Click **"Create Web Service"**

Render will:
1. Clone your repo
2. Build the Docker image
3. Start your bot
4. Show you the logs

### 6. Scan QR Code

**This is the important part!**

1. Once deployed, you'll see the **"Logs"** tab
2. Watch the logs - you'll see ASCII art QR code appear
3. **Quickly scan it with WhatsApp** before it scrolls away

**To see QR code again:**
- Click "Manual Deploy" → "Deploy latest commit"
- Or wait for it to restart
- QR appears in logs on startup

### 7. Scan with WhatsApp

On your phone:
1. Open WhatsApp
2. Go to **Settings → Linked Devices**
3. Tap **"Link a Device"**
4. Scan the QR code from Render logs

### 8. Test Your Bot!

Send yourself a message:
```
/help
```

You should get a response! 🎉

---

## 📊 Monitoring Your Bot

### View Logs

In Render dashboard:
- Click your service
- Go to **"Logs"** tab
- You'll see:
  - "✅ WhatsApp Expense Bot is ready!"
  - Incoming messages
  - Any errors

### Check if Running

- Look for green "Live" badge
- Check logs for "ready" message

### Restart Service

If bot stops responding:
- Click **"Manual Deploy"**
- Select **"Clear build cache & deploy"**
- Re-scan QR code if needed

---

## 🔄 Auto-Deploy

Every time you push to GitHub, Render automatically:
1. Pulls latest code
2. Rebuilds Docker image
3. Restarts bot
4. **You'll need to re-scan QR code!**

To disable auto-deploy:
- Go to Settings → Build & Deploy
- Turn off "Auto-Deploy"

---

## ⚠️ Free Tier Limitations

### What Happens When It Spins Down:

1. After 15 minutes of no activity, bot goes to sleep
2. Your WhatsApp session is saved
3. When you send a message:
   - Bot wakes up (~30 seconds)
   - Might miss your first message
   - Subsequent messages work fine

### Solutions:

**Option 1: Keep It Awake (Hack)**
- Set up a cron job to ping your bot every 10 minutes
- Use a service like cron-job.org or UptimeRobot
- Free tier allows this

**Option 2: Upgrade to Paid**
- $7/month for Render
- Bot runs 24/7 without interruption
- More reliable

**Option 3: Use Different Platform**
- Railway.app: Free credits (~500 hours/month)
- DigitalOcean: $5/month, very reliable

---

## 🐛 Troubleshooting

### QR Code Not Showing in Logs

**Problem**: Logs don't show QR code

**Solution**:
- Trigger a new deploy: Manual Deploy → "Deploy latest commit"
- QR appears during startup
- Have WhatsApp ready to scan immediately

### Bot Disconnects Often

**Problem**: Session keeps closing

**Solution**:
- This is due to free tier spin-down
- Upgrade to paid plan ($7/month)
- Or use Railway/DigitalOcean instead

### Build Fails

**Problem**: "Build failed" error

**Solution**:
- Check logs for error messages
- Common issue: Docker build timeout
- Try: Settings → "Clear build cache & deploy"

### Can't Find QR Code

**Problem**: QR scrolled away in logs

**Solution**:
- Click "Manual Deploy" → "Deploy latest commit"
- QR appears at startup
- Use Ctrl+F to search for "Scan this QR code"

### Bot Not Responding

**Problem**: Messages not getting replies

**Solutions**:
1. Check if service is "Live" (green badge)
2. Look at logs for errors
3. Service might be spinning up (wait 30 sec)
4. Re-scan QR code if session expired

---

## 💡 Pro Tips

### Viewing QR Code Easily

After deployment:
1. Go to Logs tab
2. Use browser search (Ctrl+F / Cmd+F)
3. Search for: "Scan this QR"
4. QR code will be highlighted

### Keeping Bot Alive (Free Tier)

Set up a ping service:
1. Go to uptimerobot.com (free)
2. Add monitor for your Render URL
3. Ping every 5 minutes
4. Bot never spins down!

### Data Persistence

Your `expenses.json` persists on Render even after:
- Restarts
- Redeployments
- Spin-downs

Data is only lost if you:
- Delete the service
- Clear persistent storage

---

## 🔄 Updating Your Bot

### Method 1: Push to GitHub (Auto-Deploy)

```bash
# Make changes to code
git add .
git commit -m "Update bot"
git push

# Render auto-deploys!
# Check logs → Re-scan QR if needed
```

### Method 2: Manual Deploy

1. Go to Render dashboard
2. Click "Manual Deploy"
3. Select "Deploy latest commit"

---

## 💰 Pricing Comparison

| Platform | Free Tier | Paid | Best For |
|----------|-----------|------|----------|
| **Render** | Spins down after 15 min | $7/mo | Testing |
| **Railway** | 500 hrs/month | $5/mo | 24/7 hobby |
| **DigitalOcean** | No free tier | $5/mo | Production |

---

## ✅ Next Steps

1. ✅ Deploy to Render (done!)
2. ✅ Scan QR code
3. ✅ Test with `/help`
4. ⏭️ Start tracking expenses!
5. 🎯 Upgrade to paid if you need 24/7

---

## 🆘 Need Help?

- **Render Docs**: https://render.com/docs
- **GitHub Issues**: https://github.com/kelokchan/whatsapp-expense-bot/issues
- **Check Logs**: Always check Render logs first

---

## 🎉 You're Done!

Your WhatsApp expense bot is now live on Render!

Start tracking expenses:
```
50 lunch
/summary
/weekly
```

Enjoy! 🚀

---

Made with ✨ by Vibe coding with [Claude Code](https://claude.com/claude-code)
