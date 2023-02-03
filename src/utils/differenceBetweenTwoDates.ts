import { differenceInMilliseconds, parseISO } from 'date-fns';

export const differenceBetweenTwoDates = (
  left: string,
  right: string
): number => {
  const leftDate = parseISO(left);
  const rightDate = parseISO(right);

  return differenceInMilliseconds(leftDate, rightDate);
};
