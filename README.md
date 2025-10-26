# WhatsApp Expense Bot 💬💰

A powerful, type-safe WhatsApp bot that helps you track expenses directly through WhatsApp messages. Built with TypeScript and ready for cloud deployment.

> ✨ **Vibe coded** with [Claude Code](https://claude.com/claude-code) - AI-powered development at its finest!

## ✨ Features

- 💸 **Easy expense tracking** - Add expenses with simple commands or shorthand
- 📊 **Smart summaries** - View total, today's, and weekly expenses at a glance
- 📅 **Weekly breakdowns** - See last 4 weeks spending patterns
- 📆 **Monthly reports** - Track last 6 months with averages
- 📋 **Expense lists** - View recent transactions with dates
- 💾 **Automatic persistence** - All data saved locally in JSON
- 🔐 **Type-safe** - Built with TypeScript for reliability
- 🐳 **Docker ready** - Easy deployment to Railway, Render, or any cloud platform
- 🔒 **Privacy-first** - No API keys, no third-party services, your data stays with you

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- WhatsApp on your phone
- Terminal/command line

### Local Development

```bash
# Clone the repository
git clone https://github.com/kelokchan/whatsapp-expense-bot.git
cd whatsapp-expense-bot

# Install dependencies
npm install

# Start in development mode (auto-restart)
npm run dev

# Or build and run production
npm start
```

### Scan QR Code

Once started, a QR code will appear in your terminal:
1. Open WhatsApp on your phone
2. Go to **Settings → Linked Devices**
3. Tap **"Link a Device"**
4. Scan the QR code from your terminal

That's it! 🎉

## 💬 Commands

Send these messages to yourself on WhatsApp:

### Add Expenses

**Quick shorthand (recommended):**
```
50 lunch at cafe
12.50 coffee
100 groceries
```

**Full command:**
```
/add 50 lunch at cafe
/add 12.50 coffee
```

### View Reports

**Summary** - Quick overview
```
/summary
```
Shows: Total, count, average, today's total, last 7 days

**Weekly Breakdown** - Last 4 weeks
```
/weekly
```
Shows spending by week with date ranges and totals

**Monthly Breakdown** - Last 6 months
```
/monthly
```
Shows spending by month with 6-month average

**List Recent Expenses**
```
/list
```
Shows your last 10 expenses with dates

### Manage Data

**Clear all expenses**
```
/clear
```

**Get help**
```
/help
```

## 📊 Example Session

```
You: 50 lunch
Bot: ✅ Expense added!
     💰 $50.00 - lunch
     📅 10/26/2025, 1:30:00 PM

You: 12.50 coffee
Bot: ✅ Expense added!
     💰 $12.50 - coffee
     📅 10/26/2025, 2:15:00 PM

You: /summary
Bot: 📊 Expense Summary

     💰 Total: $62.50
     📝 Count: 2 expenses
     📊 Average: $31.25

     📅 Today: $62.50 (2 expenses)
     📅 Last 7 days: $62.50 (2 expenses)

You: /weekly
Bot: 📅 Weekly Breakdown

     📌 This Week
        10/20/2025 - 10/26/2025
        💰 $62.50 (2 expenses)
     ...
```

## 🏗️ Tech Stack

- **Language**: TypeScript
- **Runtime**: Node.js 20+
- **WhatsApp Client**: whatsapp-web.js
- **Data Storage**: JSON file (local)
- **Deployment**: Docker + Railway/Render/DigitalOcean

## 🚢 Deployment

This bot needs to run 24/7. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed guides on:

- **Railway.app** (Recommended - Free tier available)
- **Render.com** (Free with limitations)
- **DigitalOcean** ($5/month - Most reliable)
- **AWS/GCP** (Advanced)
- **Raspberry Pi** (One-time $35 cost)

### Quick Deploy to Railway

1. Push this repo to GitHub (already done! ✅)
2. Go to [railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub"
4. Select `whatsapp-expense-bot`
5. View logs → Scan QR code
6. Done! Bot runs 24/7

## 📁 Project Structure

```
whatsapp-expense-bot/
├── src/
│   ├── bot.ts          # Main bot logic (TypeScript)
│   └── types.ts        # Type definitions
├── dist/               # Compiled JavaScript (auto-generated)
├── expenses.json       # Your expense data (auto-created)
├── Dockerfile          # Container configuration
├── railway.json        # Railway deployment config
├── tsconfig.json       # TypeScript configuration
├── package.json        # Dependencies
├── DEPLOYMENT.md       # Detailed deployment guide
└── README.md          # This file
```

## 🛠️ Development

### Scripts

```bash
npm run dev      # Development with auto-restart (ts-node-dev)
npm run build    # Compile TypeScript to JavaScript
npm start        # Run compiled JavaScript
npm run watch    # Watch mode - auto-compile on changes
```

### TypeScript

All code is written in TypeScript with strict type checking:
- Full type safety for WhatsApp API
- Interfaces for Expense, WeekSummary, MonthSummary
- No implicit `any` types
- Strict null checks

### Customization

Modify [src/bot.ts](src/bot.ts) to:
- Change currency symbol (default: $)
- Add expense categories
- Implement budget limits
- Add spending alerts
- Export to CSV/Excel
- Integrate with databases

## 💾 Data Storage

Expenses are stored in `expenses.json`:

```json
[
  {
    "id": 1729950000000,
    "amount": 50.00,
    "description": "lunch",
    "date": "2025-10-26T18:30:00.000Z",
    "dateFormatted": "10/26/2025, 1:30:00 PM"
  }
]
```

## 🔒 Privacy & Security

- ✅ No external API calls (except WhatsApp)
- ✅ All data stored locally
- ✅ No tracking or analytics
- ✅ Session data encrypted by whatsapp-web.js
- ✅ Open source - audit the code yourself

## 🐛 Troubleshooting

**QR code doesn't appear:**
- Ensure Node.js 18+ is installed
- Delete `.wwebjs_auth` folder and restart

**Bot doesn't respond:**
- Check phone internet connection
- Close WhatsApp Web in browser (only one session allowed)
- Look for error messages in terminal

**Expenses not saving:**
- Check file permissions in bot directory
- Verify `expenses.json` is being created
- Check logs for errors

**Bot disconnects:**
- WhatsApp session expired - re-scan QR
- If deployed, check if platform spins down (upgrade plan)

**TypeScript errors:**
- Run `npm install` to ensure all dependencies installed
- Check Node.js version: `node --version` (should be 18+)

## 🤝 Contributing

This project was Vibe coded with Claude Code! Feel free to:
- Fork and customize
- Submit issues
- Create pull requests
- Share your improvements

## 📜 License

MIT License - Use freely for personal or commercial projects!

## 🙏 Acknowledgments

- Built with [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- Vibe coded with [Claude Code](https://claude.com/claude-code)
- TypeScript for type safety
- Docker for easy deployment

## 🔗 Links

- **Repository**: https://github.com/kelokchan/whatsapp-expense-bot
- **Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Issues**: https://github.com/kelokchan/whatsapp-expense-bot/issues

---

Made with ✨ by Vibe coding with [Claude Code](https://claude.com/claude-code)
