import './attribute-list.scss';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { fetchAttributes, fetchLabels } from '../../shared/requests';
import AttributeTable from './components/attribute-table/attribute-table';
import {
  AttributeListModel,
  LabelModel,
} from '../../shared/model/attribute-list.model';
import { AttributeMapper } from '../../shared/mapper/attribute.mapper';

const AttributeList = () => {
  const [labels, setLabels] = useState<LabelModel[]>([]);
  const [attributes, setAttributes] = useState<AttributeListModel | null>(null);
  const [attributesOffset, setAttributesOffset] = useState<number>(0);
  const [nextAttributesCall, setNextAttributesCall] = useState<number>(0);

  const handleNextAttributesCall = (): void => {
    setAttributesOffset(
      attributes?.meta.offset ? attributes.meta.offset + 10 : 0,
    );
    setNextAttributesCall((prev) => prev + 1);
  };

  useEffect(() => {
    fetchLabels().then((labels) => setLabels(labels));
  }, []);

  useEffect(() => {
    fetchAttributes({ offset: attributesOffset }).then((attributes) =>
      setAttributes(AttributeMapper.convertTOToModel(attributes, labels)),
    );
  }, [labels, nextAttributesCall]);

  return (
    <Container
      fluid
      className='vh-100 d-flex align-items-center justify-content-center'
    >
      <h1>Attribute list</h1>
      {attributes && (
        <AttributeTable
          attributes={attributes}
          nextAttributesCallCallback={handleNextAttributesCall}
        />
      )}
    </Container>
  );
};

export default AttributeList;
