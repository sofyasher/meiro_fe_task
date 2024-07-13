import { SortColumnsEnum } from './enum/sort-columns.enum';
import { SortDirectionEnum } from './enum/sort-direction.enum';
import { ApiMethods, ATTRIBUTE_LIST_URL, LABEL_LIST_URL } from './api';
import { AttributeListTO } from './to/attribute-list.to';
import { LabelListTO } from './to/label.to';
import { LabelModel } from './model/label.model';
import { AttributeTO } from './to/attribute.to';

const queryParams = (params: {
  [key: string]: string | number | undefined | null;
}): string => {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return !!query ? `?${query}` : '';
};

export const fetchAttributeDetail = async (
  id: string,
): Promise<AttributeTO> => {
  const attributeResponse = await ApiMethods.get(`${ATTRIBUTE_LIST_URL}/${id}`);

  return attributeResponse.json();
};

export const fetchAttributes = async (params: {
  offset?: number;
  limit?: number;
  searchText?: string;
  sortBy?: SortColumnsEnum;
  sortDir?: SortDirectionEnum;
}): Promise<AttributeListTO> => {
  const { offset, searchText } = params;

  const attributesResponse = await ApiMethods.get(
    `${ATTRIBUTE_LIST_URL}${queryParams({ offset, searchText })}`,
  );

  return attributesResponse.json();
};

export const fetchLabels = async (): Promise<LabelModel[]> => {
  const limit = 10;
  let offset = 0;
  let hasNextPage = true;
  const labels: LabelModel[] = [];

  while (hasNextPage) {
    const response = await ApiMethods.get(
      `${LABEL_LIST_URL}${queryParams({ offset, limit })}`,
    );
    const json: LabelListTO = (await response.json()) as LabelListTO;

    labels.push(...json.data);
    hasNextPage = json.meta.hasNextPage;
    offset += limit;
  }

  return labels;
};

export const deleteAttribute = async (id: string): Promise<Response> => {
  return ApiMethods.delete(`${ATTRIBUTE_LIST_URL}/${id}`);
};
