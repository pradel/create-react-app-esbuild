import { jestMockWorking } from './jest-mocks';

test('Value should be true if mocks is working', () => {
  expect(jestMockWorking).toBe(true);
});
