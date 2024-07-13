import { API_URL } from '../../api';
import { queryParams } from '../../utils';
import { LabelListTO, LabelTO } from '../../to/label.to';
import axios from 'axios';

const LABEL_LIST_URL = `${API_URL}/labels`;

export class LabelsApiService {
  static getAllLabels = async (): Promise<LabelTO[]> => {
    const limit = 10;
    let offset = 0;
    let hasNextPage = true;
    const labels: LabelTO[] = [];

    while (hasNextPage) {
      const response = await axios.get<LabelListTO>(
        `${LABEL_LIST_URL}${queryParams({ offset, limit })}`,
      );
      const json: LabelListTO = response.data;

      labels.push(...json.data);

      hasNextPage = json.meta.hasNextPage;
      offset += limit;
    }

    return labels;
  };
}
