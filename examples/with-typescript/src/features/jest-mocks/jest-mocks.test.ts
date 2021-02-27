import { jestMockWorking } from './jest-mocks';

jest.mock('./jest-mocks');

test('Value should be true if mocks is working', () => {
  expect(jestMockWorking).toBe(true);
});
