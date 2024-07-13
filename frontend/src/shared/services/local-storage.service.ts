export class LocalStorageService {
  private static SEARCH_QUERY_KEY = 'searchQuery';

  static setSearchQuery = (query: string) => {
    return LocalStorageService.setItem(
      LocalStorageService.SEARCH_QUERY_KEY,
      query,
    );
  };

  static getSearchQuery = () => {
    return LocalStorageService.getItem(LocalStorageService.SEARCH_QUERY_KEY);
  };

  private static getItem = (key: string): any => {
    const value = localStorage.getItem(key);
    return !!value ? JSON.parse(value) : '';
  };

  private static setItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
}
