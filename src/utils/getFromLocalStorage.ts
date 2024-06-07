export function getFromLocalStorage(key: string) {
  const value = localStorage.getItem(key);
  if (value) {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error(`Error parsing JSON from localStorage key "${key}":`, error);
      return null;
    }
  }
  return null;
}
