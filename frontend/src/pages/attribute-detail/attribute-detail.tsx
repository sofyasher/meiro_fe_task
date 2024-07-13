import './attribute-detail.scss';
import { Button, Card, Container } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AttributeDataModel } from '../../shared/model/attribute-data.model';
import { AttributeDetailMapper } from '../../shared/mapper/attribute-detail.mapper';
import { LabelModel } from '../../shared/model/label.model';
import { routes } from '../../shared/routes';
import { AttributesApiService } from '../../shared/services/api/attributes-api.service';
import { LabelsApiService } from '../../shared/services/api/labels-api.service';

const AttributeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [labels, setLabels] = useState<LabelModel[]>([]);
  const [attribute, setAttribute] = useState<AttributeDataModel | null>(null);

  const handleOnDelete = (id: string) => {
    AttributesApiService.deleteAttribute(id).then((response) => {
      if (response.ok) {
        navigate(routes.attributes);
      }
    });
  };

  useEffect(() => {
    LabelsApiService.getAllLabels().then((labels) => setLabels(labels));
  }, []);

  useEffect(() => {
    if (!!id && labels.length > 0) {
      AttributesApiService.getAttributeDetail(id)
        .then((attribute) =>
          setAttribute(
            AttributeDetailMapper.convertTOToModel(attribute.data, labels),
          ),
        )
        .catch(() => console.error(`Attribute with id ${id} not found`));
    }
  }, [id, labels]);

  return (
    <Container fluid className='vh-100 d-flex justify-content-center top-80'>
      {!!attribute ? (
        <Container>
          <Container className='d-flex align-items-center justify-content-between mb-4'>
            <Link to={routes.attributes}>Back</Link>
            <Button onClick={() => handleOnDelete(id!)}>Delete</Button>
          </Container>
          <Card className='text-start'>
            <Card.Body>
              <Card.Title>{attribute?.name}</Card.Title>
              <Card.Text>
                {attribute.labels.map((label) => (
                  <div>{label.name}</div>
                ))}
              </Card.Text>
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
