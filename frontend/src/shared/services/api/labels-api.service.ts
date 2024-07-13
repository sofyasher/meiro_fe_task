import { API_URL, ApiMethods } from '../../api';
import { queryParams } from '../../utils';
import { LabelListTO, LabelTO } from '../../to/label.to';

const LABEL_LIST_URL = `${API_URL}/labels`;

export class LabelsApiService {
  static getAllLabels = async (): Promise<LabelTO[]> => {
    const limit = 10;
    let offset = 0;
    let hasNextPage = true;
    const labels: LabelTO[] = [];

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
}
