import { SortColumnsEnum } from './enum/sort-columns.enum';
import { SortDirectionEnum } from './enum/sort-direction.enum';
import { AttributeModel } from './model/attribute.model';
import { ATTRIBUTE_LIST_URL, get } from './api';
import { AttributeListModel } from './model/attribute-list.model';

export const fetchAttributes = (
  params: {
    offset?: number;
    limit?: number;
    searchText?: string;
    sortBy?: SortColumnsEnum;
    sortDir?: SortDirectionEnum;
  },
  callbackFn: (attributes: AttributeModel[]) => void,
) => {
  get(ATTRIBUTE_LIST_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Unable to get attribute list');
      }
    })
    .then((result: AttributeListModel) => {
      callbackFn(result.data);
    })
    .catch(console.log);
};
