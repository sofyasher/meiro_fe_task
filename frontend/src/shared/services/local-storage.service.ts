export class LocalStorageService {
  private static SEARCH_TEXT_KEY = 'searchText';

  static getSearchText = () => {
    return LocalStorageService.getItem(LocalStorageService.SEARCH_TEXT_KEY);
  };

  static setSearchText = (query: string) => {
    return LocalStorageService.setItem(
      LocalStorageService.SEARCH_TEXT_KEY,
      query,
    );
  };

  static removeSearchText = () => {
    return LocalStorageService.removeItem(LocalStorageService.SEARCH_TEXT_KEY);
  };

  private static getItem = (key: string): any => {
    const value = localStorage.getItem(key);
    return !!value ? JSON.parse(value) : null;
  };

  private static setItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  private static removeItem = (key: string) => {
    localStorage.removeItem(key);
  };
}
