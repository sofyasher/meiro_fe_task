import './attribute-detail.scss';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AttributeDataModel } from '../../shared/model/attribute-data.model';
import { fetchAttributeDetail, fetchLabels } from '../../shared/requests';
import { AttributeDetailMapper } from '../../shared/mapper/attribute-detail.mapper';
import { LabelModel } from '../../shared/model/label.model';

const AttributeDetail = () => {
  const { id } = useParams();
  const [labels, setLabels] = useState<LabelModel[]>([]);
  const [attribute, setAttribute] = useState<AttributeDataModel | null>(null);

  useEffect(() => {
    fetchLabels().then((labels) => setLabels(labels));
  }, []);

  useEffect(() => {
    if (!!id && labels.length > 0) {
      fetchAttributeDetail(id).then((attribute) =>
        setAttribute(
          AttributeDetailMapper.convertTOToModel(attribute.data, labels),
        ),
      );
    }
  }, [id, labels]);

  return (
    <Container
      fluid
      className='vh-100 d-flex align-items-center justify-content-center'
    >
      <h1>Attribute detail</h1>
      {attribute?.name}
    </Container>
  );
};

export default AttributeDetail;
