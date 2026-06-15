import prisma from '../config/db';

export const getAllContests = async (yearTarget?: string) => {
  return await prisma.contest.findMany({
    where: yearTarget ? { yearTarget: yearTarget as any } : {},
    include: {
      creator: {
        select: { id: true, name: true, avatarUrl: true },
      },
    },
    orderBy: { startTime: 'desc' },
  });
};

export const getContestById = async (id: string) => {
  return await prisma.contest.findUnique({
    where: { id },
    include: {
      creator: {
        select: { id: true, name: true, avatarUrl: true },
      },
    },
  });
};

export const createContest = async (data: {
  title: string;
  description: string;
  hackerrankUrl: string;
  startTime: Date;
  endTime: Date;
  yearTarget: string;
  createdBy: string;
}) => {
  return await prisma.contest.create({
    data: {
      ...data,
      yearTarget: data.yearTarget as any,
    },
  });
};

export const updateContest = async (id: string, data: Partial<{
  title: string;
  description: string;
  hackerrankUrl: string;
  startTime: Date;
  endTime: Date;
  yearTarget: string;
}>) => {
  return await prisma.contest.update({
    where: { id },
    data: {
      ...data,
      yearTarget: data.yearTarget as any,
    },
  });
};

export const deleteContest = async (id: string) => {
  return await prisma.contest.delete({ where: { id } });
};