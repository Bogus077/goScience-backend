import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Kid, KidSummaryUser, KidSummaryTask, KidSummaryProjectTask, User, Class, UserSettings } from '../../models';
import { isKidBelongsToUser } from '../kid/kid';
import { validateData, addKidUserSummaryRules, changeSummaryStatusRules } from '../validationRules';

const getWeekStart = (date: Date) => {
  const monday = new Date(date);

  if (monday.getDay() > 1) {
    monday.setDate(
      monday.getDate() - (monday.getDay() - 1)
    );
  } else if (monday.getDay() === 0) {
    monday.setDate(monday.getDate() - 6);
  }

  monday.setHours(monday.getHours() - 4);
  return monday;
}

const getWeekEnd = (date: Date) => {
  const sunday = new Date(date);

  if (sunday.getDay() > 0) {
    sunday.setDate(
      sunday.getDate() + (8 - sunday.getDay())
    );
  }

  sunday.setHours(sunday.getHours() - 4);
  return sunday;
}

export const isSummaryTaskBelongsToUser = async (UserId: number, summaryId: number) => {
  const result = await KidSummaryTask.findOne({ where: { id: summaryId } });
  if (!result) throw { errorMessage: 'Итога с таким ID не существует' };

  await isKidBelongsToUser(UserId, result.KidId);
  return result;
}

export const isSummaryProjectTaskBelongsToUser = async (UserId: number, summaryId: number) => {
  const result = await KidSummaryProjectTask.findOne({ where: { id: summaryId } });
  if (!result) throw { errorMessage: 'Итога с таким ID не существует' };

  await isKidBelongsToUser(UserId, result.KidId);
  return result;
}

export const isSummaryUserBelongsToUser = async (UserId: number, summaryId: number) => {
  const result = await KidSummaryUser.findOne({ where: { id: summaryId } });
  if (!result) throw { errorMessage: 'Итога с таким ID не существует' };

  await isKidBelongsToUser(UserId, result.KidId);
  return result;
}

export const getKidSummary = async (req: Request['body'], UserId: number) => {

  const today = new Date();
  today.setHours(today.getHours() + 4);
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  const weekStart = getWeekStart(today);
  const weekEnd = getWeekEnd(today);
  weekEnd.setDate(weekEnd.getDate() + 1);

  const result = await UserSettings.findOne({
    where: {UserId}, 
    include: [{
      model: Class,
        include: [{
          model: Kid,
          include: [{
                model: KidSummaryUser,
                where: { 
                  isDeleted: null,
                  createdAt: {
                    [Op.between]: [weekStart, weekEnd],
                  }
                },
                required: false,
              },
              {
                model: KidSummaryTask,
                where: {
                  createdAt: {
                    [Op.between]: [weekStart, weekEnd],
                  }
                },
                required: false,
              },
              {
                model: KidSummaryProjectTask,
                where: {
                  createdAt: {
                    [Op.between]: [weekStart, weekEnd],
                  }
                },
                required: false,
          }]
        }],
      }],
    order: [
      [Class, Kid, 'surname', 'asc'],
    ]
  });

  return (result as UserSettingsWithClassAndKis)?.Class?.Kids;
}

type UserSettingsWithClassAndKis = UserSettings & {Class: ClassWithKids};
type ClassWithKids = Class & {Kids: typeof Kid[]};

export const createKidUserSummary = async (req: Request['body'], UserId: number) => {
  validateData(req, addKidUserSummaryRules);
  const { KidId } = req;
  await isKidBelongsToUser(UserId, KidId);

  const result = await KidSummaryUser.create(req);

  return result;
}

export const changeSummaryStatus = async (req: Request['body'], UserId: number) => {
  validateData(req, changeSummaryStatusRules);
  const { KidSummaryUserId, KidSummaryTaskId, KidSummaryProjectTaskId, type, status } = req;
  if (type !== 'day' && type !== 'week') throw { errorMessage: 'Тип итога может быть только day/week' };

  if (KidSummaryUserId) {
    const summary = await isSummaryUserBelongsToUser(UserId, KidSummaryUserId);
    if (type === 'day') {
      await summary.update({ dayStatus: status });
    } else if (type === 'week') {
      await summary.update({ weekStatus: status });
    }
    return summary;
  } else if (KidSummaryTaskId) {
    const summary = await isSummaryTaskBelongsToUser(UserId, KidSummaryTaskId);
    if (type === 'day') {
      await summary.update({ dayStatus: status });
    } else if (type === 'week') {
      await summary.update({ weekStatus: status });
    }
    return summary;
  } else if (KidSummaryProjectTaskId) {
    const summary = await isSummaryProjectTaskBelongsToUser(UserId, KidSummaryProjectTaskId);
    if (type === 'day') {
      await summary.update({ dayStatus: status });
    } else if (type === 'week') {
      await summary.update({ weekStatus: status });
    }
    return summary;
  } else {
    return { errorMessage: 'Не указан ни один идентификатор итога' }
  }
}