import { AttributeListModel } from '../model/attribute-list.model';
import { LabelsApiService } from './api/labels-api.service';
import {
  AttributesApiService,
  AttributesListQueryParams,
} from './api/attributes-api.service';
import { AttributeListMapper } from '../mapper/attribute-list.mapper';
import { LabelModel } from '../model/label.model';

export class AttributesService {
  static getAllLabelsAndFirstOffsetOfAttributes = async (): Promise<{
    attributes: AttributeListModel;
    labels: LabelModel[];
  }> => {
    const [labels, attributes] = await Promise.all([
      LabelsApiService.getAllLabels(),
      AttributesApiService.getAttributes({ offset: 0 }),
    ]);

    return {
      attributes: AttributeListMapper.convertTOToModel(attributes, labels),
      labels: labels,
    };
  };

  static getNextAttributesAndSupplementByLabels = async (
    params: AttributesListQueryParams,
    labels: LabelModel[],
  ): Promise<AttributeListModel> => {
    const attributes = await AttributesApiService.getAttributes(params);

    return AttributeListMapper.convertTOToModel(attributes, labels);
  };
}
