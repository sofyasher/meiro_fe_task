import { SortColumnsEnum } from './enum/sort-columns.enum';
import { SortDirectionEnum } from './enum/sort-direction.enum';
import { ATTRIBUTE_LIST_URL, get, LABEL_LIST_URL } from './api';
import { AttributeListModel, LabelModel } from './model/attribute-list.model';
import { AttributeListTO } from './to/attribute-list.to';
import { AttributeMapper } from './mapper/attribute.mapper';
import { LabelListTO } from './to/label.to';

export const fetchAttributes = async (
  params: {
    offset?: number;
    limit?: number;
    searchText?: string;
    sortBy?: SortColumnsEnum;
    sortDir?: SortDirectionEnum;
  },
  callbackFn: (attributes: AttributeListModel) => void,
) => {
  const attributesResponse = await get(ATTRIBUTE_LIST_URL);
  const labels = await fetchLabels();

  attributesResponse.json().then((attributes: AttributeListTO) => {
    callbackFn(AttributeMapper.convertTOToModel(attributes, labels));
  });
};

export const fetchLabels = async () => {
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
