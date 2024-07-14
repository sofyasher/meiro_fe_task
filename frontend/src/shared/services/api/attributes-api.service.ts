import { AttributeListTO } from '../../to/attribute-list.to';
import { API_URL } from '../../api';
import { AttributeTO } from '../../to/attribute.to';
import { queryParams } from '../../utils';
import axios from 'axios';
import { AttributeListQueryParams } from '../../to/attribute-list-query-params.to';

const ATTRIBUTE_LIST_URL = `${API_URL}/attributes`;

export class AttributesApiService {
  static getAttributes = async (
    params: AttributeListQueryParams,
  ): Promise<AttributeListTO> => {
    const { offset, searchText, sortBy, sortDir } = params;

    const attributesResponse = await axios.get<AttributeListTO>(
      `${ATTRIBUTE_LIST_URL}${queryParams({ offset, searchText, sortBy, sortDir })}`,
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
