import { AttributeDataTO } from '../to/attribute-list.to';
import { LabelModel } from '../model/label.model';
import { AttributeDataModel } from '../model/attribute-data.model';

export class AttributeDetailMapper {
  static convertTOToModel(
    attribute: AttributeDataTO,
    labels: LabelModel[],
  ): AttributeDataModel {
    const labelModels: LabelModel[] = [];

    attribute.labelIds.forEach((labelId) => {
      const labelModel = labels.find((label) => label.id === labelId);

      if (!!labelModel) {
        labelModels.push(labelModel);
      }
    });

    return {
      ...attribute,
      labels: labelModels,
    };
  }
}
