import { SortColumnsEnum } from '../../enum/sort-columns.enum';
import { SortDirectionEnum } from '../../enum/sort-direction.enum';
import { AttributeListTO } from '../../to/attribute-list.to';
import { API_URL, ApiMethods } from '../../api';
import { AttributeTO } from '../../to/attribute.to';
import { queryParams } from '../../utils';

const ATTRIBUTE_LIST_URL = `${API_URL}/attributes`;

export class AttributesApiService {
  static getAttributes = async (params: {
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

  static getAttributeDetail = async (id: string): Promise<AttributeTO> => {
    const attributeResponse = await ApiMethods.get(
      `${ATTRIBUTE_LIST_URL}/${id}`,
    );

    return attributeResponse.json();
  };

  static deleteAttribute = async (id: string): Promise<Response> => {
    return ApiMethods.delete(`${ATTRIBUTE_LIST_URL}/${id}`);
  };
}
