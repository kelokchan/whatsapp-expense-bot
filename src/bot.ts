import { Client, LocalAuth, Message } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';
import * as fs from 'fs';
import * as path from 'path';
import { Expense, WeekSummary, MonthSummary } from './types';

// Initialize WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth(),
});

// Data file for storing expenses
const DATA_FILE = path.join(__dirname, '..', 'expenses.json');

// Load existing expenses or create empty array
function loadExpenses(): Expense[] {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data) as Expense[];
  }
  return [];
}

// Save expenses to file
function saveExpenses(expenses: Expense[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2));
}

// Generate QR code for authentication
client.on('qr', (qr: string) => {
  console.log('Scan this QR code with WhatsApp:');
  qrcode.generate(qr, { small: true });
});

// Client is ready
client.on('ready', () => {
  console.log('✅ WhatsApp Expense Bot is ready!');
  console.log('Send messages to the bot with these commands:');
  console.log('  /add 50 lunch - Add an expense');
  console.log('  /summary - View total expenses');
  console.log('  /weekly - View weekly breakdown');
  console.log('  /monthly - View monthly breakdown');
  console.log('  /list - List all expenses');
  console.log('  /clear - Clear all expenses');
  console.log('  /help - Show help message');
});

// Handle incoming messages (including from yourself!)
client.on('message_create', async (message: Message) => {
  const text = message.body.trim();
  const chat = await message.getChat();

  if (!message.fromMe) {
    return;
  }

  // Debug logging
  console.log(`\n📨 Message received: "${text}"`);
  console.log(`   From: ${message.from}`);
  console.log(`   Chat: ${chat.name || 'Unknown'}`);

  // Parse commands
  if (text.startsWith('/add')) {
    console.log('   → Handling /add command');
    handleAddExpense(message, text);
  } else if (text === '/summary' || text === '/total') {
    console.log('   → Handling /summary command');
    handleSummary(message);
  } else if (text === '/weekly' || text === '/week') {
    console.log('   → Handling /weekly command');
    handleWeekly(message);
  } else if (text === '/monthly' || text === '/month') {
    console.log('   → Handling /monthly command');
    handleMonthly(message);
  } else if (text === '/list' || text === '/all') {
    console.log('   → Handling /list command');
    handleList(message);
  } else if (text === '/clear') {
    console.log('   → Handling /clear command');
    handleClear(message);
  } else if (text === '/help') {
    console.log('   → Handling /help command');
    handleHelp(message);
  } else if (text.match(/^\d+(\.\d{1,2})?\s+.+/)) {
    // Handle shorthand: "50 lunch" without /add
    console.log('   → Handling shorthand expense');
    handleAddExpense(message, '/add ' + text);
  } else {
    console.log('   → No matching command found');
  }
});

// Add expense handler
function handleAddExpense(message: Message, text: string): void {
  try {
    // Parse: /add 50 lunch at cafe
    // Or shorthand: 50 lunch at cafe
    const parts = text.replace('/add', '').trim().split(/\s+/);
    const amount = parseFloat(parts[0]);
    const description = parts.slice(1).join(' ');

    if (isNaN(amount) || amount <= 0) {
      message.reply('❌ Invalid amount. Use: /add 50 lunch');
      return;
    }

    if (!description) {
      message.reply('❌ Description required. Use: /add 50 lunch');
      return;
    }

    const expenses = loadExpenses();
    const expense: Expense = {
      id: Date.now(),
      amount: amount,
      description: description,
      date: new Date().toISOString(),
      dateFormatted: new Date().toLocaleString(),
    };

    expenses.push(expense);
    saveExpenses(expenses);

    message.reply(
      `✅ Expense added!\n💰 $${amount.toFixed(2)} - ${description}\n📅 ${
        expense.dateFormatted
      }`,
    );
  } catch (error) {
    console.error('Error adding expense:', error);
    message.reply('❌ Error adding expense. Use: /add 50 lunch');
  }
}

// Summary handler
function handleSummary(message: Message): void {
  const expenses = loadExpenses();

  if (expenses.length === 0) {
    message.reply(
      '📊 No expenses recorded yet.\n\nAdd an expense: /add 50 lunch',
    );
    return;
  }

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const count = expenses.length;
  const average = total / count;

  // Calculate today's expenses
  const today = new Date().toDateString();
  const todayExpenses = expenses.filter(
    (exp) => new Date(exp.date).toDateString() === today,
  );
  const todayTotal = todayExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Calculate this week's expenses
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekExpenses = expenses.filter((exp) => new Date(exp.date) >= weekAgo);
  const weekTotal = weekExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  let summary = `📊 *Expense Summary*\n\n`;
  summary += `💰 Total: $${total.toFixed(2)}\n`;
  summary += `📝 Count: ${count} expenses\n`;
  summary += `📊 Average: $${average.toFixed(2)}\n\n`;
  summary += `📅 *Today*: $${todayTotal.toFixed(2)} (${
    todayExpenses.length
  } expenses)\n`;
  summary += `📅 *Last 7 days*: $${weekTotal.toFixed(2)} (${
    weekExpenses.length
  } expenses)`;

  message.reply(summary);
}

