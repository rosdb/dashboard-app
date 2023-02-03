import { compareTwoDays } from '../compareTwoDays';

test('should return true if the two dates have the same day', () =>
  expect(
    compareTwoDays(new Date('2023-01-30T19:35:43Z'), '2023-01-30T19:15:53Z')
  ).toBe(true));

test('should return false if the two dates have not the same day', () =>
  expect(
    compareTwoDays(new Date('2023-01-15T19:35:43Z'), '2023-01-30T19:15:53Z')
  ).toBe(false));
