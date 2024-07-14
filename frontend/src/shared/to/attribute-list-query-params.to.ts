import { SortColumnsEnum } from '../enum/sort-columns.enum';
import { SortDirectionEnum } from '../enum/sort-direction.enum';

export interface AttributeListQueryParams {
  offset?: number;
  limit?: number;
  searchText?: string;
  sortBy?: SortColumnsEnum;
  sortDir?: SortDirectionEnum;
}
