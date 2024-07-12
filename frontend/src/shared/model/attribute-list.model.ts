import { SortColumnsEnum } from '../enum/sort-columns.enum';
import { SortDirectionEnum } from '../enum/sort-direction.enum';
import { AttributeDataModel } from './attribute-data.model';

export interface AttributeListModel {
  data: AttributeDataModel[];
  meta: {
    hasNextPage: boolean;
    limit: number;
    offset: number;
    searchText: string;
    sortBy: SortColumnsEnum;
    sortDir: SortDirectionEnum;
  };
}
