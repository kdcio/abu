import permissions from '../../src/permissions';
import accesses from '../fixtures/api-access.json';
import permsExpected from '../fixtures/perms-expected.json';

describe('Permissions', () => {
  [
    [accesses[0], permsExpected[0]],
    [accesses[1], permsExpected[1]],
    [accesses[2], permsExpected[2]],
    [accesses[3], permsExpected[3]],
    [accesses[4], permsExpected[4]],
  ].forEach(([input, expected]) => {
    it(`permissions ${input.name}`, () => {
      expect(permissions(input)).toEqual(expected);
    });
  });
});
