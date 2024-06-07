export function addToLocalStorage(key: string, value: string | number) {
  localStorage.setItem(key, JSON.stringify(value));
}
