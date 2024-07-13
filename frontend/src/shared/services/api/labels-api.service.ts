import { API_URL, ApiMethods } from '../../api';
import { queryParams } from '../../utils';
import { LabelModel } from '../../model/label.model';
import { LabelListTO } from '../../to/label.to';

const LABEL_LIST_URL = `${API_URL}/labels`;

export class LabelsApiService {
  static fetchLabels = async (): Promise<LabelModel[]> => {
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
}
