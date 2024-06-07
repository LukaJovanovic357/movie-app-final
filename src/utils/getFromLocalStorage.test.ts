import { it, expect, vi } from 'vitest';
import { getFromLocalStorage } from './getFromLocalStorage';

it('should get value from localStorage', () => {
  const mockValue = JSON.stringify('testValue');
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
    return key === 'testKey' ? mockValue : null;
  });

  const result = getFromLocalStorage('testKey');
  expect(getItemSpy).toHaveBeenCalledWith('testKey');
  expect(result).toBe('testValue');

  getItemSpy.mockRestore();
});

it('should return null if key does not exist in localStorage', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

  const result = getFromLocalStorage('nonExistingKey');
  expect(getItemSpy).toHaveBeenCalledWith('nonExistingKey');
  expect(result).toBeNull();

  getItemSpy.mockRestore();
});
