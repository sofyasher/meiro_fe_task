import { SortColumnsEnum } from '../../enum/sort-columns.enum';
import { SortDirectionEnum } from '../../enum/sort-direction.enum';
import { AttributeListTO } from '../../to/attribute-list.to';
import { API_URL } from '../../api';
import { AttributeTO } from '../../to/attribute.to';
import { queryParams } from '../../utils';
import axios from 'axios';

const ATTRIBUTE_LIST_URL = `${API_URL}/attributes`;

export interface AttributesListQueryParams {
  offset?: number;
  limit?: number;
  searchText?: string;
  sortBy?: SortColumnsEnum;
  sortDir?: SortDirectionEnum;
}

export class AttributesApiService {
  static getAttributes = async (
    params: AttributesListQueryParams,
  ): Promise<AttributeListTO> => {
    const { offset, searchText } = params;

    const attributesResponse = await axios.get<AttributeListTO>(
      `${ATTRIBUTE_LIST_URL}${queryParams({ offset, searchText })}`,
    );

    return attributesResponse.data;
  };

  static getAttributeDetail = async (id: string): Promise<AttributeTO> => {
    const attributeResponse = await axios.get<AttributeTO>(
      `${ATTRIBUTE_LIST_URL}/${id}`,
    );

    return attributeResponse.data;
  };

  static deleteAttribute = async (id: string): Promise<Response> => {
    return axios.delete(`${ATTRIBUTE_LIST_URL}/${id}`);
  };
}
