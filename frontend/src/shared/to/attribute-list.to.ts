import { SortColumnsEnum } from '../enum/sort-columns.enum';
import { SortDirectionEnum } from '../enum/sort-direction.enum';

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

export interface AttributeTO {
  data: AttributeDataTO;
}

export interface AttributeDataTO {
  id: string;
  name: string;
  createdAt: string; // ISO 8601
  labelIds: string[];
  deleted: boolean;
}
