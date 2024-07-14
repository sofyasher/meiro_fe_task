import { SortDirectionEnum } from '../enum/sort-direction.enum';
import { SortColumnsEnum } from '../enum/sort-columns.enum';

export class LocalStorageService {
  private static SEARCH_TEXT_KEY = 'searchText';
  private static SORT_BY_KEY = 'sortBy';
  private static SORT_DIR_KEY = 'sortDir';

  static getSortBy = () => {
    return LocalStorageService.getItem(LocalStorageService.SORT_BY_KEY);
  };

  static setSortBy = (sortBy: SortColumnsEnum) => {
    return LocalStorageService.setItem(LocalStorageService.SORT_BY_KEY, sortBy);
  };

  static removeSortBy = () => {
    return LocalStorageService.removeItem(LocalStorageService.SORT_BY_KEY);
  };

  static getSortDir = () => {
    return LocalStorageService.getItem(LocalStorageService.SORT_DIR_KEY);
  };

  static setSortDir = (sortDir: SortDirectionEnum) => {
    return LocalStorageService.setItem(
      LocalStorageService.SORT_DIR_KEY,
      sortDir,
    );
  };

  static removeSortDir = () => {
    return LocalStorageService.removeItem(LocalStorageService.SORT_DIR_KEY);
  };

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
