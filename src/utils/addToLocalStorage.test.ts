import { expect, it, vi } from 'vitest';
import { addToLocalStorage } from './addToLocalStorage';

it('should store value in localStorage', () => {
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

  addToLocalStorage('testKey', 'testValue');

  expect(setItemSpy).toHaveBeenCalled();
  expect(setItemSpy).toHaveBeenCalledWith('testKey', JSON.stringify('testValue'));

  setItemSpy.mockClear();
});
