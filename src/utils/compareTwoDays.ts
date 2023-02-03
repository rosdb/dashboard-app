import { isSameDay, parseISO } from 'date-fns';

export const compareTwoDays = (a: Date, b: string | null): boolean => {
  return b ? isSameDay(parseISO(b), a) : false;
};
