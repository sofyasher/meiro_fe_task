import { SortColumnsEnum } from '../enum/sort-columns.enum';
import { SortDirectionEnum } from '../enum/sort-direction.enum';
import { AttributeDataTO } from './attribute-data.to';

export interface AttributeListTO {
  data: AttributeDataTO[];
  meta: {
    hasNextPage: boolean;
    limit: number;
    offset: number;
    searchText: string;
    sortBy: SortColumnsEnum;
    sortDir: SortDirectionEnum;
  };
}
