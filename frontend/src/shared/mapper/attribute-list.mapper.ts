import { AttributeListModel } from '../model/attribute-list.model';
import { AttributeListTO } from '../to/attribute-list.to';
import { LabelModel } from '../model/label.model';
import { AttributeDetailMapper } from './attribute-detail.mapper';

export class AttributeListMapper {
  static convertTOToModel(
    attributes: AttributeListTO,
    labels: LabelModel[],
  ): AttributeListModel {
    return {
      data: attributes.data.map((attribute) =>
        AttributeDetailMapper.convertTOToModel(attribute, labels),
      ),
      meta: attributes.meta,
    };
  }
}
