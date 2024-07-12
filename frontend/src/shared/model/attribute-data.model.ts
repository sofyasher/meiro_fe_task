import { LabelModel } from './label.model';

export interface AttributeDataModel {
  id: string;
  name: string;
  createdAt: string; // ISO 8601
  labels: LabelModel[];
  deleted: boolean;
}
