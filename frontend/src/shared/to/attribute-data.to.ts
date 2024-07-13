export interface AttributeDataTO {
  id: string;
  name: string;
  createdAt: string; // ISO 8601
  labelIds: string[];
  deleted: boolean;
}
