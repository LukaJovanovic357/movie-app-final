import { it, expect, vi } from 'vitest';
import { scrollDown } from './scrollDown';

it('should call window.scrollTo with correct parameters', () => {
  const scrollToMock = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

  scrollDown();

  expect(scrollToMock).toHaveBeenCalledWith({ top: 10000, behavior: 'smooth' });

  scrollToMock.mockRestore();
});
