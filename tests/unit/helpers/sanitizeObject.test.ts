import { sanitizeObject } from '../../../source/helpers/sanitizeObject';

describe('sanitizeObject', () => {
  it('should remove blacklisted keys from the object', () => {
    const object = { key1: 'value1', key2: 'value2', key3: 'value3' };
    const blackList = ['key2'];
    const result = sanitizeObject(object, blackList);
    expect(result).toEqual({ key1: 'value1', key3: 'value3' });
  });

  it('should return the same object if no keys are blacklisted', () => {
    const object = { key1: 'value1', key2: 'value2', key3: 'value3' };
    const blackList: string[] = [];
    const result = sanitizeObject(object, blackList);
    expect(result).toEqual(object);
  });

  it('should return an empty object if all keys are blacklisted', () => {
    const object = { key1: 'value1', key2: 'value2', key3: 'value3' };
    const blackList = ['key1', 'key2', 'key3'];
    const result = sanitizeObject(object, blackList);
    expect(result).toEqual({});
  });

  it('should handle an empty object', () => {
    const object = {};
    const blackList = ['key1', 'key2'];
    const result = sanitizeObject(object, blackList);
    expect(result).toEqual({});
  });

  it('should handle blacklisted keys that do not exist in the object', () => {
    const object = { key1: 'value1', key2: 'value2' };
    const blackList = ['key3'];
    const result = sanitizeObject(object, blackList);
    expect(result).toEqual(object);
  });
});