// List handler
function handleList(message: Message): void {
  const expenses = loadExpenses();

  if (expenses.length === 0) {
    message.reply(
      '📋 No expenses recorded yet.\n\nAdd an expense: /add 50 lunch',
    );
    return;
  }

  // Show last 10 expenses
  const recent = expenses.slice(-10).reverse();

  let list = `📋 *Recent Expenses* (last ${recent.length})\n\n`;
  recent.forEach((exp, index) => {
    const date = new Date(exp.date);
    const dateStr = date.toLocaleDateString();
    list += `${index + 1}. 💰 $${exp.amount.toFixed(2)} - ${
      exp.description
    }\n   📅 ${dateStr}\n\n`;
  });

  if (expenses.length > 10) {
    list += `\n_Showing 10 of ${expenses.length} total expenses_`;
  }

  message.reply(list);
}

// Weekly breakdown handler
function handleWeekly(message: Message): void {
  const expenses = loadExpenses();

  if (expenses.length === 0) {
    message.reply(
      '📊 No expenses recorded yet.\n\nAdd an expense: /add 50 lunch',
    );
    return;
  }

  // Get last 4 weeks
  const now = new Date();
  const weeks: WeekSummary[] = [];

  for (let i = 0; i < 4; i++) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - i * 7 - weekStart.getDay()); // Start of week (Sunday)
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6); // End of week (Saturday)
    weekEnd.setHours(23, 59, 59, 999);

    const weekExpenses = expenses.filter((exp) => {
      const expDate = new Date(exp.date);
      return expDate >= weekStart && expDate <= weekEnd;
    });

    const total = weekExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    weeks.push({
      start: weekStart,
      end: weekEnd,
      total: total,
      count: weekExpenses.length,
      isCurrent: i === 0,
    });
  }

  let breakdown = `📅 *Weekly Breakdown*\n\n`;

  weeks.forEach((week, index) => {
    const weekLabel = week.isCurrent
      ? 'This Week'
      : `${index} week${index > 1 ? 's' : ''} ago`;
    const dateRange = `${week.start.toLocaleDateString()} - ${week.end.toLocaleDateString()}`;
    breakdown += `${week.isCurrent ? '📌' : '📆'} *${weekLabel}*\n`;
    breakdown += `   ${dateRange}\n`;
    breakdown += `   💰 $${week.total.toFixed(2)} (${week.count} expenses)\n\n`;
  });

  const fourWeekTotal = weeks.reduce((sum, week) => sum + week.total, 0);
  breakdown += `📊 *4-Week Total*: $${fourWeekTotal.toFixed(2)}`;

  message.reply(breakdown);
}

// Monthly breakdown handler
function handleMonthly(message: Message): void {
  const expenses = loadExpenses();

  if (expenses.length === 0) {
    message.reply(
      '📊 No expenses recorded yet.\n\nAdd an expense: /add 50 lunch',
    );
    return;
  }

  // Get last 6 months
  const now = new Date();
  const months: MonthSummary[] = [];

  for (let i = 0; i < 6; i++) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthStart = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth(),
      1,
    );
    monthStart.setHours(0, 0, 0, 0);

    const monthEnd = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth() + 1,
      0,
    );
    monthEnd.setHours(23, 59, 59, 999);

    const monthExpenses = expenses.filter((exp) => {
      const expDate = new Date(exp.date);
      return expDate >= monthStart && expDate <= monthEnd;
    });

    const total = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    months.push({
      name: monthStart.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
      total: total,
      count: monthExpenses.length,
      isCurrent: i === 0,
    });
  }

  let breakdown = `📅 *Monthly Breakdown*\n\n`;

  months.forEach((month) => {
    breakdown += `${month.isCurrent ? '📌' : '📆'} *${month.name}*\n`;
    breakdown += `   💰 $${month.total.toFixed(2)} (${
      month.count
    } expenses)\n\n`;
  });

  const sixMonthTotal = months.reduce((sum, month) => sum + month.total, 0);
  const sixMonthAvg = sixMonthTotal / 6;
  breakdown += `📊 *6-Month Total*: $${sixMonthTotal.toFixed(2)}\n`;
  breakdown += `📊 *Monthly Average*: $${sixMonthAvg.toFixed(2)}`;

  message.reply(breakdown);
}

// Clear handler
function handleClear(message: Message): void {
  const expenses = loadExpenses();
  const count = expenses.length;

  saveExpenses([]);
  message.reply(
    `🗑️ Cleared ${count} expenses.\n\nStart fresh with: /add 50 lunch`,
  );
}

// Help handler
function handleHelp(message: Message): void {
  const help =
    `🤖 *WhatsApp Expense Bot*\n\n` +
    `*Commands:*\n\n` +
    `/add 50 lunch\n` +
    `   Add an expense ($50 for lunch)\n\n` +
    `50 lunch\n` +
    `   Shorthand to add expense\n\n` +
    `/summary or /total\n` +
    `   View expense summary\n\n` +
    `/weekly or /week\n` +
    `   View last 4 weeks breakdown\n\n` +
    `/monthly or /month\n` +
    `   View last 6 months breakdown\n\n` +
    `/list or /all\n` +
    `   List recent expenses\n\n` +
    `/clear\n` +
    `   Clear all expenses\n\n` +
    `/help\n` +
    `   Show this help message\n\n` +
    `*Examples:*\n` +
    `• /add 12.50 coffee at starbucks\n` +
    `• 25 dinner\n` +
    `• /add 100 groceries\n` +
    `• /weekly\n` +
    `• /monthly`;

  message.reply(help);
}

// Initialize client
client.initialize();
