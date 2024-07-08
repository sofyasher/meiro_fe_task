import { SortColumnsEnum } from '../enum/sort-columns.enum';
import { SortDirectionEnum } from '../enum/sort-direction.enum';

export interface AttributeListTO {
  data: AttributeTO[];
  meta: {
    hasNextPage: boolean;
    limit: number;
    offset: number;
    searchText: string;
    sortBy: SortColumnsEnum;
    sortDir: SortDirectionEnum;
  };
}

interface AttributeTO {
  id: string;
  name: string;
  createdAt: string; // ISO 8601
  labelIds: string[];
  deleted: boolean;
}
