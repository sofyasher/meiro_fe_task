import { LabelModel } from '../model/label.model';
import { LabelTO } from '../to/label.to';

export class LabelDetailMapper {
  static convertTOToModel(label: LabelTO): LabelModel {
    return { ...label };
  }
}
