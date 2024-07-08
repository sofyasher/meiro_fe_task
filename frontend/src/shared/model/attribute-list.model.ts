import { SortColumnsEnum } from '../enum/sort-columns.enum';
import { SortDirectionEnum } from '../enum/sort-direction.enum';

export interface AttributeListModel {
  data: AttributeModel[];
  meta: {
    hasNextPage: boolean;
    limit: number;
    offset: number;
    searchText: string;
    sortBy: SortColumnsEnum;
    sortDir: SortDirectionEnum;
  };
}

interface AttributeModel {
  id: string;
  name: string;
  createdAt: string; // ISO 8601
  labels: LabelModel[];
  deleted: boolean;
}

export interface LabelModel {
  id: string;
  name: string;
}
