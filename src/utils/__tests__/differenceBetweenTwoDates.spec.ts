import { differenceBetweenTwoDates } from '../differenceBetweenTwoDates';

test('should return the difference in milliseconds', () =>
  expect(
    differenceBetweenTwoDates('2023-01-30T19:35:43Z', '2023-01-30T19:15:53Z')
  ).toBe(1190000));
