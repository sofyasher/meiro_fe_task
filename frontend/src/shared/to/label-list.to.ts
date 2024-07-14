import { LabelTO } from './label.to';

export interface LabelListTO {
  data: LabelTO[];
  meta: {
    offset: number;
    limit: number;
    hasNextPage: boolean;
  };
}
