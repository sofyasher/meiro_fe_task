import { AttributeListModel } from '../model/attribute-list.model';
import { LabelsApiService } from './api/labels-api.service';
import {
  AttributesApiService,
  AttributesListQueryParams,
} from './api/attributes-api.service';
import { AttributeListMapper } from '../mapper/attribute-list.mapper';
import { LabelModel } from '../model/label.model';
import { LabelDetailMapper } from '../mapper/label-detail.mapper';
import { AttributeDataModel } from '../model/attribute-data.model';
import { AttributeDetailMapper } from '../mapper/attribute-detail.mapper';

export class AttributesService {
  static getAllLabelsAndAttributeById = async (
    id: string,
  ): Promise<AttributeDataModel> => {
    const [labels, attribute] = await Promise.all([
      LabelsApiService.getAllLabels(),
      AttributesApiService.getAttributeDetail(id),
    ]);

    return AttributeDetailMapper.convertTOToModel(attribute.data, labels);
  };

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
      labels: labels.map(LabelDetailMapper.convertTOToModel),
    };
  };

  static getNextAttributesAndSupplementByLabels = async (
    params: AttributesListQueryParams,
    labels: LabelModel[],
  ): Promise<AttributeListModel> => {
    const attributes = await AttributesApiService.getAttributes(params);

    return AttributeListMapper.convertTOToModel(attributes, labels);
  };

  static deleteAttribute = (id: string) => {
    return AttributesApiService.deleteAttribute(id);
  };
}
