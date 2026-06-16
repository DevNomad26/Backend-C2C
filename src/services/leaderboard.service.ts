import prisma from '../config/db';

export const getLeaderboard = async (year?: number) => {
  const aggregated = await prisma.leaderboardEntry.groupBy({
    by: ['userId'],
    _sum: { score: true },
    orderBy: { _sum: { score: 'desc' } },
  });

  const userIds = aggregated.map((entry) => entry.userId);

  const users = await prisma.user.findMany({
    where: {
      id: { in: userIds },
      ...(year ? { year } : {}),
    },
    select: {
      id: true,
      name: true,
      avatarUrl: true,
      year: true,
      hackerrankUsername: true,
    },
  });

  const userMap = new Map(users.map((u) => [u.id, u]));

  const result = aggregated
    .filter((entry) => userMap.has(entry.userId))
    .map((entry) => ({
      userId: entry.userId,
      totalScore: entry._sum.score ?? 0,
      user: userMap.get(entry.userId),
    }));

  return result.map((entry, index) => ({
    rank: index + 1,
    ...entry,
  }));
};