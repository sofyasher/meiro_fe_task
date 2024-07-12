import './attribute-detail.scss';
import { Button, Container } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AttributeDataModel } from '../../shared/model/attribute-data.model';
import {
  deleteAttribute,
  fetchAttributeDetail,
  fetchLabels,
} from '../../shared/requests';
import { AttributeDetailMapper } from '../../shared/mapper/attribute-detail.mapper';
import { LabelModel } from '../../shared/model/label.model';

const AttributeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [labels, setLabels] = useState<LabelModel[]>([]);
  const [attribute, setAttribute] = useState<AttributeDataModel | null>(null);

  const handleOnDelete = (id: string) => {
    deleteAttribute(id).then((response) => {
      if (response.ok) {
        navigate('/attributes');
      }
    });
  };

  useEffect(() => {
    fetchLabels().then((labels) => setLabels(labels));
  }, []);

  useEffect(() => {
    if (!!id && labels.length > 0) {
      fetchAttributeDetail(id)
        .then((attribute) =>
          setAttribute(
            AttributeDetailMapper.convertTOToModel(attribute.data, labels),
          ),
        )
        .catch(() => console.error(`Attribute with id ${id} not found`));
    }
  }, [id, labels]);

  return (
    <Container
      fluid
      className='vh-100 d-flex align-items-center justify-content-center'
    >
      {!!attribute ? (
        <>
          <Container>
            <Link to='/attributes'>Back</Link>
            <Button onClick={() => handleOnDelete(id!)}>Delete</Button>
          </Container>
          <h1>{attribute?.name}</h1>
        </>
      ) : (
        <Container>Attribute not found</Container>
      )}
    </Container>
  );
};

export default AttributeDetail;
