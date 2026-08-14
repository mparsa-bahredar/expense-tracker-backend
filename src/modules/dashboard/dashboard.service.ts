import { prisma } from "../../../prisma/prisma";

export class DashboardService {
  async getDashboard(userId: number) {
    const now = new Date();

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      1
    );

    const sixMonthsAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 5,
      1
    );

    const [
    bankAccounts,
    wallet,
    transactions,
    recentTransactions,
    monthlyTransactions,
    ] = await Promise.all([
    prisma.bankAccount.findMany({
        where: { userId },
        select: { balance: true },
    }),

    prisma.wallet.findFirst({
        where: { userId },
        select: { balance: true },
    }),

    prisma.transaction.findMany({
        where: {
        userId,
        createdAt: {
            gte: startOfMonth,
            lt: endOfMonth,
        },
        },
        include: {
        category: true,
        },
    }),

    prisma.transaction.findMany({
        where: { userId },
        orderBy: {
        createdAt: "desc",
        },
        take: 5,
        include: {
        category: true,
        },
    }),

    prisma.transaction.findMany({
        where: {
        userId,
        createdAt: {
            gte: sixMonthsAgo,
            lt: endOfMonth,
        },
        },
        select: {
        amount: true,
        type: true,
        createdAt: true,
        },
    }),
    ]);

    const bankBalance = bankAccounts.reduce(
      (total, account) =>
        total + Number(account.balance),
      0
    );

    const walletBalance = wallet
      ? Number(wallet.balance)
      : 0;

    const totalBalance =
      bankBalance + walletBalance;

    let monthlyIncome = 0;
    let monthlyExpense = 0;

    for (const transaction of transactions) {
      const amount = Number(transaction.amount);

      if (transaction.type === "INCOME") {
        monthlyIncome += amount;
      }

      if (transaction.type === "EXPENSE") {
        monthlyExpense += amount;
      }
    }

    const monthlySavings =
      monthlyIncome - monthlyExpense;

    const expenseByCategory: Record<
      string,
      number
    > = {};

    for (const transaction of transactions) {
      if (transaction.type !== "EXPENSE") {
        continue;
      }

      const categoryName =
        transaction.category.name;

      expenseByCategory[categoryName] =
        (expenseByCategory[categoryName] || 0) +
        Number(transaction.amount);
    }

    const monthlyOverview: Record<
      string,
      {
        income: number;
        expense: number;
      }
    > = {};

    for (const transaction of monthlyTransactions) {
      const month = `${transaction.createdAt.getFullYear()}-${String(
        transaction.createdAt.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!monthlyOverview[month]) {
        monthlyOverview[month] = {
          income: 0,
          expense: 0,
        };
      }

      const amount = Number(transaction.amount);

      if (transaction.type === "INCOME") {
        monthlyOverview[month].income += amount;
      }

      if (transaction.type === "EXPENSE") {
        monthlyOverview[month].expense += amount;
      }
    }

    return {
      cards: {
        totalBalance,
        monthlyIncome,
        monthlyExpense,
        monthlySavings,
      },

      recentTransactions,

      expenseByCategory: Object.entries(
        expenseByCategory
      ).map(([category, amount]) => ({
        category,
        amount,
      })),

      monthlyOverview: Object.entries(
        monthlyOverview
      ).map(([month, data]) => ({
        month,
        ...data,
      })),
    };
  }
}

export default DashboardService;