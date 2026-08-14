import { prisma } from "../../../prisma/prisma";

export class ReportsService {
  async getSummary(userId: number) {
    const income = await prisma.transaction.aggregate({
      where: {
        userId,
        type: "INCOME",
      },
      _sum: {
        amount: true,
      },
    });

    const expense = await prisma.transaction.aggregate({
      where: {
        userId,
        type: "EXPENSE",
      },
      _sum: {
        amount: true,
      },
    });

    const totalIncome = Number(income._sum.amount || 0);
    const totalExpense = Number(expense._sum.amount || 0);

    return {
      totalIncome,
      totalExpense,
      totalSavings: totalIncome - totalExpense,
    };
  }

  async getMonthlyReport(userId: number) {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
      select: {
        amount: true,
        type: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const report: Record<string, {
      income: number;
      expense: number;
    }> = {};

    for (const transaction of transactions) {
      const month = transaction.createdAt
        .toISOString()
        .slice(0, 7);

      if (!report[month]) {
        report[month] = {
          income: 0,
          expense: 0,
        };
      }

      if (transaction.type === "INCOME") {
        report[month].income += Number(transaction.amount);
      } else {
        report[month].expense += Number(transaction.amount);
      }
    }

    return Object.entries(report).map(
      ([month, data]) => ({
        month,
        income: data.income,
        expense: data.expense,
        savings: data.income - data.expense,
      })
    );
  }

  async getCategoryReport(userId: number) {
    const report = await prisma.transaction.groupBy({
      by: ["categoryId"],
      where: {
        userId,
        type: "EXPENSE",
      },
      _sum: {
        amount: true,
      },
    });

    const categories = await prisma.category.findMany({
      where: {
        id: {
          in: report.map(item => item.categoryId),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    return report.map(item => ({
      category: categories.find(
        category => category.id === item.categoryId
      )?.name,
      amount: Number(item._sum.amount || 0),
    }));
  }
}

export default ReportsService;