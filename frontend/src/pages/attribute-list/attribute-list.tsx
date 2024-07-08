import './attribute-list.scss';
import { Container } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import { AttributeModel } from '../../shared/model/attribute.model';
import { fetchAttributes } from '../../shared/requests';

const AttributeList = () => {
  const [attributes, setAttributes] = useState<AttributeModel[]>([]);

  const handleFetchedAttributes = useCallback(setAttributes, [attributes]);

  useEffect(() => {
    fetchAttributes({}, handleFetchedAttributes);
  }, []);

  return (
    <Container
      fluid
      className='vh-100 d-flex align-items-center justify-content-center'
    >
      <h1>Attribute list</h1>
      {attributes && attributes.map((attribute) => <div>{attribute.name}</div>)}
    </Container>
  );
};

export default AttributeList;
