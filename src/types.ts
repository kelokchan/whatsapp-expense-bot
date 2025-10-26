/**
 * Represents a single expense entry
 */
export interface Expense {
  /** Unique identifier for the expense */
  id: number;
  /** Amount of money spent */
  amount: number;
  /** Description of what the expense was for */
  description: string;
  /** ISO 8601 date string of when the expense was recorded */
  date: string;
  /** Human-readable formatted date string */
  dateFormatted: string;
}

/**
 * Week summary data
 */
export interface WeekSummary {
  /** Start date of the week */
  start: Date;
  /** End date of the week */
  end: Date;
  /** Total expenses for this week */
  total: number;
  /** Number of expenses in this week */
  count: number;
  /** Whether this is the current week */
  isCurrent: boolean;
}

/**
 * Month summary data
 */
export interface MonthSummary {
  /** Month name and year (e.g., "October 2025") */
  name: string;
  /** Total expenses for this month */
  total: number;
  /** Number of expenses in this month */
  count: number;
  /** Whether this is the current month */
  isCurrent: boolean;
}
