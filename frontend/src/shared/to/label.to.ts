export interface LabelListTO {
  data: LabelTO[];
  meta: {
    offset: number;
    limit: number;
    hasNextPage: boolean;
  };
}

export interface LabelTO {
  id: string;
  name: string;
}
