import prisma from '../config/db';

export const getOverallLeaderboard = async () => {
  const aggregated = await prisma.leaderboardEntry.groupBy({
    by: ['userId'],
    _sum: { score: true },
    orderBy: { _sum: { score: 'desc' } },
  });


  const userIds = aggregated.map((entry) => entry.userId);

  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: {
      id: true,
      name: true,
      avatarUrl: true,
      year: true,
      hackerrankUsername: true,
    },
  });

  const userMap = new Map(users.map((u) => [u.id, u]));

  return aggregated.map((entry, index) => ({
    rank: index + 1,
    userId: entry.userId,
    totalScore: entry._sum.score ?? 0,
    user: userMap.get(entry.userId),
  }));
};