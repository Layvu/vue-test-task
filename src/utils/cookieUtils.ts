import Cookies from 'js-cookie';

const HISTORY_KEY = 'searchHistory';

export function getSearchHistory(): string[] {
  const history = Cookies.get(HISTORY_KEY);
  return history ? JSON.parse(history) : [];
}

export function addSearchHistory(query: string): void {
  const history = getSearchHistory();
  if (!history.includes(query)) {
    history.unshift(query);
    if (history.length > 5) history.pop();
    Cookies.set(HISTORY_KEY, JSON.stringify(history), { expires: 30 });
  }
}

export function clearSearchHistory(): void {
  Cookies.remove(HISTORY_KEY);
}
