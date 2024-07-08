import { AttributeListModel, LabelModel } from '../model/attribute-list.model';
import { AttributeListTO } from '../to/attribute-list.to';

export class AttributeMapper {
  static convertTOToModel(
    attributes: AttributeListTO,
    labels: LabelModel[],
  ): AttributeListModel {
    return {
      data: attributes.data.map((attribute) => {
        const labelModels: LabelModel[] = [];

        attribute.labelIds.forEach((labelId) => {
          const labelModel = labels.find((label) => label.id === labelId);

          if (!!labelModel) {
            labelModels.push(labelModel);
          }
        });

        return {
          id: attribute.id,
          name: attribute.name,
          createdAt: attribute.createdAt,
          deleted: attribute.deleted,
          labels: labelModels,
        };
      }),
      meta: attributes.meta,
    };
  }
}
