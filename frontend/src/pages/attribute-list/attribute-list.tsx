import './attribute-list.scss';
import { Container } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import { fetchAttributes } from '../../shared/requests';
import AttributeTable from './components/attribute-table/attribute-table';
import { AttributeListModel } from '../../shared/model/attribute-list.model';

const AttributeList = () => {
  const [attributes, setAttributes] = useState<AttributeListModel | null>(null);

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
      {attributes && <AttributeTable attributes={attributes} />}
    </Container>
  );
};

export default AttributeList;
