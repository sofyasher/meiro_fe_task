import { SortColumnsEnum } from './enum/sort-columns.enum';
import { SortDirectionEnum } from './enum/sort-direction.enum';
import { ATTRIBUTE_LIST_URL, get, LABEL_LIST_URL } from './api';
import { LabelModel } from './model/attribute-list.model';
import { AttributeListTO } from './to/attribute-list.to';
import { LabelListTO } from './to/label.to';

export const fetchAttributes = async (params: {
  offset?: number;
  limit?: number;
  searchText?: string;
  sortBy?: SortColumnsEnum;
  sortDir?: SortDirectionEnum;
}): Promise<AttributeListTO> => {
  const attributesResponse = await get(
    `${ATTRIBUTE_LIST_URL}?offset=${params.offset}`,
  );

  return attributesResponse.json();
};

export const fetchLabels = async (): Promise<LabelModel[]> => {
  let offset = 0;
  const limit = 10;
  let hasNextPage = true;
  const labels: LabelModel[] = [];

  while (hasNextPage) {
    const response = await get(
      `${LABEL_LIST_URL}?offset=${offset}&limit=${limit}`,
    );
    const json: LabelListTO = (await response.json()) as LabelListTO;

    labels.push(...json.data);
    hasNextPage = json.meta.hasNextPage;
    offset += 10;
  }

  return labels;
};
