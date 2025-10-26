# WhatsApp Expense Bot

A simple and easy-to-use WhatsApp bot that helps you track your expenses directly through WhatsApp messages.

## Features

- Add expenses with simple commands
- View expense summaries (total, today, this week)
- List recent expenses
- Automatic data persistence
- No API keys required - just scan a QR code!

## Prerequisites

- Node.js (v14 or higher)
- A phone with WhatsApp installed
- Basic terminal/command line knowledge

## Installation

1. Install dependencies:
```bash
cd whatsapp-expense-bot
npm install
```

2. Start the bot:
```bash
npm start
```

3. Scan the QR code that appears in your terminal with WhatsApp:
   - Open WhatsApp on your phone
   - Go to Settings > Linked Devices
   - Tap "Link a Device"
   - Scan the QR code

## Usage

Once connected, send messages to yourself (or the bot) with these commands:

### Add an Expense

**Full command:**
```
/add 50 lunch at cafe
```

**Shorthand (no /add needed):**
```
50 lunch at cafe
```

### View Summary
```
/summary
```
Shows:
- Total expenses
- Number of expenses
- Average expense
- Today's total
- Last 7 days total

### List Expenses
```
/list
```
Shows your last 10 expenses with dates

### Clear All Expenses
```
/clear
```
Deletes all recorded expenses

### Get Help
```
/help
```
Shows all available commands

## Examples

```
/add 12.50 coffee at starbucks
25 dinner with friends
/add 100 weekly groceries
85.99 gas for car
/summary
/list
```

## Data Storage

All expenses are saved in `expenses.json` in the bot directory. Each expense includes:
- Amount
- Description
- Timestamp
- Unique ID

## Tips

- The bot works with any WhatsApp chat (send commands to yourself!)
- Use decimal amounts: `12.50` or whole numbers: `50`
- Descriptions are flexible - use whatever makes sense to you
- Session persists - you only need to scan QR once

## Troubleshooting

**QR code doesn't appear:**
- Make sure Node.js is installed
- Try deleting `.wwebjs_auth` folder and restart

**Bot doesn't respond:**
- Check that your phone has internet connection
- Make sure WhatsApp Web is not open in a browser (can only have one session)

**Expenses not saving:**
- Check file permissions in the bot directory
- Look for `expenses.json` file

## Customization

You can modify [bot.js](bot.js) to:
- Change currency symbol (currently $)
- Add expense categories
- Export to CSV
- Set spending limits with alerts
- Add budget tracking

## Advanced: Alternative Approaches

### Twilio WhatsApp API (Production-Ready)
For a production bot with better reliability:
1. Sign up at https://www.twilio.com
2. Get WhatsApp Business API access
3. Use webhooks for message handling
4. Requires phone number verification and approval

### WhatsApp Business API (Official)
For enterprise use:
1. Apply for WhatsApp Business API
2. More features and official support
3. Requires business verification

## License

MIT - Feel free to modify and use as needed!
