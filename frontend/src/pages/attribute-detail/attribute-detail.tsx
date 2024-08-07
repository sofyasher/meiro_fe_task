import './attribute-detail.scss';
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AttributeDataModel } from '../../shared/model/attribute-data.model';
import { routes } from '../../shared/routes';
import { AttributesService } from '../../shared/services/attributes.service';

const AttributeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attribute, setAttribute] = useState<AttributeDataModel | null>(null);

  const onDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this attribute?')) {
      AttributesService.deleteAttribute(id)
        .then(() => {
          navigate(routes.attributes);
          alert('Successfully deleted!');
        })
        .catch(() => alert('Failed to delete attribute'));
    }
  };

  const navigateToList = () => navigate(routes.attributes);

  useEffect(() => {
    if (!!id) {
      AttributesService.getAllLabelsAndAttributeById(id)
        .then((attribute) => setAttribute(attribute))
        .catch(() => alert(`Attribute with id ${id} not found`));
    }
  }, [id]);

  return (
    <Container fluid className='vh-100 d-flex justify-content-center top-80'>
      {!!attribute ? (
        <Container>
          <Container className='d-flex align-items-center justify-content-between mb-4 p-0'>
            <Button onClick={navigateToList}>Back</Button>
            <Button variant='danger' onClick={() => onDelete(id!)}>
              Delete
            </Button>
          </Container>
          <Card className='text-start'>
            <Card.Body>
              <Card.Title>{attribute?.name}</Card.Title>
              Labels:
              <ul>
                {attribute.labels.map((label) => (
                  <li key={'label-' + label.id}>{label.name}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Container>
      ) : (
        <Container>Attribute not found</Container>
      )}
    </Container>
  );
};

export default AttributeDetail;
